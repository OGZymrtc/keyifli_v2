import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPriceTL = (price?: number) => {
  if (typeof price !== 'number') return 'Ücretsiz';
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(price);
};

// Category-based fallback images for when a product image is missing
const CATEGORY_FALLBACKS: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop', // Tema & Macera Parkları
  '2': 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1200&auto=format&fit=crop', // Oyun & Etkileşimli
  '3': 'https://images.unsplash.com/photo-1544551763-7ef420f0b8c2?q=80&w=1200&auto=format&fit=crop', // Su Maceraları
  '4': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop', // Doğa ve Arazi
  '5': 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=1200&auto=format&fit=crop', // Gökyüzü
  '6': 'https://images.unsplash.com/photo-1518602164578-cd0074062763?q=80&w=1200&auto=format&fit=crop', // Hedef Odaklı
  '7': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop', // Masaj
  '8': 'https://images.unsplash.com/photo-1544986581-efac024faf62?q=80&w=1200&auto=format&fit=crop', // Spa & Termal
  '9': 'https://images.unsplash.com/photo-1615212049275-95561b94731a?q=80&w=1200&auto=format&fit=crop', // Hamam
  '10': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop', // Güzellik & Bakım
  '11': 'https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1200&auto=format&fit=crop', // Duyusal
  '12': 'https://images.unsplash.com/photo-1506368083636-6defb67639c5?q=80&w=1200&auto=format&fit=crop', // Yemek Atölyeleri
  '13': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop', // Sanat
  '14': 'https://images.unsplash.com/photo-1521146764736-56c929d59c53?q=80&w=1200&auto=format&fit=crop', // Kişisel Bakım
  '15': 'https://images.unsplash.com/photo-1520975693416-35a4e257ad59?q=80&w=1200&auto=format&fit=crop', // Yetişkinler (Ücretsiz)
  '16': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop', // Çocuklar
  '17': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop', // Tüm Yaşlar
};

export function getCategoryFallbackImage(categoryId?: string): string {
  if (!categoryId) return 'https://images.unsplash.com/photo-1520975693416-35a4e257ad59?q=80&w=1200&auto=format&fit=crop';
  return CATEGORY_FALLBACKS[categoryId] || CATEGORY_FALLBACKS['15'];
}
