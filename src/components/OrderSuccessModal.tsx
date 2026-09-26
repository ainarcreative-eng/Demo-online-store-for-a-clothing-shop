import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, MessageCircle, ArrowRight, ArrowLeft, Mail, Phone, ExternalLink } from 'lucide-react';
import { BOUTIQUE_DISPLAY_PHONE, BOUTIQUE_OWNER_EMAIL, BOUTIQUE_WHATSAPP_NUMBER } from '../data/products';

export const OrderSuccessModal: React.FC = () => {
  const { 
    isOrderSuccessOpen, 
    setIsOrderSuccessOpen, 
    lastOrderRef, 
    lastOrderData,
    customerInfo, 
    language, 
    t,
    clearCart
  } = useShop();

  if (!isOrderSuccessOpen) return null;

  const isRtl = language === 'ar';
  const info = lastOrderData?.customerInfo || customerInfo;
  const items = lastOrderData?.items || [];
  const total = lastOrderData?.total || 0;

  const handleFinish = () => {
    clearCart();
    setIsOrderSuccessOpen(false);
  };

  const handleOpenWhatsApp = () => {
    const msgs = t.whatsappMessages;
    let message = `${msgs.orderHeader}\n`;
    message += `🏷️ *${msgs.orderNumber}* #${lastOrderRef}\n\n`;
    message += `${msgs.items}\n`;

    items.forEach((it, idx) => {
      const prodName = it.product.name[language] || it.product.name.ar;
      message += `  ${idx + 1}. *${prodName}* (${it.selectedSize}, ${it.selectedColor}) × ${it.quantity}\n`;
    });

    message += `\n${msgs.totalPrice} *${total.toLocaleString()} ${t.common.currency}*\n\n`;
    message += `${msgs.customerDetails}\n`;
    message += `• ${msgs.name} ${info.fullName}\n`;
    message += `• ${msgs.phone} ${info.phone}\n`;
    message += `• ${msgs.city} ${info.wilayaOrCity}\n`;
    if (info.address) message += `• ${msgs.address} ${info.address}\n`;

    message += `\n${msgs.orderFooter}`;

    const cleanNumber = BOUTIQUE_WHATSAPP_NUMBER.replace(/\D/g, '');
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank');
  };

  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(`طلب شراء جديد: #${lastOrderRef} - ${info.fullName}`);
    let body = `مرحباً بوتيك نور كوتور،\n\nأود تأكيد طلبي المسجل برقم: #${lastOrderRef}\n\n`;
    body += `بيانات الزبونة:\n- الاسم: ${info.fullName}\n- الهاتف: ${info.phone}\n- الولاية: ${info.wilayaOrCity}\n- العنوان: ${info.address || 'غير محدد'}\n\n`;
    body += `المبلغ الإجمالي: ${total.toLocaleString()} ${t.common.currency}\nالدفع عند الاستلام.\nشكراً لكم!`;
    window.location.href = `mailto:${BOUTIQUE_OWNER_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-center space-y-5 my-auto max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Animated Green Badge */}
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Title & Ref Number */}
        <div className="space-y-1.5">
          <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
            {language === 'ar'
              ? 'تم استلام وتأكيد طلبك بنجاح!'
              : language === 'fr'
              ? 'Votre commande a été transmise avec succès !'
              : 'Your Order Has Been Successfully Received!'}
          </h3>
          {lastOrderRef && (
            <div className="inline-block px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-mono font-semibold rounded-md tabular-nums">
              {t.whatsappMessages.orderNumber} #{lastOrderRef}
            </div>
          )}
        </div>

        {/* Destination Email Highlight Box */}
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200 text-xs rounded-xl flex items-start gap-3 text-start">
          <Mail className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block text-emerald-950 dark:text-emerald-100">
              {language === 'ar'
                ? 'تم إرسال الطلب مباشرة إلى البريد الإلكتروني للبوتيك:'
                : language === 'fr'
                ? 'La commande a été transmise directement par e-mail à la boutique :'
                : 'Order dispatched directly to boutique email:'}
            </span>
            <div className="font-mono font-medium text-emerald-700 dark:text-emerald-300 select-all">
              {BOUTIQUE_OWNER_EMAIL}
            </div>
            <p className="text-[11px] opacity-80 pt-0.5">
              {language === 'ar'
                ? 'سيتواصل معكِ فريق البوتيك هاتفياً لتأكيد وقت ومكان التوصيل.'
                : 'Notre équipe vous contactera par téléphone pour confirmer la livraison.'}
            </p>
          </div>
        </div>

        {/* Order Details Recap */}
        {items.length > 0 && (
          <div className="p-3.5 bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 rounded-xl text-xs text-start space-y-2.5">
            <div className="font-semibold text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-700 pb-1.5 flex justify-between items-center">
              <span>{t.whatsappMessages.items}</span>
              <span className="font-mono text-amber-800 dark:text-amber-400 font-bold tabular-nums">
                {total.toLocaleString()} {t.common.currency}
              </span>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px] text-stone-600 dark:text-stone-300">
                  <div className="truncate max-w-[240px]">
                    <span className="font-medium text-stone-900 dark:text-stone-100">
                      {it.product.name[language] || it.product.name.ar}
                    </span>
                    <span className="text-stone-400 mx-1">({it.selectedSize}, {it.selectedColor})</span>
                  </div>
                  <span className="font-mono tabular-nums text-stone-700 dark:text-stone-300">
                    ×{it.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-700 grid grid-cols-2 gap-2 text-[11px] text-stone-600 dark:text-stone-400">
              <div>
                <span className="text-stone-400 block">{t.cart.fullName}:</span>
                <span className="font-medium text-stone-800 dark:text-stone-200">{info.fullName}</span>
              </div>
              <div>
                <span className="text-stone-400 block">{t.cart.phone}:</span>
                <span className="font-medium font-mono text-stone-800 dark:text-stone-200">{info.phone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-stone-400 block">{t.cart.wilayaOrCity}:</span>
                <span className="font-medium text-stone-800 dark:text-stone-200">{info.wilayaOrCity} {info.address ? `· ${info.address}` : ''}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          {/* WhatsApp option */}
          <button
            onClick={handleOpenWhatsApp}
            className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>
              {language === 'ar' ? 'تأكيد واستفسار سريع عبر الواتساب' : language === 'fr' ? 'Confirmer aussi sur WhatsApp' : 'Follow up on WhatsApp'}
            </span>
          </button>

          {/* Mail Client fallback */}
          <button
            onClick={handleOpenMailClient}
            className="w-full py-2.5 px-4 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>
              {language === 'ar' ? 'فتح في تطبيق البريد (Email)' : 'Ouvrir dans l\'application e-mail'}
            </span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </button>

          {/* Finish & Continue shopping */}
          <button
            onClick={handleFinish}
            className="w-full py-3 px-4 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-950 rounded-xl hover:bg-stone-800 dark:hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <span>
              {language === 'ar' ? 'العودة للمتجر ومتابعة التسوق' : language === 'fr' ? 'Continuer mes achats' : 'Continue Shopping'}
            </span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
          <Phone className="w-3 h-3 text-amber-500" />
          <span>{BOUTIQUE_DISPLAY_PHONE}</span>
        </div>

      </div>
    </div>
  );
};
