import type { Activity, Product, Category, ActivityType } from './supabase';

export const RAW_DATA: unknown = [
  {
    "ID": 1,
    "ACTIVITY_NAME": "Keşfet  & Eğlen",
    "CATEGORY": [
      {
        "ID": 1,
        "CATEGORY_NAME": "Tema ve Macera Parkları",
        "ACTIVITY_TYPE": [
          { "ID": 1, "ACTIVITY_TYPE_NAME": "Tema Park", "PRODUCT": [] },
          { "ID": 2, "ACTIVITY_TYPE_NAME": "Aquapark", "PRODUCT": [] }
        ],
        "PRODUCT": []
      },
      {
        "ID": 2,
        "CATEGORY_NAME": "Oyun & Etkileşimli Deneyimler",
        "ACTIVITY_TYPE": [
          { "ID": 3, "ACTIVITY_TYPE_NAME": "Akvaryum & Deniz Dünyası", "PRODUCT": [] },
          { "ID": 4, "ACTIVITY_TYPE_NAME": "Hayvanat Bahçeleri & Doğa Parkları", "PRODUCT": [] },
          { "ID": 5, "ACTIVITY_TYPE_NAME": "Çocuklara Özel Eğlence Alanları", "PRODUCT": [] },
          { "ID": 6, "ACTIVITY_TYPE_NAME": "Eğlenceli Deneyim & Selfie Alanları", "PRODUCT": [] },
          { "ID": 7, "ACTIVITY_TYPE_NAME": "Kaçış Oyunları ", "PRODUCT": [] },
          { "ID": 8, "ACTIVITY_TYPE_NAME": "Korku Evleri", "PRODUCT": [] },
          { "ID": 9, "ACTIVITY_TYPE_NAME": "Sanal Gerçeklik (VR)", "PRODUCT": [] },
          { "ID": 10, "ACTIVITY_TYPE_NAME": "Yarışma Programları", "PRODUCT": [] }
        ],
        "PRODUCT": []
      }
    ]
  },
  {
    "ID": 2,
    "ACTIVITY_NAME": "Spor  & Macera",
    "CATEGORY": [
      {
        "ID": 3,
        "CATEGORY_NAME": "Su Maceraları & Aktiviteleri",
        "ACTIVITY_TYPE": [
          { "ID": 11, "ACTIVITY_TYPE_NAME": "Yelken", "PRODUCT": [] },
          { "ID": 12, "ACTIVITY_TYPE_NAME": "Rafting", "PRODUCT": [] },
          { "ID": 13, "ACTIVITY_TYPE_NAME": "Kano", "PRODUCT": [] },
          { "ID": 14, "ACTIVITY_TYPE_NAME": "Yüzme", "PRODUCT": [] }
        ],
        "PRODUCT": []
      },
      {
        "ID": 4,
        "CATEGORY_NAME": "Doğa ve Arazi Maceraları",
        "ACTIVITY_TYPE": [
          { "ID": 15, "ACTIVITY_TYPE_NAME": "Atv Turu", "PRODUCT": [] },
          { "ID": 16, "ACTIVITY_TYPE_NAME": "Safari Turu", "PRODUCT": [] },
          { "ID": 17, "ACTIVITY_TYPE_NAME": "Stage Pilotage", "PRODUCT": [] },
          { "ID": 18, "ACTIVITY_TYPE_NAME": "Sürüş Deneyimi", "PRODUCT": [] }
        ],
        "PRODUCT": []
      },
      {
        "ID": 5,
        "CATEGORY_NAME": "Gökyüzü Maceraları",
        "ACTIVITY_TYPE": [
          { "ID": 19, "ACTIVITY_TYPE_NAME": "Helikopter Turu", "PRODUCT": [] },
          { "ID": 20, "ACTIVITY_TYPE_NAME": "Bungee Jumping", "PRODUCT": [] },
          { "ID": 21, "ACTIVITY_TYPE_NAME": "Yamaç Paraşütü", "PRODUCT": [] },
          { "ID": 22, "ACTIVITY_TYPE_NAME": "Sıcak Hava Balonu Turu", "PRODUCT": [] },
          { "ID": 23, "ACTIVITY_TYPE_NAME": "Serbest Dalış & Paraşütle Atlayış", "PRODUCT": [] },
          { "ID": 24, "ACTIVITY_TYPE_NAME": "Uçuş Deneyimi", "PRODUCT": [] }
        ],
        "PRODUCT": []
      },
      {
        "ID": 6,
        "CATEGORY_NAME": "Macera & Hedef Odaklı Eğlenceler",
        "ACTIVITY_TYPE": [
          { "ID": 25, "ACTIVITY_TYPE_NAME": "At Binme", "PRODUCT": [] },
          { "ID": 26, "ACTIVITY_TYPE_NAME": "Poligon", "PRODUCT": [] },
          { "ID": 27, "ACTIVITY_TYPE_NAME": "Okculuk", "PRODUCT": [] },
          { "ID": 28, "ACTIVITY_TYPE_NAME": "Paintball", "PRODUCT": [] },
          { "ID": 29, "ACTIVITY_TYPE_NAME": "Buz Pisti", "PRODUCT": [] },
          { "ID": 30, "ACTIVITY_TYPE_NAME": "Lazer Game", "PRODUCT": [] }
        ],
        "PRODUCT": []
      }
    ]
  },
  {
    "ID": 3,
    "ACTIVITY_NAME": "Rahatla  & Yenilen ",
    "CATEGORY": [
      { "ID": 7, "CATEGORY_NAME": "Masaj Seansları", "ACTIVITY_TYPE": [], "PRODUCT": [] },
      { "ID": 8, "CATEGORY_NAME": "Spa & Termal Uygulamalar", "ACTIVITY_TYPE": [], "PRODUCT": [] },
      { "ID": 9, "CATEGORY_NAME": "Hamam Deneyimleri", "ACTIVITY_TYPE": [], "PRODUCT": [] },
      { "ID": 10, "CATEGORY_NAME": "Güzellik & Bakım Hizmetleri", "ACTIVITY_TYPE": [], "PRODUCT": [] },
      { "ID": 11, "CATEGORY_NAME": "Kriyoterapi & Duyusal Deneyimler", "ACTIVITY_TYPE": [], "PRODUCT": [] }
    ]
  },
  {
    "ID": 4,
    "ACTIVITY_NAME": "Yarat & Öğren",
    "CATEGORY": [
      {
        "ID": 12,
        "CATEGORY_NAME": "Yemek & Tat Atölyeleri",
        "ACTIVITY_TYPE": [ { "ID": 31, "ACTIVITY_TYPE_NAME": "Yemek", "PRODUCT": [] } ],
        "PRODUCT": []
      },
      {
        "ID": 13,
        "CATEGORY_NAME": "Sanat & Yaratıcılık Atölyeleri",
        "ACTIVITY_TYPE": [ { "ID": 32, "ACTIVITY_TYPE_NAME": "Resim & Görsel Sanatlar", "PRODUCT": [] } ],
        "PRODUCT": []
      },
      {
        "ID": 14,
        "CATEGORY_NAME": "Güzellik ve Kişisel Bakım Atölyeleri",
        "ACTIVITY_TYPE": [
          { "ID": 33, "ACTIVITY_TYPE_NAME": "Güzellik", "PRODUCT": [] },
          { "ID": 34, "ACTIVITY_TYPE_NAME": "Parfüm", "PRODUCT": [] }
        ],
        "PRODUCT": []
      }
    ]
  },
  {
    "ID": 5,
    "ACTIVITY_NAME": "Ücretsiz Aktiviteler",
    "CATEGORY": [
      {
        "ID": 15,
        "CATEGORY_NAME": "Yetişkinler",
        "ACTIVITY_TYPE": [],
        "PRODUCT": [
          {
            "ID": 1,
            "ACTIVITY_TYPE_ID": null,
            "CATEGORY_ID": 15,
            "TITLE": "Salla Gitsin Quiz Night",
            "CITY": "Istanbul (Anadolu)",
            "DISTRICT": "Kadıköy",
            "TICKET_RULE": "Sınırlı kapasiteyle gerçekleşecek",
            "PRICE": 0,
            "FULL_ADDRESS": "https://share.google/jIKivVQjH3ElLgeHO",
            "DATE": "24/10/2025 19:30:00",
            "SUB_TITLE": "Takımını Kur, Replikleri Hatırla, Kahkahaya Hazır Ol!",
            "DESCRIPTION": "Hazır mısınız? Kahkahanın ve rekabetin buluştuğu unutulmaz bir Quiz Night deneyimine davetlisiniz!\\n'Replikler' temalı bu özel gecede takım arkadaşlarınla birlikte hafızanı zorla, kahkahalarla yarış ve en eğlenceli anların sahibi ol!\\n🎬 Tema: Ünlü dizi ve film replikleri\\n🎯 Takımını kur, yerini kap\\n😂 Bilemesen de sorun değil… Salla gitsin!\\nUnutma: Bu oyunda sadece doğru cevaplar değil, takım ruhu ve yüksek enerji kazanır!",
            "RATING": null,
            "IS_ACTIVE": true,
            "IMAGE_URL": "https://muzegazhane.istanbul/wp-content/uploads/2025/10/24_Ekim_Salla_Gitsin_Quiz_Night_Replikler-768x960.jpg",
            "EXTERNAL_URL": "Radar Türkiye mobil uygulama üzerinden kaydınızı yapabilirsiniz. https://radarturkiye.com/event/salla-gitsin-quiz-night/FskRm2H_9y6QkuLbYbt2AA",
            "CREATE_DATE": "21/10/2025"
          },
          {
            "ID": 2,
            "ACTIVITY_TYPE_ID": null,
            "CATEGORY_ID": 15,
            "TITLE": "Bu Yaştan Sonra - Yetişkinlere Oyunlar",
            "CITY": "Istanbul (Anadolu)",
            "DISTRICT": "Kadıköy",
            "TICKET_RULE": "Sınırlı kapasiteyle gerçekleşecek",
            "PRICE": 0,
            "FULL_ADDRESS": "https://share.google/jIKivVQjH3ElLgeHO",
            "DATE": "31/10/2025 19:00:00",
            "SUB_TITLE": "İçindeki çocuğu sahneye çıkar!",
            "DESCRIPTION": "İçindeki çocuğu sahneye çıkar! 3 saat sürecek bu atölyede kendini oyunlara bırak, hayal gücünü keşfet ve kahkahayla dolu bir deneyim yaşa.\\n🎭 Rol al, keşfet, eğlen\\n🤝 Diğer katılımcılarla etkileşimde bulun\\n✨ Çocuksu neşeni yeniden davet et\\nNot: Sadece oyunlara 'EVET!'' de!",
            "RATING": null,
            "IS_ACTIVE": true,
            "IMAGE_URL": "/images/Games.jpg",
            "EXTERNAL_URL": "Radar Türkiye mobil uygulama üzerinden kaydınızı yapabilirsiniz, https://radarturkiye.com/event/bu-yastan-sonra-yetiskinlere-oyunlar/5WcYSTkGzYNlKnDa1O4cmQ",
            "CREATE_DATE": "21/10/2025"
          }
        ]
      },
      {
        "ID": 16,
        "CATEGORY_NAME": "Çocuklar",
        "ACTIVITY_TYPE": [],
        "PRODUCT": []
      },
      {
        "ID": 17,
        "CATEGORY_NAME": "Tüm yaş grupları",
        "ACTIVITY_TYPE": [],
        "PRODUCT": []
      }
    ]
  }
];

