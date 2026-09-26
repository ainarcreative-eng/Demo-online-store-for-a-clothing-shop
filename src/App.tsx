/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { DirectOrderModal } from './components/DirectOrderModal';
import { CartDrawer } from './components/CartDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Check } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { toast } = useShop();

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-200 flex flex-col font-sans selection:bg-amber-100 dark:selection:bg-amber-900">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 z-50 ltr:right-4 rtl:left-4 max-w-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-stone-700 dark:border-stone-300 animate-slide-in">
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3 h-3" />
          </span>
          <span>{toast}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Hero />
        <ProductGrid />
        <NewArrivalsSection />
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProductModal />
      <DirectOrderModal />
      <CartDrawer />
      <SizeGuideModal />
      <OrderSuccessModal />
      <WhatsAppFloatingButton />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
