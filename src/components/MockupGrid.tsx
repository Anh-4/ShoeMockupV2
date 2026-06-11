import React, { useState } from 'react';
import { Flow } from 'flow-sdk';
import { MockupResult } from '../types';
import ZoomModal from './ZoomModal';
import { MOCKUP_TEMPLATES } from '../constants';

interface MockupGridProps {
  results: MockupResult[];
  isGenerating: boolean;
  generatingIds: string[];
}

const MockupGrid: React.FC<MockupGridProps> = ({ results, generatingIds }) => {
  const [selectedImage, setSelectedImage] = useState<MockupResult | null>(null);

  const handleDownload = async (item: MockupResult) => {
    await Flow.download({
      base64: item.base64,
      mimeType: 'image/jpeg',
      filename: `${item.title.toLowerCase().replace(/\s+/g, '_')}_hd.jpg`
    });
  };

  // Xác định các ô cần hiển thị loading
  const loadingTemplates = MOCKUP_TEMPLATES.filter(t => generatingIds.includes(t.id));

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between border-b border-[rgba(218,220,224,0.1)] pb-4">
        <div>
          <h3 className="text-xl font-medium">Bộ sưu tập Mockup</h3>
          <p className="text-xs text-[rgba(218,220,224,0.5)] mt-1">Chất lượng HD chuyên nghiệp</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
        {results.map((item) => (
          <div key={item.id} className="group flex flex-col gap-3">
            <div className="relative aspect-square bg-[#1a1a1a] rounded-2xl border border-[rgba(218,220,224,0.1)] overflow-hidden transition-all hover:border-[#969696]/40 shadow-lg">
              <img src={`data:${item.mimeType};base64,${item.base64}`} className="w-full h-full object-cover" />

              {generatingIds.includes(item.templateId) && (
                 <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-2 border-[#969696] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-medium text-[#969696]">Đang cập nhật...</span>
                 </div>
              )}

              {/* Overlay on hover */}
              {!generatingIds.includes(item.templateId) && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => setSelectedImage(item)}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                  >
                    <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                  </button>
                  <button
                    onClick={() => handleDownload(item)}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                  >
                    <span className="material-symbols-outlined text-[20px]">download</span>
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between px-1">
              <span className="text-[13px] font-medium text-[rgba(218,220,224,0.8)]">{item.title}</span>
              <span className="text-[10px] text-[rgba(218,220,224,0.4)] uppercase font-bold tracking-widest">JPG HD</span>
            </div>
          </div>
        ))}

        {loadingTemplates.map(t => {
          // Chỉ hiển thị skeleton nếu template này chưa có kết quả trong danh sách results
          if (results.some(r => r.templateId === t.id)) return null;

          return (
            <div key={`loading-${t.id}`} className="flex flex-col gap-3">
              <div className="aspect-square bg-[#111] rounded-2xl border border-dashed border-[#222] flex flex-col items-center justify-center gap-4 animate-pulse">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-t-[#969696] border-[rgba(150,150,150,0.1)] animate-spin"></div>
                  <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-[20px] text-[#444]">{t.icon}</span>
                </div>
                <span className="text-[11px] text-[#444] font-medium tracking-wide">Đang tạo: {t.title}...</span>
              </div>
              <div className="h-4 w-24 bg-[#111] rounded self-start mx-1 animate-pulse" />
            </div>
          );
        })}
      </div>

      {selectedImage && (
        <ZoomModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onDownload={() => handleDownload(selectedImage)}
        />
      )}
    </div>
  );
};

export default MockupGrid;
