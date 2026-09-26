import { Product } from '../types';

export const products: Product[] = [
  {
    id: "dress-brown-satin",
    name: {
      ar: "فستان الشوكولاتة الملكي بأكمام بالون",
      fr: "Robe Satin Chocolat Royal à Manches Bouffantes",
      en: "Royal Chocolate Satin Gown with Balloon Sleeves"
    },
    category: {
      ar: "فساتين مناسبات",
      fr: "Robes de Cérémonie",
      en: "Occasion Dresses"
    },
    categoryKey: "evening",
    price: 8800,
    originalPrice: 10500,
    image: "/src/assets/images/dress_brown_satin_1790422045381.jpg",
    description: {
      ar: "فستان سهرة ماكسي فاخر مصنوع من الساتان الحريري الفاخر بلون الشوكولاتة الدافئ، يتميز بأكمام بالون مزمومة وحزام خصر عريض يبرز الرشاقة مع الحفاظ على الحشمة الكاملة والاتساع الانسيابي.",
      fr: "Robe longue confectionnée dans un satin de soie noble au coloris chocolat chaud. Dotée de magnifiques manches ballon resserrées et d'une ceinture ajustable pour un tombé impérial et pudique.",
      en: "Luxurious maxi gown crafted in rich chocolate silk satin. Features elegant bishop balloon sleeves, a defined flattering waist belt, and an expansive flowing skirt ensuring total modesty and grace."
    },
    fabric: {
      ar: "ساتان حريري كوري ناعم وغير شفاف",
      fr: "Satin de soie coréen doux et opaque",
      en: "Premium Korean silk satin, opaque & silky soft"
    },
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)", "46 (XXL)"],
    colors: [
      {
        name: { ar: "بني شوكولاتة", fr: "Chocolat", en: "Chocolate Brown" },
        hex: "#5C3A21"
      },
      {
        name: { ar: "بيج نود", fr: "Beige Nude", en: "Nude Beige" },
        hex: "#D8C4B6"
      },
      {
        name: { ar: "عنابي داكن", fr: "Bordeaux", en: "Burgundy" },
        hex: "#4A1521"
      }
    ],
    badge: {
      ar: "الأكثر طلباً",
      fr: "Best-Seller",
      en: "Best Seller"
    },
    isFeatured: true
  },
  {
    id: "set-olive-champagne",
    name: {
      ar: "طقم فيونا الزيتي مع تنورة الشامبانيا الواسعة",
      fr: "Ensemble Fiona Olive & Jupe Évasée Champagne",
      en: "Fiona Olive Blouse & Champagne Maxi Flare Skirt Set"
    },
    category: {
      ar: "أطقم وتنانير راقية",
      fr: "Ensembles & Jupes Chic",
      en: "Chic Sets & Skirts"
    },
    categoryKey: "sets",
    price: 9400,
    originalPrice: 11200,
    image: "/src/assets/images/dress_olive_beige_1790422058196.jpg",
    description: {
      ar: "طقم متناسق من قطعتين راقيتين: بلوزة كريب زيتية بأزرار وياقة كلاسيكية مع حزام فيونكة عريض على الخصر وأكمام منتفخة، مدمجة مع تنورة كلوش بيج شامبانيا ذات كسرات انسيابية واسعة.",
      fr: "Sublime ensemble 2 pièces composé d'un chemisier croisé vert olive à nouer avec manches volumineuses, assorti à une longue jupe évasée champagne au drapé majestueux.",
      en: "Exquisite two-piece modest set featuring an olive green button blouse with a statement waist bow tie and puff sleeves, paired with an expansive champagne flared maxi skirt with graceful pleats."
    },
    fabric: {
      ar: "كريب ملكي تركي للبلوزة + كريب ثقيل معالج للتنورة",
      fr: "Crêpe royal turc pour le haut + crêpe lourd pour la jupe",
      en: "Turkish royal crepe blouse + heavyweight flowing crepe skirt"
    },
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)"],
    colors: [
      {
        name: { ar: "زيتي و بيج", fr: "Olive & Champagne", en: "Olive & Champagne" },
        hex: "#6B703C"
      },
      {
        name: { ar: "كحلي و أوف وايت", fr: "Marine & Blanc Cassé", en: "Navy & Off-White" },
        hex: "#1E2A4A"
      }
    ],
    badge: {
      ar: "إطلالة حصرية",
      fr: "Exclusivité",
      en: "Exclusive"
    },
    isFeatured: true
  },
  {
    id: "dress-lilac-satin",
    name: {
      ar: "فستان السهرة لافندر ستان مع أربطة الأكمام الفاخرة",
      fr: "Robe Soirée Lavande Satin & Nœuds Poignets",
      en: "Lavender Lilac Satin Evening Gown with Cuff Ribbon Ties"
    },
    category: {
      ar: "فساتين مناسبات",
      fr: "Robes de Cérémonie",
      en: "Occasion Dresses"
    },
    categoryKey: "evening",
    price: 9900,
    originalPrice: 12000,
    image: "/src/assets/images/dress_lilac_satin_1790422069847.jpg",
    description: {
      ar: "إطلالة ملكية ساحرة بلون اللافندر البنفسجي الهادئ، مصمم من الساتان الفاخر مع ياقة دائرية عالية وأربطة فيونكة حريرية متدلية من أساور الأكمام، وقصة خصر مزمومة وتنورة كلوش متألقة في الإضاءة.",
      fr: "Robe de gala couleur lavande lilas en satin miroitant. Col montant délicat, superbes rubans noués aux poignets et jupe à godets virevoltante, idéale pour fiançailles et mariages.",
      en: "A dreamy evening gown in soft lilac lavender satin. Highlights a demure high neckline, feminine flowing ribbon ties at the cuffs, tailored waist, and a luminous flare skirt."
    },
    fabric: {
      ar: "ساتان دوق فاخر ذو لمعة حريرية هادئة",
      fr: "Satin duchesse soyeux à éclat délicat",
      en: "Premium duchess satin with subtle soft luster"
    },
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)", "46 (XXL)"],
    colors: [
      {
        name: { ar: "لافندر بنفسجي", fr: "Lavande Lilas", en: "Lilac Lavender" },
        hex: "#A894B8"
      },
      {
        name: { ar: "وردي بودري", fr: "Rose Poudré", en: "Blush Pink" },
        hex: "#D6A2A8"
      },
      {
        name: { ar: "فضي لؤلؤي", fr: "Argent Nacré", en: "Pearl Silver" },
        hex: "#D3D7DD"
      }
    ],
    badge: {
      ar: "تصميم للمناسبات",
      fr: "Cérémonie",
      en: "Ceremony Choice"
    },
    isFeatured: true
  },
  {
    id: "dress-dusty-rose",
    name: {
      ar: "فستان روز ترابي بياقة مزمومة وحزام الخصر",
      fr: "Robe Vieux Rose Plissée à Ceinture Nouée",
      en: "Dusty Rose Terracotta Pleated Neckline Maxi Dress"
    },
    category: {
      ar: "فساتين مناسبات",
      fr: "Robes de Cérémonie",
      en: "Occasion Dresses"
    },
    categoryKey: "evening",
    price: 8500,
    originalPrice: 9800,
    image: "/src/assets/images/dress_dusty_rose_1790422081280.jpg",
    description: {
      ar: "فستان أنيق بلون الورد الترابي الكلاسيكي، يتميز بزمزمات دقيقة حول الياقة المستديرة تعطي طابعاً أنثوياً راقياً، مع حزام شريطي ناعم على الخصر وأكمام كلاسيكية انسيابية واسعة تضمن الراحة طوال اليوم.",
      fr: "Robe longue dans une nuance vieux rose terracotta intemporelle. Encolure smockée raffinée, ceinture à nœud et manches amples offrant un confort absolu et une allure distinguée.",
      en: "A timeless modest dress in dusty rose terracotta. Features delicate gathers around the round collar, a self-tie waist belt, and generous balloon sleeves ensuring comfort and modesty all day."
    },
    fabric: {
      ar: "كريب حرير ناعم ومقاوم للتجعد",
      fr: "Crêpe de soie doux et infroissable",
      en: "Soft silk crepe, breathable & wrinkle-resistant"
    },
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)", "46 (XXL)"],
    colors: [
      {
        name: { ar: "وردي ترابي", fr: "Vieux Rose", en: "Dusty Rose" },
        hex: "#9E645A"
      },
      {
        name: { ar: "بيج كراميل", fr: "Caramel Chaud", en: "Warm Caramel" },
        hex: "#B07954"
      },
      {
        name: { ar: "أزرق بترولي", fr: "Bleu Pétrole", en: "Petrol Blue" },
        hex: "#2F5061"
      }
    ],
    badge: {
      ar: "جديد 2026",
      fr: "Nouveau",
      en: "New 2026"
    },
    isNew: true,
    isFeatured: true
  },
  {
    id: "dress-emerald-evening",
    name: {
      ar: "فستان السهرة الزمردي الإمبراطوري",
      fr: "Robe de Soirée Émeraude Impériale",
      en: "Imperial Royal Emerald Satin Evening Gown"
    },
    category: {
      ar: "فساتين مناسبات",
      fr: "Robes de Cérémonie",
      en: "Occasion Dresses"
    },
    categoryKey: "evening",
    price: 10200,
    originalPrice: 12500,
    image: "/src/assets/images/dress_emerald_evening_1790422014989.jpg",
    description: {
      ar: "تحفة فنية من الساتان بلون الأخضر الزمردي الملكي، بقصة مصممة خصيصاً للمناسبات والأعراس مع كسرات خفيفة على الخصر وأكمام طويلة واسعة تمنحكِ وقاراً لا يضاهى.",
      fr: "Robe magistrale en satin vert émeraude impérial. Une coupe haute couture spécialement étudiée pour les mariages avec légers plis à la taille et manches amples drapées.",
      en: "A masterpiece in rich royal emerald green satin, specially tailored for galas and celebrations with gentle waist draping and majestic flowing sleeves."
    },
    fabric: {
      ar: "ساتان إيطالي ثقيل عالي الجودة",
      fr: "Satin italien lourd haute qualité",
      en: "Heavyweight Italian satin with luxurious hand feel"
    },
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)"],
    colors: [
      {
        name: { ar: "أخضر زمردي", fr: "Vert Émeraude", en: "Emerald Green" },
        hex: "#1B4D3E"
      },
      {
        name: { ar: "ياقوتي أحمر", fr: "Rouge Rubis", en: "Ruby Red" },
        hex: "#6B1D2F"
      }
    ],
    badge: {
      ar: "فاخر وحصري",
      fr: "Luxe",
      en: "Luxury Edition"
    },
    isNew: true
  },
  {
    id: "dress-champagne-abaya",
    name: {
      ar: "طقم عباية كيمونو الشامبانيا مع الفستان الداخلي",
      fr: "Ensemble Abaya Kimono Soie Champagne & Sous-Robe",
      en: "Champagne Silk Kimono Abaya & Inner Slip Dress Set"
    },
    category: {
      ar: "عبايات وكيمونو فاخر",
      fr: "Abayas & Kimonos Nobles",
      en: "Abayas & Kimonos"
    },
    categoryKey: "abayas",
    price: 11500,
    originalPrice: 13800,
    image: "/src/assets/images/dress_champagne_abaya_1790422028656.jpg",
    description: {
      ar: "طقم عباية كيمونو مفتوحة من الحرير اللؤلؤي بتطريزات ناعمة على الأطراف، مرفقة بفستان داخلي كامل بدون أكمام من نفس خامة القماش، تعكس الفخامة الهادئة بأسلوب خليجي راقٍ.",
      fr: "Magnifique ensemble composé d'une abaya kimono ouverte en soie champagne aux bordures finement brodées, accompagnée de sa sous-robe assortie d'une grande douceur.",
      en: "A sublime two-piece abaya set: an open kimono abaya in pearl champagne silk with fine border embroideries, paired with a full length matching inner slip dress."
    },
    fabric: {
      ar: "حرير الكريب المغسول مع تطريز دقيق",
      fr: "Soie de crêpe lavée avec broderies délicates",
      en: "Washed silk crepe with artisan embroidery"
    },
    sizes: ["52 (S/M)", "54 (M/L)", "56 (L/XL)", "58 (XL/XXL)"],
    colors: [
      {
        name: { ar: "شامبانيا لؤلؤي", fr: "Champagne Nacré", en: "Pearl Champagne" },
        hex: "#E8D8C8"
      },
      {
        name: { ar: "رمادي بلاتيني", fr: "Gris Platine", en: "Platinum Grey" },
        hex: "#C4C8CC"
      }
    ],
    badge: {
      ar: "طقم قطعتين",
      fr: "2 Pièces",
      en: "2-Piece Set"
    },
    isFeatured: true
  },
  {
    id: "dress-black-abaya",
    name: {
      ar: "عباية السواريه السوداء مع لمسات التطريز الذهبي",
      fr: "Abaya Soirée Noire Royale & Broderies Dorées",
      en: "Noir Royal Modest Abaya with Gilded Threadwork"
    },
    category: {
      ar: "عبايات وكيمونو فاخر",
      fr: "Abayas & Kimonos Nobles",
      en: "Abayas & Kimonos"
    },
    categoryKey: "abayas",
    price: 10800,
    originalPrice: 12900,
    image: "/src/assets/images/dress_black_abaya_1790422092797.jpg",
    description: {
      ar: "عباية كلاسيكية راقية باللون الأسود الملكي العميق، مزدانة بتطريزات بخيوط الذهب الخالص على الياقة وأطراف الأكمام، مصممة من قماش الكريب المعالج لسواد حالك وثبات مثالي.",
      fr: "L'élégance absolue de la robe abaya noire profonde rehaussée de délicates broderies dorées au col et poignets. Tissu noir mat infroissable au drapé impeccable.",
      en: "Absolute poise in deep midnight noir embellished with delicate gold embroidery around the collar and cuffs. Crafted from luxury non-crease royal crepe."
    },
    fabric: {
      ar: "كريب ملكي أسود سوبر ندى كوري",
      fr: "Crêpe royal Super Nada coréen noir profond",
      en: "Deep noir Korean Super Nada royal crepe"
    },
    sizes: ["52 (S/M)", "54 (M/L)", "56 (L/XL)", "58 (XL/XXL)"],
    colors: [
      {
        name: { ar: "أسود و ذهبي", fr: "Noir & Or", en: "Noir & Gold" },
        hex: "#1A1A1A"
      }
    ],
    badge: {
      ar: "إطلالة ملكية",
      fr: "Prestige",
      en: "Prestige Look"
    },
    isNew: true
  }
];

export const BOUTIQUE_WHATSAPP_NUMBER = "+213555123456";
export const BOUTIQUE_DISPLAY_PHONE = "+213 555 12 34 56";
export const BOUTIQUE_OWNER_EMAIL = "raniatalhi113@gmail.com";
