import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, ArrowRight, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { BOUTIQUE_DISPLAY_PHONE } from '../data/products';

export const Hero: React.FC = () => {
  const { language, t } = useShop();
  const isRtl = language === 'ar';

  return (
    <section className="relative overflow-hidden bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Editorial Text Content */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-800 dark:text-amber-400">
              <span className="w-6 h-px bg-amber-800/40 dark:bg-amber-400/40" />
              <span>{t.hero.tagline}</span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 dark:text-stone-100 leading-[1.2] text-balance">
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#collection"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-950 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-all shadow-sm group"
              >
                <span>{t.hero.shopNow}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                )}
              </a>

              <a
                href="#new-arrivals"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700/80 border border-stone-200 dark:border-stone-700 rounded-lg transition-colors shadow-sm"
              >
                {t.hero.exploreNew}
              </a>
            </div>

            {/* Trust points */}
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800/80 grid grid-cols-3 gap-4 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                <span>{language === 'ar' ? 'توصيل لكافة الولايات' : language === 'fr' ? 'Livraison nationale' : 'Nationwide Delivery'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                <span>{language === 'ar' ? 'دفع عند الاستلام' : language === 'fr' ? 'Paiement à réception' : 'Cash on Delivery'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{language === 'ar' ? 'طلب فوري بالواتساب' : language === 'fr' ? 'WhatsApp direct' : 'WhatsApp Orders'}</span>
              </div>
            </div>

          </div>

          {/* Editorial Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-800 aspect-[16/10] sm:aspect-[16/10] lg:aspect-[4/3]">
              <img
                src="/src/assets/images/hero_modest_boutique_1790422004564.jpg"
                alt="Nour Modest Fashion Boutique Collection"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex items-end justify-between">
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-amber-300">
                    {language === 'ar' ? 'تصاميم محتشمة راقية' : language === 'fr' ? 'Haute Couture Modeste' : 'Bespoke Modest Couture'}
                  </span>
                  <p className="text-sm sm:text-base font-serif-display font-medium text-stone-100">
                    {language === 'ar' ? 'أناقة الحجاب بأجود خامات الساتان والحرير' : language === 'fr' ? 'Finesse des soies et coupes royales' : 'Pure silks and royal artisanal tailoring'}
                  </p>
                </div>
                <div className="hidden sm:block text-end">
                  <span className="text-[11px] text-stone-300 block">{language === 'ar' ? 'خدمة الزبونات' : 'Service Client'}</span>
                  <span className="text-xs font-mono font-medium tracking-tight text-white">{BOUTIQUE_DISPLAY_PHONE}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
