import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, MessageCircle, AlertCircle, ShieldCheck, Mail, Loader2, Truck } from 'lucide-react';
import { BOUTIQUE_WHATSAPP_NUMBER, BOUTIQUE_OWNER_EMAIL } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    language,
    t,
    customerInfo,
    updateCustomerInfo,
    sendWhatsAppOrder,
    submitOrderToEmail,
    isSubmittingOrder,
  } = useShop();

  const [formError, setFormError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const validateCustomerInfo = () => {
    if (!customerInfo.fullName.trim() || !customerInfo.phone.trim() || !customerInfo.wilayaOrCity.trim()) {
      setFormError(t.cart.validationAlert);
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleEmailOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCustomerInfo()) return;
    const res = await submitOrderToEmail(cart, customerInfo, cartTotal);
    if (res.success) {
      clearCart();
      setIsCartOpen(false);
    }
  };

  const handleWhatsAppOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCustomerInfo()) return;
    sendWhatsAppOrder();
  };

  const handleGeneralInquiry = () => {
    const text = encodeURIComponent(
      language === 'ar'
        ? 'مرحباً بوتيك نور كوتور، أود الاستفسار عن تفاصيل التوصيل والمقاسات.'
        : language === 'fr'
        ? 'Bonjour Nour Couture, je souhaite avoir des renseignements concernant la livraison et les tailles.'
        : 'Hello Nour Couture, I would like to inquire about delivery details and sizing.'
    );
    const cleanNumber = BOUTIQUE_WHATSAPP_NUMBER.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 ltr:right-0 rtl:left-0 max-w-full flex">
        <div className="w-screen max-w-md sm:max-w-lg bg-white dark:bg-stone-900 border-x border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-800 dark:text-amber-400" />
              <h2 className="font-serif-display text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-100">
                {t.cart.title}
              </h2>
              {cartCount > 0 && (
                <span className="text-xs px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded font-mono tabular-nums">
                  {cartCount} {t.cart.itemsCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-stone-400 hover:text-rose-600 transition-colors px-2 py-1"
                >
                  {t.cart.clearCart}
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-950 dark:hover:text-white rounded-lg transition-colors"
                aria-label={t.common.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {t.cart.emptyMessage}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-950 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors"
                >
                  {t.cart.emptyAction}
                </button>
              </div>
            ) : (
              <>
                {/* Email dispatch notice */}
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 rounded-xl flex items-center gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                  <Mail className="w-4 h-4 shrink-0 text-amber-800 dark:text-amber-400" />
                  <span>
                    {language === 'ar' 
                      ? `يتم إرسال الطلبات مباشرة إلى البريد الإلكتروني للبوتيك: ${BOUTIQUE_OWNER_EMAIL}`
                      : `Les commandes sont transmises directement à : ${BOUTIQUE_OWNER_EMAIL}`}
                  </span>
                </div>

                {/* Cart Items List */}
                <div className="space-y-4">
                  {cart.map((item) => {
                    const name = item.product.name[language] || item.product.name.ar;
                    const itemKey = `${item.product.id}-${item.selectedSize}-${item.selectedColor}`;
                    const lineTotal = item.product.price * item.quantity;

                    return (
                      <div
                        key={itemKey}
                        className="flex gap-4 p-3 bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 rounded-xl"
                      >
                        {/* Image */}
                        <div className="w-20 h-24 shrink-0 rounded-lg overflow-hidden bg-stone-200 dark:bg-stone-700">
                          <img
                            src={item.product.image}
                            alt={name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-xs sm:text-sm font-medium text-stone-900 dark:text-stone-100 line-clamp-1">
                                {name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                                className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-[11px] text-stone-500 dark:text-stone-400 space-x-2 rtl:space-x-reverse mt-1">
                              <span>{t.cart.size} <strong className="text-stone-700 dark:text-stone-300">{item.selectedSize}</strong></span>
                              <span>·</span>
                              <span>{t.cart.color} <strong className="text-stone-700 dark:text-stone-300">{item.selectedColor}</strong></span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            {/* Quantity Buttons */}
                            <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-md bg-white dark:bg-stone-900">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, -1)}
                                className="px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-mono tabular-nums text-stone-900 dark:text-stone-100">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, 1)}
                                className="px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                              >
                                +
                              </button>
                            </div>

                            {/* Line Total */}
                            <div className="text-xs sm:text-sm font-semibold font-mono tabular-nums text-stone-900 dark:text-stone-100">
                              {lineTotal.toLocaleString()} {t.common.currency}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Subtotal and Shipping */}
                <div className="p-4 bg-stone-100/70 dark:bg-stone-800/50 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600 dark:text-stone-400">
                    <span>{t.cart.subtotal}</span>
                    <span className="font-mono tabular-nums font-semibold text-stone-900 dark:text-stone-100">
                      {cartTotal.toLocaleString()} {t.common.currency}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-600 dark:text-stone-400">
                    <span>{t.cart.shipping}</span>
                    <span className="text-amber-800 dark:text-amber-400 font-medium">
                      {t.cart.shippingValue}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-between text-sm font-bold text-stone-950 dark:text-stone-50">
                    <span>{t.cart.total}</span>
                    <span className="font-mono tabular-nums text-base">
                      {cartTotal.toLocaleString()} {t.common.currency}
                    </span>
                  </div>
                </div>

                {/* Customer Delivery Information Form (معلومات الطلب) */}
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <span>{t.cart.customerInfoTitle}</span>
                    </h3>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {t.cart.customerInfoSubtitle}
                    </p>
                  </div>

                  {formError && (
                    <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form id="cart-order-form" onSubmit={handleEmailOrderSubmit} className="space-y-3">
                    
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        {t.cart.fullName} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.fullName}
                        onChange={(e) => updateCustomerInfo('fullName', e.target.value)}
                        placeholder={t.cart.fullNamePlaceholder}
                        className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-700"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        {t.cart.phone} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={(e) => updateCustomerInfo('phone', e.target.value)}
                        placeholder={t.cart.phonePlaceholder}
                        className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-700 font-mono"
                      />
                    </div>

                    {/* Wilaya / City */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        {t.cart.wilayaOrCity} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.wilayaOrCity}
                        onChange={(e) => updateCustomerInfo('wilayaOrCity', e.target.value)}
                        placeholder={t.cart.wilayaPlaceholder}
                        className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-700"
                      />
                    </div>

                    {/* Full Address */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        {t.cart.address}
                      </label>
                      <input
                        type="text"
                        value={customerInfo.address}
                        onChange={(e) => updateCustomerInfo('address', e.target.value)}
                        placeholder={t.cart.addressPlaceholder}
                        className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-700"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        {t.cart.notes}
                      </label>
                      <textarea
                        rows={2}
                        value={customerInfo.notes}
                        onChange={(e) => updateCustomerInfo('notes', e.target.value)}
                        placeholder={t.cart.notesPlaceholder}
                        className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-700 resize-none"
                      />
                    </div>

                  </form>
                </div>
              </>
            )}

          </div>

          {/* Drawer Footer Actions */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/50 space-y-2.5">
              
              {/* Primary: Send to Boutique Email */}
              <button
                type="submit"
                form="cart-order-form"
                disabled={isSubmittingOrder}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmittingOrder ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.cart.sendingOrder}</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>{t.cart.orderViaEmail}</span>
                  </>
                )}
              </button>

              {/* WhatsApp Order Button */}
              <button
                type="button"
                onClick={handleWhatsAppOrderSubmit}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t.cart.orderViaWhatsapp}</span>
              </button>

              {/* Inquiry Button */}
              <button
                type="button"
                onClick={handleGeneralInquiry}
                className="w-full py-2 px-4 text-xs font-medium text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.product.inquireWhatsapp}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400 text-center pt-1">
                <Truck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>{t.cart.guarantee}</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
