import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShoppingBag, MessageCircle, Ruler, Check, Truck, ShieldCheck, Heart, Zap } from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { 
    activeProductModal, 
    setActiveProductModal, 
    language, 
    t, 
    addToCart, 
    sendWhatsAppInquiry, 
    setIsSizeGuideOpen,
    wishlist,
    toggleWishlist,
    openDirectOrder,
  } = useShop();

  const product = activeProductModal;

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0]?.name[language] || '');
      setQuantity(1);
    }
  }, [product, language]);

  if (!product) return null;

  const name = product.name[language] || product.name.ar;
  const description = product.description[language] || product.description.ar;
  const fabric = product.fabric[language] || product.fabric.ar;
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleOpenDirectOrder = () => {
    setActiveProductModal(null);
    openDirectOrder(product);
  };

  const handleDirectWhatsAppOrder = () => {
    sendWhatsAppInquiry(product, selectedSize, selectedColor);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={() => setActiveProductModal(null)}
          className="absolute top-4 ltr:right-4 rtl:left-4 z-10 p-2 text-stone-500 hover:text-stone-950 dark:hover:text-white bg-white/80 dark:bg-stone-800/80 rounded-full backdrop-blur-xs transition-colors"
          aria-label={t.common.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="md:w-1/2 relative bg-stone-100 dark:bg-stone-800/60 aspect-[3/4] md:aspect-auto min-h-[320px] md:min-h-full">
          <img
            src={product.image}
            alt={name}
            className="w-full h-full object-cover object-top"
          />

          <button
            onClick={() => toggleWishlist(product.id)}
            className={`absolute top-4 ltr:left-4 rtl:right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400 shadow-sm'
                : 'bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Purchase Module Section */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[92vh] space-y-6">
          
          <div className="space-y-4">
            
            {/* Meta and Category */}
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <span className="uppercase font-medium tracking-wider">{product.category[language]}</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {t.product.inStock}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif-display text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100 leading-snug">
              {name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-semibold font-mono tabular-nums text-stone-950 dark:text-stone-50">
                {product.price.toLocaleString()} <span className="text-sm font-normal text-stone-600 dark:text-stone-400">{t.common.currency}</span>
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                  {product.originalPrice.toLocaleString()} {t.common.currency}
                </span>
              )}
            </div>

            {/* Fabric Specification */}
            <div className="text-xs bg-stone-50 dark:bg-stone-800/50 p-3 rounded-lg border border-stone-100 dark:border-stone-800 text-stone-700 dark:text-stone-300">
              <span className="font-semibold text-stone-900 dark:text-stone-100">{t.product.fabric} </span>
              <span>{fabric}</span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {description}
            </p>

            {/* Color Swatches */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-stone-800 dark:text-stone-200">{t.product.selectColor}</span>
                <span className="text-stone-500">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => {
                  const colorName = color.name[language] || color.name.ar;
                  const isSelected = selectedColor === colorName;
                  return (
                    <button
                      key={colorName}
                      onClick={() => setSelectedColor(colorName)}
                      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'border-amber-700 bg-amber-50/50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 font-medium'
                          : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-stone-300 dark:border-stone-600 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{colorName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector + Size Guide */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-stone-800 dark:text-stone-200">{t.product.selectSize}</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{t.product.sizeGuide}</span>
                </button>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                        isSelected
                          ? 'border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 shadow-xs'
                          : 'border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-medium text-stone-800 dark:text-stone-200">{t.cart.quantity}</span>
              <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-stone-50 dark:bg-stone-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300"
                >
                  -
                </button>
                <span className="px-3 text-xs font-mono font-semibold tabular-nums text-stone-900 dark:text-stone-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-stone-200 dark:border-stone-800">
            {/* Primary Action: Direct Order Form */}
            <button
              onClick={handleOpenDirectOrder}
              className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-950 rounded-xl hover:bg-stone-800 dark:hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Zap className="w-4 h-4 text-amber-400 dark:text-amber-600 fill-current" />
              <span>{t.directOrder.button} (ملء المعلومات والإرسال للإيميل)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddToCart}
                className="py-3 px-3 text-xs font-medium text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.product.addToCart}</span>
              </button>

              <button
                onClick={handleDirectWhatsAppOrder}
                className="py-3 px-3 text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{t.product.inquireWhatsapp}</span>
              </button>
            </div>

            {/* Reassurance notes */}
            <div className="flex items-center justify-around text-[11px] text-stone-500 dark:text-stone-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>{t.product.deliveryBadge}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>{language === 'ar' ? 'فحص الطلب قبل الدفع' : 'Paiement à la livraison'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
