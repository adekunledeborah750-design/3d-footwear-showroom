import React from 'react';
import { useCustomizer } from '../../context/CustomizerContext';
import { CheckCircle2, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toastMessage, setToastMessage } = useCustomizer();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-xl bg-[#17191E]/95 backdrop-blur-md border border-[#8CA8FF]/40 shadow-2xl p-4 text-[#F5F4F0] flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <CheckCircle2 className="w-5 h-5 text-[#8CA8FF] shrink-0 mt-0.5" />
      <div className="flex-1 text-xs font-sans leading-relaxed">
        {toastMessage}
      </div>
      <button
        onClick={() => setToastMessage(null)}
        className="text-[#A4A6AE] hover:text-white transition-colors p-0.5"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
