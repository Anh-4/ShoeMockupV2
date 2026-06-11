import React from 'react';
import { SectionLabel } from './Primitives';
import { MOCKUP_TEMPLATES } from '../constants';
import { Template } from '../types';

interface MockupSelectorPanelProps {
  isGenerating: boolean;
  generatingIds: string[];
  onGenerateSingle: (template: Template) => void;
  disabled: boolean;
}

const MockupSelectorPanel: React.FC<MockupSelectorPanelProps> = ({
  isGenerating,
  generatingIds,
  onGenerateSingle,
  disabled
}) => {
  return (
    <div className="w-[300px] h-full border-l border-[rgba(218,220,224,0.15)] flex flex-col p-[12px] bg-[#0e0e0e] shrink-0">
      <SectionLabel>Tùy chọn Mockup</SectionLabel>

      <div className="mt-4 flex flex-col gap-2 overflow-y-auto dark-scrollbar pr-1">
        {MOCKUP_TEMPLATES.map((template) => {
          const isThisGenerating = generatingIds.includes(template.id);

          return (
            <div
              key={template.id}
              className={`group relative flex items-center justify-between p-3 rounded-xl border transition-all
                ${isThisGenerating ? 'border-[#969696] bg-[#1a1a1a]' : 'border-[#333] bg-transparent hover:border-[#555]'}
                ${(isGenerating && !isThisGenerating) || disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-default'}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isThisGenerating ? 'bg-[#969696] text-black' : 'bg-[#1a1a1a] text-[#7a7a7a]'}`}>
                  <span className="material-symbols-outlined text-[18px]">{template.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-white">{template.title}</span>
                  <span className="text-[9px] text-[rgba(218,220,224,0.4)] uppercase font-bold tracking-wider">1:1 HD</span>
                </div>
              </div>

              <button
                onClick={() => !isGenerating && !disabled && onGenerateSingle(template)}
                disabled={isGenerating || disabled}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${isThisGenerating ? 'bg-transparent' : 'bg-white/5 hover:bg-white text-white hover:text-black'}
                `}
              >
                {isThisGenerating ? (
                  <div className="w-4 h-4 border-2 border-[#969696] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-auto pt-4 px-2">
        <p className="text-[10px] text-[rgba(218,220,224,0.3)] leading-relaxed italic">
          * Bạn có thể tạo lẻ từng tấm để thay đổi phối cảnh mà không cần tạo lại toàn bộ combo.
        </p>
      </div>
    </div>
  );
};

export default MockupSelectorPanel;
