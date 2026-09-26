import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { language, t } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  const categories = [
    { key: 'all', label: t.filters.all },
    { key: 'evening', label: t.filters.evening },
    { key: 'sets', label: t.filters.sets },
    { key: 'abayas', label: t.filters.abayas },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.categoryKey !== selectedCategory) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const name = (product.name[language] || product.name.ar).toLowerCase();
          const desc = (product.description[language] || product.description.ar).toLowerCase();
          const fabric = (product.fabric[language] || product.fabric.ar).toLowerCase();
          return name.includes(query) || desc.includes(query) || fabric.includes(query);
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
      });
  }, [selectedCategory, searchQuery, sortBy, language]);

  return (
    <section id="collection" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-800 dark:text-amber-400 mb-1">
            {t.brandSubtitle}
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100">
            {t.nav.collection}
          </h2>
        </div>

        {/* Count indicator */}
        <div className="text-xs text-stone-500 dark:text-stone-400">
          <span className="font-mono tabular-nums font-semibold text-stone-900 dark:text-stone-100">{filteredProducts.length}</span>{' '}
          {t.filters.foundCount}
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        
        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 shadow-xs'
                    : 'bg-stone-100 text-stone-700 dark:bg-stone-800/80 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.filters.searchPlaceholder}
              className="w-full text-xs py-2 ltr:pl-9 ltr:pr-8 rtl:pr-9 rtl:pl-8 bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute ltr:right-2.5 rtl:left-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs py-2 px-3 bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-700 cursor-pointer"
            >
              <option value="newest">{t.filters.sortNewest}</option>
              <option value="price-asc">{t.filters.sortPriceLow}</option>
              <option value="price-desc">{t.filters.sortPriceHigh}</option>
            </select>
          </div>

        </div>

      </div>

      {/* Product Cards Grid: 1 col on xs, 2 cols on sm, 3 cols on lg */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-base text-stone-500 dark:text-stone-400 mb-4">
            {language === 'ar'
              ? 'لم يتم العثور على تصاميم تطابق بحثك حالياً.'
              : language === 'fr'
              ? 'Aucune création ne correspond à votre recherche.'
              : 'No outfits found matching your criteria.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            {language === 'ar' ? 'عرض جميع التصاميم' : 'Show All Designs'}
          </button>
        </div>
      )}

    </section>
  );
};
