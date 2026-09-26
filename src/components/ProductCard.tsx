import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Eye, Heart, MessageCircle, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    language, 
    t, 
    addToCart, 
    setActiveProductModal, 
    wishlist, 
    toggleWishlist,
    sendWhatsAppInquiry,
    openDirectOrder,
  } = useShop();

  const isWishlisted = wishlist.includes(product.id);
  const name = product.name[language] || product.name.ar;
  const category = product.category[language] || product.category.ar;
  const badge = product.badge ? product.badge[language] || product.badge.ar : null;

  return (
    <article className="group flex flex-col bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] bg-stone-100 dark:bg-stone-800/60 overflow-hidden">
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle Badge */}
        {badge && (
          <div className="absolute top-3 ltr:left-3 rtl:right-3 bg-stone-950/70 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-sm">
            {badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 ltr:right-3 rtl:left-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400 shadow-sm'
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400'
          }`}
          aria-label="Save to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick Action Overlay for Desktop */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center gap-2">
          <button
            onClick={() => setActiveProductModal(product)}
            className="flex-1 py-2 px-3 text-xs font-semibold bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-stone-100 rounded-md shadow-md hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.product.quickView}</span>
          </button>
          
          <button
            onClick={() => openDirectOrder(product)}
            className="py-2 px-3 text-xs font-semibold bg-amber-800 dark:bg-amber-700 text-white rounded-md shadow-md hover:bg-amber-900 dark:hover:bg-amber-600 flex items-center justify-center gap-1 transition-colors"
            title={t.directOrder.button}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{t.directOrder.button}</span>
          </button>

          <button
            onClick={() => addToCart(product, product.sizes[0], product.colors[0].name[language], 1)}
            className="p-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-md shadow-md hover:bg-stone-800 dark:hover:bg-white transition-colors"
            title={t.product.addToCart}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Category & Material Metadata */}
          <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2 mb-1.5">
            <span>{category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate max-w-[140px]">{product.fabric[language]}</span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => setActiveProductModal(product)}
            className="font-medium text-sm sm:text-base text-stone-900 dark:text-stone-100 hover:text-amber-800 dark:hover:text-amber-400 cursor-pointer line-clamp-1 transition-colors"
          >
            {name}
          </h3>
        </div>

        {/* Price and Inquiry Row */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-base sm:text-lg text-stone-950 dark:text-stone-50 font-mono tabular-nums">
              {product.price.toLocaleString()} <span className="text-xs font-normal text-stone-600 dark:text-stone-400">{t.common.currency}</span>
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* WhatsApp Direct Inquiry Button */}
          <button
            onClick={() => sendWhatsAppInquiry(product)}
            className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 py-1 px-2 rounded hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
            title={t.product.inquireWhatsapp}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{t.common.whatsapp}</span>
          </button>
        </div>

        {/* Direct Order Button on the Card */}
        <div className="pt-1 flex items-center gap-2">
          <button
            onClick={() => openDirectOrder(product)}
            className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-white rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600 fill-current" />
            <span>{t.directOrder.button}</span>
          </button>

          <button
            onClick={() => addToCart(product, product.sizes[0], product.colors[0].name[language], 1)}
            className="p-2 text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors"
            title={t.product.addToCart}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

      </div>

    </article>
  );
};
