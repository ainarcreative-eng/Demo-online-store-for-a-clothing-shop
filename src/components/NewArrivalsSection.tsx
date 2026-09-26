import React from 'react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Sparkles } from 'lucide-react';

export const NewArrivalsSection: React.FC = () => {
  const { t, language } = useShop();

  const newProducts = products.filter((p) => p.isNew);

  return (
    <section id="new-arrivals" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200 dark:border-stone-800">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-amber-800 dark:text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'أحدث صيحات الموضة المحتشمة' : language === 'fr' ? 'Dernières Créations' : 'New Season Highlights'}</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100">
            {t.nav.newArrivals}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md">
          {language === 'ar'
            ? 'قطع مختارة بعناية لحفلات ومناسبات الموسم بتفاصيل راقية وخامات لا مثيل لها.'
            : language === 'fr'
            ? 'Des pièces d’exception pensées pour vos grands événements et moments précieux.'
            : 'Carefully curated dresses designed for your most memorable gatherings and celebrations.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
};
