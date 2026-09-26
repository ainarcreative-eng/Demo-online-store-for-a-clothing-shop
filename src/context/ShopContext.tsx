import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Language, Theme, CustomerOrderInfo } from '../types';
import { translations } from '../data/translations';
import { BOUTIQUE_WHATSAPP_NUMBER, BOUTIQUE_OWNER_EMAIL } from '../data/products';

export interface LastOrderData {
  orderId: string;
  items: CartItem[];
  total: number;
  customerInfo: CustomerOrderInfo;
  sentToEmail: boolean;
  emailTarget: string;
}

interface ShopContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: typeof translations.ar;
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeProductModal: Product | null;
  setActiveProductModal: (prod: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  customerInfo: CustomerOrderInfo;
  updateCustomerInfo: (field: keyof CustomerOrderInfo, value: string) => void;
  sendWhatsAppOrder: () => void;
  sendWhatsAppInquiry: (product: Product, selectedSize?: string, selectedColor?: string) => void;
  toast: string | null;
  showToast: (msg: string) => void;
  lastOrderRef: string | null;
  setLastOrderRef: (ref: string | null) => void;
  lastOrderData: LastOrderData | null;
  setLastOrderData: (data: LastOrderData | null) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;
  directOrderProduct: Product | null;
  setDirectOrderProduct: (prod: Product | null) => void;
  isDirectOrderOpen: boolean;
  setIsDirectOrderOpen: (open: boolean) => void;
  openDirectOrder: (prod: Product) => void;
  isSubmittingOrder: boolean;
  submitOrderToEmail: (items: CartItem[], info: CustomerOrderInfo, totalAmount: number) => Promise<{ success: boolean; orderId: string }>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_CUSTOMER_INFO: CustomerOrderInfo = {
  fullName: '',
  phone: '',
  wilayaOrCity: '',
  address: '',
  notes: '',
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('nour_language') as Language;
    return saved === 'fr' || saved === 'en' ? saved : 'ar';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('nour_theme') as Theme;
    return saved === 'dark' ? 'dark' : 'light';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nour_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customerInfo, setCustomerInfo] = useState<CustomerOrderInfo>(() => {
    try {
      const saved = localStorage.getItem('nour_customer_info');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMER_INFO;
    } catch {
      return INITIAL_CUSTOMER_INFO;
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nour_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  // Direct Order States
  const [directOrderProduct, setDirectOrderProduct] = useState<Product | null>(null);
  const [isDirectOrderOpen, setIsDirectOrderOpen] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // Success modal and order tracking
  const [lastOrderRef, setLastOrderRef] = useState<string | null>(null);
  const [lastOrderData, setLastOrderData] = useState<LastOrderData | null>(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);

  // Sync HTML dir and lang
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('nour_language', language);
  }, [language]);

  // Sync Theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('nour_theme', theme);
  }, [theme]);

  // Sync Cart
  useEffect(() => {
    localStorage.setItem('nour_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync Wishlist
  useEffect(() => {
    localStorage.setItem('nour_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync Customer Info
  useEffect(() => {
    localStorage.setItem('nour_customer_info', JSON.stringify(customerInfo));
  }, [customerInfo]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(prev => (prev === msg ? null : prev));
    }, 3500);
  };

  const openDirectOrder = (product: Product) => {
    setDirectOrderProduct(product);
    setIsDirectOrderOpen(true);
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
    showToast(translations[language].product.addedToCart);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart(prev =>
      prev.filter(
        item => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, color: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId && item.selectedSize === size && item.selectedColor === color) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(translations[language].product.wishlistRemove);
        return prev.filter(id => id !== productId);
      } else {
        showToast(translations[language].product.wishlistAdd);
        return [...prev, productId];
      }
    });
  };

  const updateCustomerInfo = (field: keyof CustomerOrderInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const t = translations[language];

  // Submit Order directly to boutique email: raniatalhi113@gmail.com
  const submitOrderToEmail = async (
    items: CartItem[],
    info: CustomerOrderInfo,
    totalAmount: number
  ): Promise<{ success: boolean; orderId: string }> => {
    setIsSubmittingOrder(true);
    const orderRef = 'NOUR-' + Math.floor(100000 + Math.random() * 900000);

    const itemsSummary = items
      .map((it, idx) => {
        const prodName = it.product.name[language] || it.product.name.ar;
        return `${idx + 1}. ${prodName} (المقاس: ${it.selectedSize}, اللون: ${it.selectedColor}) × ${it.quantity} = ${(it.product.price * it.quantity).toLocaleString()} ${t.common.currency}`;
      })
      .join('\n');

    const orderPayload = {
      orderId: orderRef,
      customerInfo: info,
      items: items.map(it => ({
        id: it.product.id,
        name: it.product.name[language] || it.product.name.ar,
        size: it.selectedSize,
        color: it.selectedColor,
        quantity: it.quantity,
        price: it.product.price,
        total: it.product.price * it.quantity,
      })),
      itemsText: itemsSummary,
      total: totalAmount,
      currency: t.common.currency,
      timestamp: new Date().toISOString(),
      destinationEmail: BOUTIQUE_OWNER_EMAIL,
    };

    // 1. Send via local server endpoint
    try {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      }).catch(err => console.warn('Server orders endpoint:', err));
    } catch (err) {
      console.warn('API call failed:', err);
    }

    // 2. Direct browser dispatch to FormSubmit for raniatalhi113@gmail.com
    try {
      await fetch(`https://formsubmit.co/ajax/${BOUTIQUE_OWNER_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `طلب شراء جديد: #${orderRef} - ${info.fullName} (${totalAmount.toLocaleString()} ${t.common.currency})`,
          _template: 'table',
          "رقم الطلب": `#${orderRef}`,
          "الاسم الكامل": info.fullName,
          "رقم الهاتف": info.phone,
          "الولاية والمدينة": info.wilayaOrCity,
          "العنوان بالتفصيل": info.address || 'غير محدد',
          "ملاحظات الزبونة": info.notes || 'لا توجد',
          "المنتجات المطلوبة": itemsSummary,
          "المبلغ الإجمالي": `${totalAmount.toLocaleString()} ${t.common.currency}`,
          "طريقة الدفع": "الدفع عند الاستلام",
          "تاريخ الطلب": new Date().toLocaleString()
        })
      });
    } catch (err) {
      console.warn('FormSubmit AJAX fallback:', err);
    }

    setLastOrderRef(orderRef);
    setLastOrderData({
      orderId: orderRef,
      items,
      total: totalAmount,
      customerInfo: info,
      sentToEmail: true,
      emailTarget: BOUTIQUE_OWNER_EMAIL,
    });

    setIsSubmittingOrder(false);
    setIsOrderSuccessOpen(true);
    showToast(t.directOrder.sentSuccessTitle);

    return { success: true, orderId: orderRef };
  };

  // WhatsApp Order Handler for Cart
  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return;

    if (!customerInfo.fullName.trim() || !customerInfo.phone.trim() || !customerInfo.wilayaOrCity.trim()) {
      showToast(t.cart.validationAlert);
      return;
    }

    const orderRef = 'NOUR-' + Math.floor(100000 + Math.random() * 900000);
    setLastOrderRef(orderRef);

    const msgs = t.whatsappMessages;
    let message = `${msgs.orderHeader}\n`;
    message += `🏷️ *${msgs.orderNumber}* #${orderRef}\n\n`;
    message += `${msgs.items}\n`;

    cart.forEach((item, index) => {
      const prodName = item.product.name[language] || item.product.name.ar;
      message += `  ${index + 1}. *${prodName}*\n`;
      message += `     • ${t.cart.size} ${item.selectedSize}\n`;
      message += `     • ${t.cart.color} ${item.selectedColor}\n`;
      message += `     • ${t.cart.quantity} ${item.quantity} × ${item.product.price.toLocaleString()} ${t.common.currency}\n`;
      message += `     • المجموع: ${(item.product.price * item.quantity).toLocaleString()} ${t.common.currency}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `${msgs.totalPrice} *${cartTotal.toLocaleString()} ${t.common.currency}*\n\n`;
    message += `${msgs.customerDetails}\n`;
    message += `• ${msgs.name} ${customerInfo.fullName}\n`;
    message += `• ${msgs.phone} ${customerInfo.phone}\n`;
    message += `• ${msgs.city} ${customerInfo.wilayaOrCity}\n`;
    if (customerInfo.address.trim()) {
      message += `• ${msgs.address} ${customerInfo.address}\n`;
    }
    if (customerInfo.notes.trim()) {
      message += `• ${msgs.notes} ${customerInfo.notes}\n`;
    }

    message += `\n${msgs.orderFooter}`;

    const cleanNumber = BOUTIQUE_WHATSAPP_NUMBER.replace(/\D/g, '');
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encoded}`;

    window.open(whatsappUrl, '_blank');

    setLastOrderData({
      orderId: orderRef,
      items: [...cart],
      total: cartTotal,
      customerInfo,
      sentToEmail: true,
      emailTarget: BOUTIQUE_OWNER_EMAIL,
    });

    // Also dispatch to email so merchant receives notification on raniatalhi113@gmail.com
    submitOrderToEmail([...cart], customerInfo, cartTotal);

    setIsCartOpen(false);
    setIsOrderSuccessOpen(true);
  };

  // WhatsApp Single Product Inquiry Handler
  const sendWhatsAppInquiry = (product: Product, selectedSize?: string, selectedColor?: string) => {
    const msgs = t.whatsappMessages;
    const prodName = product.name[language] || product.name.ar;
    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0].name[language];

    let message = `${msgs.inquiryPrefix}\n\n`;
    message += `✨ *${prodName}*\n`;
    message += `• ${msgs.inquiryPrice} ${product.price.toLocaleString()} ${t.common.currency}\n`;
    message += `• ${msgs.inquirySize} ${size}\n`;
    message += `• ${msgs.inquiryColor} ${color}\n`;
    message += `• ${t.product.fabric} ${product.fabric[language]}\n\n`;
    message += `${msgs.inquiryFooter}`;

    const cleanNumber = BOUTIQUE_WHATSAPP_NUMBER.replace(/\D/g, '');
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encoded}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <ShopContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        t,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        activeProductModal,
        setActiveProductModal,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        wishlist,
        toggleWishlist,
        customerInfo,
        updateCustomerInfo,
        sendWhatsAppOrder,
        sendWhatsAppInquiry,
        toast,
        showToast,
        lastOrderRef,
        setLastOrderRef,
        lastOrderData,
        setLastOrderData,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        directOrderProduct,
        setDirectOrderProduct,
        isDirectOrderOpen,
        setIsDirectOrderOpen,
        openDirectOrder,
        isSubmittingOrder,
        submitOrderToEmail,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
