export type Language = 'ar' | 'fr' | 'en';
export type Theme = 'light' | 'dark';

export interface Product {
  id: string;
  name: {
    ar: string;
    fr: string;
    en: string;
  };
  category: {
    ar: string;
    fr: string;
    en: string;
  };
  categoryKey: 'evening' | 'sets' | 'abayas' | 'casual';
  price: number;
  originalPrice?: number;
  image: string;
  description: {
    ar: string;
    fr: string;
    en: string;
  };
  fabric: {
    ar: string;
    fr: string;
    en: string;
  };
  sizes: string[];
  colors: {
    name: {
      ar: string;
      fr: string;
      en: string;
    };
    hex: string;
  }[];
  badge?: {
    ar: string;
    fr: string;
    en: string;
  };
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface CustomerOrderInfo {
  fullName: string;
  phone: string;
  wilayaOrCity: string;
  address: string;
  notes: string;
}
