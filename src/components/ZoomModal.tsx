import React, { useEffect } from 'react';
import { MockupResult } from '../types';

interface ZoomModalProps {
  image: MockupResult;
  onClose: () => void;
  onDownload: () => void;
}

const ZoomModal: React.FC<ZoomModalProps> = ({ image, onClose, onDownload }) => {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      <div className="relative max-w-4xl w-full flex flex-col gap-4 animate-modal">
        <div className="absolute -top-12 right-0 flex gap-2">
           <button
            onClick={onDownload}
            className="h-9 px-4 rounded-full bg-white text-black text-xs font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-2xl"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            TẢI ẢNH HD (.JPG)
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="bg-[#0e0e0e] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.05)]">
          <img
            src={`data:${image.mimeType};base64,${image.base64}`}
            className="w-full h-auto object-contain max-h-[80vh]"
            alt={image.title}
          />
          <div className="p-4 bg-gradient-to-t from-[#0e0e0e] to-transparent flex items-center justify-between">
            <span className="text-sm font-medium">{image.title}</span>
            <span className="text-[10px] text-[rgba(218,220,224,0.5)] font-mono uppercase">High Resolution Output</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomModal;
