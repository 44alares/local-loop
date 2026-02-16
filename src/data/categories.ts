// Updated marketplace categories
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
}

export const categories: Category[] = [
  {
    id: 'desktop',
    name: 'Desktop & Office',
    description: 'Organizational and ergonomic tools for your workspace',
    icon: 'Monitor',
  },
  {
    id: 'gaming',
    name: 'Gaming & Modding',
    description: 'Custom console mods and aesthetic gaming gear',
    icon: 'Gamepad2',
  },
  {
    id: 'repair',
    name: 'Repair Hub',
    description: 'Critical spare parts for household appliances',
    icon: 'Wrench',
  },
  {
    id: 'functional',
    name: 'Functional Tools',
    description: 'Hardware and mechanical solutions',
    icon: 'Cog',
  },
  {
    id: 'decoration',
    name: 'Decoration',
    description: 'Art, sculptures, and wall decor',
    icon: 'Palette',
  },
  {
    id: 'kids',
    name: 'Kids & Toys',
    description: 'Educational toys and playroom items',
    icon: 'Baby',
  },
  {
    id: 'artistic',
    name: 'Artistic',
    description: 'Curated sculptures, busts, and collectible figures',
    icon: 'Sparkles',
  },
  {
    id: 'personalized',
    name: 'Personalized Items',
    description: 'Products you can customize with your own text or details',
    icon: 'PenLine',
  },
];

export const categoryLabels: Record<string, string> = {
  desktop: 'Desktop & Office',
  gaming: 'Gaming & Modding',
  repair: 'Repair Hub',
  functional: 'Functional Tools',
  decoration: 'Decoration',
  kids: 'Kids & Toys',
  artistic: 'Artistic',
  personalized: 'Personalized Items',
};

export const productTypeLabels: Record<string, string> = {
  basic: 'Basic',
  functional: 'Functional',
  artistic: 'Artistic',
};

export const styleLabels: Record<string, string> = {
  geometric: 'Geometric',
  colorful: 'Colorful',
  hybrid: 'Hybrid',
  industrial: 'Industrial',
};
