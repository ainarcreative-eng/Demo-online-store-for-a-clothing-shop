import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, HeartHandshake, Scissors } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t } = useShop();

  return (
    <section id="about" className="py-16 bg-stone-100/70 dark:bg-stone-900/60 border-y border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="text-xs font-semibold tracking-widest uppercase text-amber-800 dark:text-amber-400">
            {t.about.title}
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-stone-900 dark:text-stone-100 text-balance">
            {t.about.heading}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            {t.about.p1}
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-stone-900 dark:text-stone-100">
              {t.about.feature1Title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t.about.feature1Desc}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 flex items-center justify-center">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-stone-900 dark:text-stone-100">
              {t.about.feature2Title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t.about.feature2Desc}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-stone-900 dark:text-stone-100">
              {t.about.feature3Title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t.about.feature3Desc}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
