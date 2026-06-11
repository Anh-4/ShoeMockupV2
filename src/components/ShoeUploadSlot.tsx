import React from 'react';
import { Flow } from 'flow-sdk';
import { MediaItem } from '../types';

interface ShoeUploadSlotProps {
  label: string;
  image: MediaItem | null;
  onSelect: (img: MediaItem | null) => void;
  disabled?: boolean;
}

const ShoeUploadSlot: React.FC<ShoeUploadSlotProps> = ({ label, image, onSelect, disabled }) => {
  const handleSelect = async () => {
    if (disabled) return;
    try {
      const item = await Flow.media.select({ filter: 'image' });
      if (item) onSelect(item);
    } catch (err) {
      console.error('Lỗi chọn ảnh:', err);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] text-[rgba(218,220,224,0.5)] px-1 uppercase tracking-wider font-semibold">
        {label}
      </span>
      <div
        onClick={handleSelect}
        className={`relative aspect-square rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-1 cursor-pointer overflow-hidden
          ${image ? 'border-transparent' : 'border-[#333] hover:border-[#555] bg-[#111]'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {image ? (
          <>
            <img src={`data:${image.mimeType};base64,${image.base64}`} className="w-full h-full object-cover" />
            {!disabled && (
              <button
                onClick={(e) => { e.stopPropagation(); onSelect(null); }}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/90 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px] text-white">close</span>
              </button>
            )}
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px] text-[#555]">add_a_photo</span>
            <span className="text-[9px] text-[#555] font-medium">Tải lên</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoeUploadSlot;
