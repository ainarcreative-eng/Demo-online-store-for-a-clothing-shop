import React from 'react';
import { useShop } from '../context/ShopContext';
import { MessageCircle, Phone, MapPin, Clock, Heart } from 'lucide-react';
import { BOUTIQUE_DISPLAY_PHONE, BOUTIQUE_WHATSAPP_NUMBER } from '../data/products';

export const Footer: React.FC = () => {
  const { t, language } = useShop();

  const handleWhatsAppClick = () => {
    const cleanNumber = BOUTIQUE_WHATSAPP_NUMBER.replace(/\D/g, '');
    const text = encodeURIComponent(
      language === 'ar'
        ? 'مرحباً بوتيك نور كوتور، أود الاستفسار عن التشكيلة المعروضة.'
        : 'Bonjour Nour Couture, je souhaite avoir des renseignements.'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  return (
    <footer id="contact" className="bg-stone-900 text-stone-300 dark:bg-stone-950 dark:text-stone-400 border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-serif-display text-2xl font-bold text-stone-100">
              {t.brandName}
            </h3>
            <p className="text-xs leading-relaxed text-stone-400">
              {t.footer.boutiqueDesc}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-400 font-medium">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{t.hero.freeShippingNote}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#" className="hover:text-stone-100 transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-stone-100 transition-colors">
                  {t.nav.collection}
                </a>
              </li>
              <li>
                <a href="#new-arrivals" className="hover:text-stone-100 transition-colors">
                  {t.nav.newArrivals}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-stone-100 transition-colors">
                  {t.nav.about}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100">
              {t.footer.customerService}
            </h4>
            
            <div className="space-y-2 text-xs">
              <button
                onClick={handleWhatsAppClick}
                className="w-full py-2.5 px-3 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t.common.whatsapp}: {BOUTIQUE_DISPLAY_PHONE}</span>
              </button>

              <div className="flex items-center gap-2 text-stone-400 pt-1">
                <Clock className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                <span className="text-[11px]">{t.footer.workingHours}</span>
              </div>

              <div className="flex items-center gap-2 text-stone-400">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                <span className="text-[11px]">
                  {language === 'ar' ? 'توصيل منزلي لجميع الولايات الـ 58' : 'Livraison à domicile sur 58 Wilayas'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100">
              {t.nav.contact}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              {language === 'ar'
                ? 'فريقنا النسائي المتخصص جاهز لمساعدتك في اختيار المقاس وتأكيد الطلب الفوري عبر تطبيق الواتساب أو الاتصال الهاتفي.'
                : 'Notre équipe est à votre écoute pour vous conseiller sur le choix des tailles et répondre à vos questions.'}
            </p>
            <a
              href={`tel:${BOUTIQUE_DISPLAY_PHONE.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 text-xs font-mono text-stone-200 hover:text-white"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{BOUTIQUE_DISPLAY_PHONE}</span>
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{t.cart.guarantee}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
