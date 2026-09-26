import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MessageCircle, X } from 'lucide-react';
import { BOUTIQUE_WHATSAPP_NUMBER } from '../data/products';

export const WhatsAppFloatingButton: React.FC = () => {
  const { language, t } = useShop();
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    const cleanNumber = BOUTIQUE_WHATSAPP_NUMBER.replace(/\D/g, '');
    const text = encodeURIComponent(
      language === 'ar'
        ? 'مرحباً بوتيك نور كوتور 👋، أريد الاستفسار عن فساتين وتصاميم المحجبات.'
        : language === 'fr'
        ? 'Bonjour Nour Couture 👋, je souhaite avoir des conseils sur votre collection.'
        : 'Hello Nour Couture 👋, I would like to inquire about your modest fashion collection.'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 ltr:right-6 rtl:left-6 z-40 flex items-center gap-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl rounded-full py-1.5 px-3.5 text-xs font-medium text-stone-800 dark:text-stone-200 animate-fade-in">
          <span>{t.whatsappMessages.inquiryPrefix.split('\n')[0]}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-0.5"
            aria-label="Close message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative group"
        aria-label="WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white dark:border-stone-900" />
      </button>
    </div>
  );
};
