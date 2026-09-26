import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Ruler, HelpCircle } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen, t, language } = useShop();

  if (!isSizeGuideOpen) return null;

  const sizeData = [
    { size: '38 (S)', bust: '88 - 92', waist: '70 - 74', hips: '96 - 100', length: '142 - 145' },
    { size: '40 (M)', bust: '94 - 98', waist: '76 - 80', hips: '102 - 106', length: '144 - 147' },
    { size: '42 (L)', bust: '100 - 104', waist: '82 - 86', hips: '108 - 112', length: '146 - 148' },
    { size: '44 (XL)', bust: '106 - 112', waist: '88 - 94', hips: '114 - 118', length: '148 - 150' },
    { size: '46 (XXL)', bust: '114 - 120', waist: '96 - 102', hips: '120 - 126', length: '148 - 152' },
  ];

  const abayaSizeData = [
    { size: '52 (S/M)', height: '150 - 155 cm', length: '132 cm', bust: '108 cm' },
    { size: '54 (M/L)', height: '156 - 162 cm', length: '137 cm', bust: '114 cm' },
    { size: '56 (L/XL)', height: '163 - 168 cm', length: '142 cm', bust: '120 cm' },
    { size: '58 (XL/XXL)', height: '169 - 175 cm', length: '147 cm', bust: '126 cm' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-5 ltr:right-5 rtl:left-5 p-2 text-stone-500 hover:text-stone-950 dark:hover:text-white rounded-lg transition-colors"
          aria-label={t.sizeGuideModal.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-800 dark:text-amber-400">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-display text-xl font-semibold text-stone-900 dark:text-stone-100">
              {t.sizeGuideModal.title}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {t.sizeGuideModal.subtitle}
            </p>
          </div>
        </div>

        {/* Standard Dresses Table */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">
            {language === 'ar' ? 'مقاسات فساتين السهرة والأطقم:' : language === 'fr' ? 'Mesures des Robes & Ensembles :' : 'Dresses & Sets Measurements:'}
          </div>
          <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800">
            <table className="w-full text-xs text-stone-700 dark:text-stone-300 divide-y divide-stone-200 dark:divide-stone-800">
              <thead className="bg-stone-100 dark:bg-stone-800/60 font-semibold text-stone-900 dark:text-stone-100">
                <tr>
                  <th className="py-2.5 px-3 text-start">{t.sizeGuideModal.sizeCol}</th>
                  <th className="py-2.5 px-3 text-center">{t.sizeGuideModal.bustCol}</th>
                  <th className="py-2.5 px-3 text-center">{t.sizeGuideModal.waistCol}</th>
                  <th className="py-2.5 px-3 text-center">{t.sizeGuideModal.hipsCol}</th>
                  <th className="py-2.5 px-3 text-center">{t.sizeGuideModal.lengthCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-mono tabular-nums">
                {sizeData.map((row) => (
                  <tr key={row.size} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                    <td className="py-2 px-3 font-sans font-semibold text-stone-900 dark:text-stone-100">{row.size}</td>
                    <td className="py-2 px-3 text-center">{row.bust} cm</td>
                    <td className="py-2 px-3 text-center">{row.waist} cm</td>
                    <td className="py-2 px-3 text-center">{row.hips} cm</td>
                    <td className="py-2 px-3 text-center">{row.length} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Abayas Sizing Table */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">
            {language === 'ar' ? 'مقاسات العبايات والكيمونو (حسب طول القامة):' : language === 'fr' ? 'Mesures des Abayas (selon stature) :' : 'Abayas & Kimonos by Height:'}
          </div>
          <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800">
            <table className="w-full text-xs text-stone-700 dark:text-stone-300 divide-y divide-stone-200 dark:divide-stone-800">
              <thead className="bg-stone-100 dark:bg-stone-800/60 font-semibold text-stone-900 dark:text-stone-100">
                <tr>
                  <th className="py-2.5 px-3 text-start">{t.sizeGuideModal.sizeCol}</th>
                  <th className="py-2.5 px-3 text-center">{language === 'ar' ? 'طول القامة' : 'Taille / Height'}</th>
                  <th className="py-2.5 px-3 text-center">{language === 'ar' ? 'طول العباية' : 'Longueur Abaya'}</th>
                  <th className="py-2.5 px-3 text-center">{t.sizeGuideModal.bustCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-mono tabular-nums">
                {abayaSizeData.map((row) => (
                  <tr key={row.size} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                    <td className="py-2 px-3 font-sans font-semibold text-stone-900 dark:text-stone-100">{row.size}</td>
                    <td className="py-2 px-3 text-center">{row.height}</td>
                    <td className="py-2 px-3 text-center">{row.length}</td>
                    <td className="py-2 px-3 text-center">{row.bust}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note */}
        <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs rounded-xl">
          <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{t.sizeGuideModal.note}</p>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-5 py-2 text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors"
          >
            {t.sizeGuideModal.close}
          </button>
        </div>

      </div>
    </div>
  );
};
