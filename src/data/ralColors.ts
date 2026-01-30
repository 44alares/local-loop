// RAL Color Palette for standardized color consistency across makers
export interface RALColor {
  code: string;
  name: string;
  hex: string;
  category: 'neutral' | 'vibrant' | 'natural' | 'specialty';
}

export const ralColors: RALColor[] = [
  // Neutrals
  { code: 'RAL 9005', name: 'Jet Black', hex: '#0A0A0A', category: 'neutral' },
  { code: 'RAL 9010', name: 'Pure White', hex: '#F7F5EF', category: 'neutral' },
  { code: 'RAL 9016', name: 'Traffic White', hex: '#F7FBF5', category: 'neutral' },
  { code: 'RAL 7035', name: 'Light Grey', hex: '#C5C7C4', category: 'neutral' },
  { code: 'RAL 7016', name: 'Anthracite Grey', hex: '#383E42', category: 'neutral' },
  { code: 'RAL 7011', name: 'Iron Grey', hex: '#52595D', category: 'neutral' },
  
  // Vibrant
  { code: 'RAL 3020', name: 'Traffic Red', hex: '#CC0605', category: 'vibrant' },
  { code: 'RAL 3024', name: 'Luminous Red', hex: '#F80000', category: 'vibrant' },
  { code: 'RAL 2004', name: 'Pure Orange', hex: '#E25303', category: 'vibrant' },
  { code: 'RAL 1023', name: 'Traffic Yellow', hex: '#F0CA00', category: 'vibrant' },
  { code: 'RAL 1021', name: 'Colza Yellow', hex: '#E6A100', category: 'vibrant' },
  { code: 'RAL 5015', name: 'Sky Blue', hex: '#007CB0', category: 'vibrant' },
  { code: 'RAL 5002', name: 'Ultramarine Blue', hex: '#00387B', category: 'vibrant' },
  { code: 'RAL 5017', name: 'Traffic Blue', hex: '#0E518D', category: 'vibrant' },
  { code: 'RAL 4010', name: 'Telemagenta', hex: '#BB4077', category: 'vibrant' },
  { code: 'RAL 4006', name: 'Traffic Purple', hex: '#903373', category: 'vibrant' },
  
  // Natural
  { code: 'RAL 6018', name: 'Yellow Green', hex: '#57A639', category: 'natural' },
  { code: 'RAL 6024', name: 'Traffic Green', hex: '#008351', category: 'natural' },
  { code: 'RAL 6005', name: 'Moss Green', hex: '#0F4336', category: 'natural' },
  { code: 'RAL 8014', name: 'Sepia Brown', hex: '#4A3526', category: 'natural' },
  { code: 'RAL 8017', name: 'Chocolate Brown', hex: '#442F29', category: 'natural' },
  { code: 'RAL 1001', name: 'Beige', hex: '#D0B084', category: 'natural' },
  { code: 'RAL 1015', name: 'Light Ivory', hex: '#E6D2B5', category: 'natural' },
  
  // Specialty
  { code: 'RAL 9006', name: 'White Aluminium', hex: '#A5A8A6', category: 'specialty' },
  { code: 'RAL 9007', name: 'Grey Aluminium', hex: '#8F8F8C', category: 'specialty' },
  { code: 'RAL 1036', name: 'Pearl Gold', hex: '#927549', category: 'specialty' },
  { code: 'RAL 3015', name: 'Light Pink', hex: '#E1A6AD', category: 'specialty' },
];

export const ralColorsByCategory = ralColors.reduce((acc, color) => {
  if (!acc[color.category]) {
    acc[color.category] = [];
  }
  acc[color.category].push(color);
  return acc;
}, {} as Record<string, RALColor[]>);

export function getRALColorByCode(code: string): RALColor | undefined {
  return ralColors.find(c => c.code === code);
}