type RawProduct = {
  ID: number;
  CATEGORY_ID: number | null;
  TITLE: string;
  SUB_TITLE?: string | null;
  DESCRIPTION?: string | null;
  PRICE: number;
  IMAGE_URL?: string | null;
  EXTERNAL_URL?: string | null;
  CITY?: string | null;
  DISTRICT?: string | null;
  TICKET_RULE?: string | null;
  DATE?: string | null;
  RATING?: number | null;
  IS_ACTIVE: boolean;
  CREATE_DATE?: string | null;
};

interface RawActivity {
  ID: number;
  ACTIVITY_NAME: string;
  CATEGORY?: RawCategory[];
}

interface RawCategory {
  ID: number;
  CATEGORY_NAME: string;
  ACTIVITY_TYPE?: RawActivityType[];
  PRODUCT?: RawProduct[];
}

interface RawActivityType {
  ID: number;
  ACTIVITY_TYPE_NAME: string;
}

export function getActivitiesMock(): Activity[] {
  const arr = RAW_DATA as RawActivity[];
  return (arr || []).map((a) => ({
    id: String(a.ID),
    activity_name: a.ACTIVITY_NAME,
    created_at: new Date().toISOString(),
  }));
}

export function getFeaturedProductsMock(limit = 6): Product[] {
  const arr = (RAW_DATA as RawActivity[]) || [];
  const products: Product[] = [];
  for (const activity of arr) {
    for (const category of activity.CATEGORY || []) {
      for (const p of (category.PRODUCT || []) as RawProduct[]) {
        products.push({
          id: String(p.ID),
          activity_type_id: '',
          category_id: String(p.CATEGORY_ID ?? ''),
          title: p.TITLE,
          sub_title: p.SUB_TITLE ?? undefined,
          description: p.DESCRIPTION ?? undefined,
          price: p.PRICE ?? 0,
          image_url: p.IMAGE_URL ?? undefined,
          external_url: p.EXTERNAL_URL ?? undefined,
          city: p.CITY ?? undefined,
          district: p.DISTRICT ?? undefined,
          ticket_rule: p.TICKET_RULE ?? undefined,
          date: p.DATE ?? undefined,
          rating: p.RATING ?? undefined,
          is_active: Boolean(p.IS_ACTIVE),
          create_date: p.CREATE_DATE ?? new Date().toISOString(),
        });
      }
    }
  }
  return products
    .filter((p) => p.is_active)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, limit);
}

export function getCategoriesMock(): Category[] {
  const arr = (RAW_DATA as RawActivity[]) || [];
  const categories: Category[] = [];
  for (const activity of arr) {
    for (const category of activity.CATEGORY || []) {
      categories.push({
        id: String(category.ID),
        activity_id: String(activity.ID),
        category_name: category.CATEGORY_NAME,
        created_at: new Date().toISOString(),
      });
    }
  }
  return categories;
}

export function getActivityTypesMock(): ActivityType[] {
  const arr = (RAW_DATA as RawActivity[]) || [];
  const types: ActivityType[] = [];
  for (const activity of arr) {
    for (const category of activity.CATEGORY || []) {
      for (const type of category.ACTIVITY_TYPE || []) {
        types.push({
          id: String(type.ID),
          activity_id: String(activity.ID),
          category_id: String(category.ID),
          activity_type_name: type.ACTIVITY_TYPE_NAME,
          created_at: new Date().toISOString(),
        });
      }
    }
  }
  return types;
}

export function getAllProductsMock(): Product[] {
  return getFeaturedProductsMock(9999);
}