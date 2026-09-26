import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Moon, Sun, Globe, Menu, X, Phone } from 'lucide-react';
import { Language } from '../types';
import { BOUTIQUE_DISPLAY_PHONE } from '../data/products';

export const Navbar: React.FC = () => {
  const { language, setLanguage, theme, toggleTheme, t, cartCount, setIsCartOpen } = useShop();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'ar', label: 'العربية' },
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-50/90 dark:bg-stone-950/90 border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
      {/* Subtle top promotional banner */}
      <div className="bg-stone-900 text-stone-200 dark:bg-stone-900 dark:text-stone-300 py-1.5 px-4 text-xs font-medium text-center flex items-center justify-center gap-3">
        <span>{t.hero.freeShippingNote}</span>
        <span className="hidden sm:inline opacity-40">|</span>
        <a 
          href={`tel:${BOUTIQUE_DISPLAY_PHONE.replace(/\s+/g, '')}`} 
          className="hidden sm:inline-flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
        >
          <Phone className="w-3 h-3" />
          <span className="dir-ltr font-mono tabular-nums">{BOUTIQUE_DISPLAY_PHONE}</span>
        </a>
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a href="#" className="font-serif-display text-2xl sm:text-3xl font-semibold tracking-wider text-stone-900 dark:text-stone-100 uppercase">
            {t.brandName}
          </a>
        </div>

        {/* Zone 2: 4-5 Clean Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700 dark:text-stone-300">
          <a href="#" className="hover:text-stone-950 dark:hover:text-white transition-colors py-1 relative group">
            {t.nav.home}
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
          </a>
          <a href="#collection" className="hover:text-stone-950 dark:hover:text-white transition-colors py-1 relative group">
            {t.nav.collection}
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
          </a>
          <a href="#new-arrivals" className="hover:text-stone-950 dark:hover:text-white transition-colors py-1 relative group">
            {t.nav.newArrivals}
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
          </a>
          <a href="#about" className="hover:text-stone-950 dark:hover:text-white transition-colors py-1 relative group">
            {t.nav.about}
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
          </a>
        </nav>

        {/* Zone 3: Actions (Language, Dark Mode, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors"
              aria-label="Change language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="uppercase">{language}</span>
            </button>

            {isLangDropdownOpen && (
              <div 
                className="absolute top-full mt-2 w-32 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg shadow-lg py-1 z-50 ltr:right-0 rtl:left-0"
              >
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-start px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                      language === lang.code
                        ? 'font-semibold text-amber-800 dark:text-amber-400 bg-amber-50/60 dark:bg-amber-950/30'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {language === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors"
            aria-label={theme === 'dark' ? t.common.themeLight : t.common.themeDark}
            title={theme === 'dark' ? t.common.themeLight : t.common.themeDark}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700" />
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200/80 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-lg transition-colors whitespace-nowrap"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4 text-amber-800 dark:text-amber-400" />
            <span className="hidden sm:inline">{t.cart.title}</span>
            {cartCount > 0 && (
              <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold text-white bg-amber-700 dark:bg-amber-600 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-950/95 px-4 py-4 space-y-3">
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-800 dark:text-stone-200 hover:text-amber-800 dark:hover:text-amber-400 py-1"
          >
            {t.nav.home}
          </a>
          <a
            href="#collection"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-800 dark:text-stone-200 hover:text-amber-800 dark:hover:text-amber-400 py-1"
          >
            {t.nav.collection}
          </a>
          <a
            href="#new-arrivals"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-800 dark:text-stone-200 hover:text-amber-800 dark:hover:text-amber-400 py-1"
          >
            {t.nav.newArrivals}
          </a>
          <a
            href="#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-800 dark:text-stone-200 hover:text-amber-800 dark:hover:text-amber-400 py-1"
          >
            {t.nav.about}
          </a>

          <div className="pt-2 border-t border-stone-100 dark:border-stone-900 flex items-center justify-between text-xs text-stone-500">
            <span>{BOUTIQUE_DISPLAY_PHONE}</span>
            <span className="font-medium text-emerald-700 dark:text-emerald-400">WhatsApp 24/7</span>
          </div>
        </div>
      )}
    </header>
  );
};
