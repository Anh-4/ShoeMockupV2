import { useState, useEffect, useCallback } from 'react';
import { Flow } from 'flow-sdk';
import { SectionLabel, PillButton, TextInput, FieldDropdown } from './components/Primitives';
import ShoeUploadSlot from './components/ShoeUploadSlot';
import MockupGrid from './components/MockupGrid';
import MockupSelectorPanel from './components/MockupSelectorPanel';
import { MockupResult, MediaItem, Template } from './types';
import { MOCKUP_TEMPLATES, SHOE_BLANKS } from './constants';

// Caches the mediaId of each template's fixed scene image after its first
// upload, so we don't re-upload the same blueprint on every generation.
const sceneMediaIdCache = new Map<string, string>();

export default function App() {
  const [insideImage, setInsideImage] = useState<MediaItem | null>(null);
  const [outsideImage, setOutsideImage] = useState<MediaItem | null>(null);
  const [shoeDescription, setShoeDescription] = useState('');
  const [style, setStyle] = useState('Chân thực (Realistic)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<MockupResult[]>([]);
  const [currentStep, setCurrentStep] = useState('');
  const [generatingIds, setGeneratingIds] = useState<string[]>([]);
  const [selectedBlankId, setSelectedBlankId] = useState(SHOE_BLANKS[0].id);

  useEffect(() => {
    const id = 'flow-shoe-mockup-css';
    if (document.getElementById(id)) return;
    const styleEl = document.createElement('style');
    styleEl.id = id;
    styleEl.textContent = `
      .dark-scrollbar::-webkit-scrollbar { width: 6px; }
      .dark-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .dark-scrollbar::-webkit-scrollbar-thumb { background: #595959; border-radius: 9999px; }
      .dark-scrollbar::-webkit-scrollbar-thumb:hover { background: #7a7a7a; }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      .animate-pulse-slow { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      @keyframes modal-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      .animate-modal { animation: modal-in 0.2s ease-out forwards; }
      @keyframes dropdown-enter { from { opacity: 0; transform: scale(0.95) translateY(-5px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      .animate-dropdown { animation: dropdown-enter 0.15s ease-out forwards; }
      html, body, #root { margin: 0; padding: 0; width: 100%; height: 100%; background: #0e0e0e; font-family: 'Google Sans Text', sans-serif; letter-spacing: 0.1px; }
    `;
    document.head.appendChild(styleEl);
  }, []);

  const handleGenerate = useCallback(async (targetTemplates: Template[]) => {
    if (!insideImage && !outsideImage) return;

    setIsGenerating(true);
    const targetIds = targetTemplates.map(t => t.id);
    setGeneratingIds(targetIds);

    if (targetTemplates.length > 1) {
      setResults([]);
    }

    try {
      const mediaIds = [insideImage, outsideImage].filter(Boolean).map(img => img!.mediaId);

      let currentResults: MockupResult[] = targetTemplates.length > 1 ? [] : [...results];

      for (const template of targetTemplates) {
        setCurrentStep(`Đang tạo: ${template.title}...`);

        // Resolve the fixed scene: either pinned on the template, or — for the
        // box mockup (blankSelector) — taken from the currently selected blank.
        let sceneImage = template.sceneImage;
        let templatePrompt = template.prompt;
        let sceneCacheKey = template.id;

        if (template.blankSelector) {
          const blank = SHOE_BLANKS.find(b => b.id === selectedBlankId) ?? SHOE_BLANKS[0];
          sceneImage = blank.sceneImage;
          templatePrompt = blank.prompt;
          sceneCacheKey = `blank:${blank.id}`;
        }

        // Templates with a fixed sceneImage (e.g. the LITTLEOWH blank) send that
        // image FIRST as the locked blueprint, then the user's design photos.
        // The template-lock prompt is self-contained, so skip the generic
        // fidelity preamble for those.
        let referenceImageMediaIds = mediaIds;
        let fullPrompt: string;

        if (sceneImage) {
          let sceneId = sceneMediaIdCache.get(sceneCacheKey);
          if (!sceneId) {
            const up = await Flow.upload({
              base64: sceneImage.base64,
              mimeType: sceneImage.mimeType,
              name: 'template-scene'
            });
            sceneId = up.mediaId;
            sceneMediaIdCache.set(sceneCacheKey, sceneId);
          }
          referenceImageMediaIds = [sceneId, ...mediaIds];
          fullPrompt = [
            templatePrompt,
            shoeDescription ? `\nADDITIONAL NOTES: ${shoeDescription}` : '',
            `\nFINAL CHECK: keep reference image #1 (the template) EXACTLY — its box, background, lighting, and the shoe's sole + silhouette. The ONLY change allowed is painting the upper with the design from the OTHER reference image(s), copied 1:1. Add, remove or invent NO detail.`
          ].join('');
        } else {
          // Regular scene mockups: the uploaded shoe IS the subject. Frame this as
          // an image-EDIT (composite the real shoe into a scene), not a redesign,
          // and hammer the sole + design lock at both ends of the prompt.
          fullPrompt = [
            `IMAGE-EDIT / PRODUCT COMPOSITING TASK.`,
            `The reference photo(s) show ONE specific real shoe. Composite that EXACT shoe — completely unchanged — into a new scene. This is NOT a redesign: do not re-imagine, restyle, "improve" or beautify the shoe.`,
            ``,
            `KEEP 100% IDENTICAL TO THE REFERENCE (non-negotiable):`,
            `- Every design element: exact colors (hex), patterns, prints, artwork, panels, materials, textures, stitching, laces, logos and their exact placement.`,
            `- The SOLE: outsole tread pattern, midsole shape and height, colors and any text/logo on the sole — reproduce it pixel-for-pixel. Do NOT add, sharpen, thicken or invent ANY sole detail. Do NOT add "AIR", "NIKE", a swoosh, Jumpman or any text/logo to the sole or midsole unless that exact mark is clearly visible on the sole in the reference photos.`,
            `- The exact silhouette and proportions.`,
            ``,
            `SCENE (the only thing you may build around the shoe): ${templatePrompt}`,
            ``,
            `FORBIDDEN: adding extra logos/text/decoration; adding "AIR"/"NIKE"/a swoosh/Jumpman or any brand mark not clearly present in the reference; changing any color; altering the sole; smoothing or restyling materials; or adding any detail not visibly present in the reference photos — even if the silhouette resembles a famous branded sneaker.`,
            shoeDescription ? `USER NOTE: ${shoeDescription}` : ``,
            `Background/scene style: ${style}. Photorealistic, natural lighting.`,
            ``,
            `FINAL CHECK before output: the shoe — especially its SOLE and every design detail — must look 100% identical to the uploaded reference. Only the background/scene differs.`
          ].filter(Boolean).join('\n');
        }

        const result = await Flow.generate.image({
          prompt: fullPrompt,
          referenceImageMediaIds,
          modelDisplayName: '🍌 Nano Banana Pro',
          aspectRatio: '1:1'
        });

        const newMockup: MockupResult = {
          id: template.id + '_' + Date.now(),
          templateId: template.id,
          title: template.title,
          base64: result.base64,
          mimeType: result.mimeType,
          mediaId: result.mediaId
        };

        const existingIdx = currentResults.findIndex(r => r.templateId === template.id);
        if (existingIdx !== -1) {
          currentResults[existingIdx] = newMockup;
        } else {
          currentResults.push(newMockup);
        }

        setResults([...currentResults]);
        setGeneratingIds(prev => prev.filter(id => id !== template.id));
      }
      setCurrentStep('Hoàn tất!');
    } catch (error) {
      console.error(error);
      setCurrentStep('Có lỗi xảy ra.');
    } finally {
      setIsGenerating(false);
      setGeneratingIds([]);
    }
  }, [insideImage, outsideImage, shoeDescription, style, results, selectedBlankId]);

  const handleGenerateCombo = () => handleGenerate(MOCKUP_TEMPLATES);

  return (
    <div className="flex h-screen w-screen bg-[#0e0e0e] text-white overflow-hidden">
      {/* Left Panel: Inputs */}
      <div className="w-[300px] h-full border-r border-[rgba(218,220,224,0.15)] flex flex-col justify-between p-[12px] bg-[#0e0e0e] shrink-0">
        <div className="flex flex-col gap-[20px] overflow-y-auto pr-1 dark-scrollbar">
          <div className="flex flex-col gap-2.5">
            <SectionLabel>Ảnh sản phẩm thực tế</SectionLabel>
            <div className="grid grid-cols-2 gap-2">
              <ShoeUploadSlot
                label="Mặt trong"
                image={insideImage}
                onSelect={setInsideImage}
                disabled={isGenerating}
              />
              <ShoeUploadSlot
                label="Mặt ngoài"
                image={outsideImage}
                onSelect={setOutsideImage}
                disabled={isGenerating}
              />
            </div>
            <p className="px-2 text-[9px] text-[rgba(218,220,224,0.4)] leading-tight italic">
              * Tải lên cả 2 mặt để AI nhận diện bộ đế và vân đế chính xác nhất.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <SectionLabel>Lưu ý quan trọng</SectionLabel>
            <TextInput
              value={shoeDescription}
              onChange={setShoeDescription}
              placeholder="Vd: Giữ nguyên đế màu vàng cát, không thêm logo nào khác..."
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <SectionLabel>Phong cách mockup</SectionLabel>
            <FieldDropdown
              label="Style"
              value={style}
              options={['Chân thực (Realistic)', 'Nghệ thuật (Artistic)', 'Quảng cáo (Commercial)', 'Minimalist']}
              onChange={setStyle}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-4 border-t border-[rgba(218,220,224,0.1)]">
          {isGenerating && (
             <div className="px-2 pb-1">
                <p className="text-[10px] text-[rgba(218,220,224,0.6)] animate-pulse-slow">{currentStep}</p>
             </div>
          )}
          <PillButton
            variant="solid"
            onClick={handleGenerateCombo}
            disabled={isGenerating || (!insideImage && !outsideImage)}
            icon={<span className="material-symbols-outlined text-[18px]">auto_awesome</span>}
          >
            {isGenerating ? 'Đang tạo combo...' : `Tạo Combo ${MOCKUP_TEMPLATES.length} Mockup`}
          </PillButton>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 h-full overflow-y-auto dark-scrollbar p-6">
        {results.length === 0 && !isGenerating ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
            <span className="material-symbols-outlined text-[72px] mb-4">footprint</span>
            <h2 className="text-xl font-medium tracking-tight">Trình tạo Mockup Giày HD</h2>
            <p className="max-w-xs mt-2 text-sm leading-relaxed">Tải lên ảnh thật của bạn để thấy phép màu. AI sẽ giữ nguyên từng chi tiết nhỏ nhất dựa trên hình ảnh.</p>
          </div>
        ) : (
          <MockupGrid results={results} isGenerating={isGenerating} generatingIds={generatingIds} />
        )}
      </div>

      {/* Right Panel: Mockup Options */}
      <MockupSelectorPanel
        isGenerating={isGenerating}
        generatingIds={generatingIds}
        onGenerateSingle={(template) => handleGenerate([template])}
        disabled={!insideImage && !outsideImage}
        selectedBlankId={selectedBlankId}
        onSelectBlank={setSelectedBlankId}
      />
    </div>
  );
}
