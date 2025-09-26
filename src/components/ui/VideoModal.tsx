import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
}

const VideoModal = ({ isOpen, onClose, videoSrc, title = "Vídeo" }: VideoModalProps) => {
  // Manage body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalOverflow || '';
        document.body.offsetHeight;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center animate-fade-in p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-4xl bg-white rounded-xl overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <video
            className="absolute top-0 left-0 w-full h-full"
            controls
            autoPlay
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>

        {/* Title */}
        {title && (
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
