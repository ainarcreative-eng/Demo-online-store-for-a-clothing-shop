import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Mail, MessageCircle, Truck, ShieldCheck, Check, AlertCircle, Loader2 } from 'lucide-react';
import { BOUTIQUE_OWNER_EMAIL } from '../data/products';

export const DirectOrderModal: React.FC = () => {
  const {
    directOrderProduct,
    setDirectOrderProduct,
    isDirectOrderOpen,
    setIsDirectOrderOpen,
    language,
    t,
    customerInfo,
    updateCustomerInfo,
    submitOrderToEmail,
    isSubmittingOrder,
    sendWhatsAppInquiry,
    setIsOrderSuccessOpen,
    setLastOrderData,
    setLastOrderRef,
  } = useShop();

  const product = directOrderProduct;

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0]?.name[language] || product.colors[0]?.name.ar || '');
      setQuantity(1);
      setFormError(null);
    }
  }, [product, language]);

  if (!isDirectOrderOpen || !product) return null;

  const name = product.name[language] || product.name.ar;
  const totalPrice = product.price * quantity;

  const validateForm = () => {
    if (!customerInfo.fullName.trim() || !customerInfo.phone.trim() || !customerInfo.wilayaOrCity.trim()) {
      setFormError(t.cart.validationAlert);
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleEmailOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const singleItem = {
      product,
      selectedSize: selectedSize || product.sizes[0],
      selectedColor: selectedColor || product.colors[0].name[language],
      quantity,
    };

    const res = await submitOrderToEmail([singleItem], customerInfo, totalPrice);
    if (res.success) {
      setIsDirectOrderOpen(false);
      setDirectOrderProduct(null);
    }
  };

  const handleWhatsAppOrder = () => {
    if (!validateForm()) return;

    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0].name[language];
    const orderRef = 'NOUR-' + Math.floor(100000 + Math.random() * 900000);

    const msgs = t.whatsappMessages;
    let message = `${msgs.orderHeader}\n`;
    message += `🏷️ *${msgs.orderNumber}* #${orderRef}\n\n`;
    message += `${msgs.items}\n`;
    message += `  1. *${name}*\n`;
    message += `     • ${t.cart.size} ${size}\n`;
    message += `     • ${t.cart.color} ${color}\n`;
    message += `     • ${t.cart.quantity} ${quantity} × ${product.price.toLocaleString()} ${t.common.currency}\n`;
    message += `     • المجموع: ${totalPrice.toLocaleString()} ${t.common.currency}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `${msgs.totalPrice} *${totalPrice.toLocaleString()} ${t.common.currency}*\n\n`;
    message += `${msgs.customerDetails}\n`;
    message += `• ${msgs.name} ${customerInfo.fullName}\n`;
    message += `• ${msgs.phone} ${customerInfo.phone}\n`;
    message += `• ${msgs.city} ${customerInfo.wilayaOrCity}\n`;
    if (customerInfo.address.trim()) {
      message += `• ${msgs.address} ${customerInfo.address}\n`;
    }
    if (customerInfo.notes.trim()) {
      message += `• ${msgs.notes} ${customerInfo.notes}\n`;
    }
    message += `\n${msgs.orderFooter}`;

    const cleanNumber = "+213555123456".replace(/\D/g, '');
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank');

    setLastOrderRef(orderRef);
    setLastOrderData({
      orderId: orderRef,
      items: [{
        product,
        selectedSize: size,
        selectedColor: color,
        quantity,
      }],
      total: totalPrice,
      customerInfo,
      sentToEmail: true,
      emailTarget: BOUTIQUE_OWNER_EMAIL,
    });

    // Also quietly submit to server / email in background so the merchant receives both
    submitOrderToEmail([{
      product,
      selectedSize: size,
      selectedColor: color,
      quantity,
    }], customerInfo, totalPrice);

    setIsDirectOrderOpen(false);
    setDirectOrderProduct(null);
    setIsOrderSuccessOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-950/50">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400 block">
              {t.directOrder.button}
            </span>
            <h2 className="font-serif-display text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
              {t.directOrder.modalTitle}
            </h2>
          </div>
          <button
            onClick={() => {
              setIsDirectOrderOpen(false);
              setDirectOrderProduct(null);
            }}
            className="p-2 text-stone-500 hover:text-stone-950 dark:hover:text-white rounded-lg transition-colors"
            aria-label={t.common.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Target Email Banner */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 rounded-xl flex items-center gap-3 text-xs text-amber-900 dark:text-amber-200">
            <Mail className="w-4 h-4 shrink-0 text-amber-800 dark:text-amber-400" />
            <div>
              <span className="font-semibold block">{t.directOrder.destinationEmailNote}</span>
              <span className="text-[11px] opacity-80">{t.directOrder.cashOnDelivery}</span>
            </div>
          </div>

          {/* Product Summary Row */}
          <div className="flex gap-4 p-3.5 bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 rounded-xl items-center">
            <div className="w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-stone-200 dark:bg-stone-700">
              <img
                src={product.image}
                alt={name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-stone-900 dark:text-stone-100 truncate">
                {name}
              </h3>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                {product.category[language]} · {product.fabric[language]}
              </div>
              <div className="text-sm font-semibold font-mono tabular-nums text-amber-800 dark:text-amber-400 mt-1">
                {product.price.toLocaleString()} {t.common.currency}
              </div>
            </div>
          </div>

          {/* Sizing & Color Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Size Choice */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                {t.product.selectSize}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-all text-center ${
                      selectedSize === size
                        ? 'border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-semibold'
                        : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Choice */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                {t.product.selectColor}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.colors.map((color) => {
                  const colorName = color.name[language] || color.name.ar;
                  const isSelected = selectedColor === colorName;
                  return (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() => setSelectedColor(colorName)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold'
                          : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-stone-300 dark:border-stone-600 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{colorName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Quantity & Total Price Bar */}
          <div className="flex items-center justify-between p-3 bg-stone-100/70 dark:bg-stone-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                {t.cart.quantity}
              </span>
              <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-white dark:bg-stone-900">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  -
                </button>
                <span className="px-2.5 text-xs font-mono font-semibold tabular-nums text-stone-900 dark:text-stone-100">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-end">
              <span className="text-[11px] text-stone-500 block">{t.cart.total}</span>
              <span className="text-base font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">
                {totalPrice.toLocaleString()} {t.common.currency}
              </span>
            </div>
          </div>

          {/* Form Error Alert */}
          {formError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Direct Delivery Information Inputs */}
          <form id="direct-order-form" onSubmit={handleEmailOrder} className="space-y-3 pt-2">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Full Name */}
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

            {/* Detailed Address */}
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

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/50 space-y-2.5">
          
          {/* Main Action: Send to Boutique Email */}
          <button
            type="submit"
            form="direct-order-form"
            disabled={isSubmittingOrder}
            className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmittingOrder ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.directOrder.sendingEmail}</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                <span>{t.directOrder.sendEmailButton}</span>
              </>
            )}
          </button>

          {/* Secondary Action: Order via WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsAppOrder}
            className="w-full py-2.5 px-4 text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>{t.directOrder.orViaWhatsapp}</span>
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 text-center pt-1">
            <Truck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>{t.directOrder.cashOnDelivery}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
