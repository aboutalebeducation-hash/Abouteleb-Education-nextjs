export const UNIVERSITIES = [
  { slug: 'acibadem',         nameAr: 'جامعة أجيبادم',         nameEn: 'Acıbadem University',         city: 'Istanbul', discount: 30 },
  { slug: 'altinbas',         nameAr: 'جامعة ألتين باش',        nameEn: 'Altınbaş University',         city: 'Istanbul', discount: 50 },
  { slug: 'ankara-bilim',     nameAr: 'جامعة أنقرة بيليم',      nameEn: 'Ankara Bilim University',     city: 'Ankara',   discount: 40 },
  { slug: 'ankara-medipol',   nameAr: 'جامعة أنقرة ميديبول',    nameEn: 'Ankara Medipol University',   city: 'Ankara',   discount: 45 },
  { slug: 'atilim',           nameAr: 'جامعة أتيليم',           nameEn: 'Atılım University',           city: 'Ankara',   discount: 35 },
  { slug: 'bahcesehir',       nameAr: 'جامعة بهشه شهير',        nameEn: 'Bahçeşehir University',       city: 'Istanbul', discount: 60 },
  { slug: 'beykoz',           nameAr: 'جامعة بيكوز',            nameEn: 'Beykoz University',           city: 'Istanbul', discount: 40 },
  { slug: 'bezmialem',        nameAr: 'جامعة بزم عالم',         nameEn: 'Bezmialem University',        city: 'Istanbul', discount: 25 },
  { slug: 'biruni',           nameAr: 'جامعة بيروني',           nameEn: 'Biruni University',           city: 'Istanbul', discount: 50 },
  { slug: 'dogus',            nameAr: 'جامعة دوغوش',            nameEn: 'Doğuş University',            city: 'Istanbul', discount: 35 },
  { slug: 'fatih-sultan-mehmet', nameAr: 'جامعة فاتح سلطان محمد', nameEn: 'Fatih Sultan Mehmet University', city: 'Istanbul', discount: 55 },
  { slug: 'fenerbahce',       nameAr: 'جامعة فنربخشة',          nameEn: 'Fenerbahçe University',       city: 'Istanbul', discount: 40 },
  { slug: 'halic',            nameAr: 'جامعة هاليتش',           nameEn: 'Haliç University',            city: 'Istanbul', discount: 45 },
  { slug: 'istinye',          nameAr: 'جامعة إستينيه',          nameEn: 'İstinye University',          city: 'Istanbul', discount: 50 },
  { slug: 'istanbul-aydin',   nameAr: 'جامعة إسطنبول أيدين',    nameEn: 'Istanbul Aydın University',   city: 'Istanbul', discount: 55 },
  { slug: 'istanbul-bilgi',   nameAr: 'جامعة إسطنبول بيلغي',    nameEn: 'Istanbul Bilgi University',   city: 'Istanbul', discount: 45 },
  { slug: 'istanbul-gelisim', nameAr: 'جامعة إسطنبول جيلشيم',   nameEn: 'Istanbul Gelişim University', city: 'Istanbul', discount: 60 },
  { slug: 'istanbul-kent',    nameAr: 'جامعة إسطنبول كنت',      nameEn: 'Istanbul Kent University',    city: 'Istanbul', discount: 65 },
  { slug: 'istanbul-medipol', nameAr: 'جامعة إسطنبول ميديبول',  nameEn: 'Istanbul Medipol University', city: 'Istanbul', discount: 40 },
  { slug: 'istanbul-okan',    nameAr: 'جامعة إسطنبول أوكان',    nameEn: 'Istanbul Okan University',    city: 'Istanbul', discount: 50 },
  { slug: 'kadir-has',        nameAr: 'جامعة قادر هاس',         nameEn: 'Kadir Has University',        city: 'Istanbul', discount: 35 },
  { slug: 'uskudar',          nameAr: 'جامعة أسكودار',          nameEn: 'Üsküdar University',          city: 'Istanbul', discount: 45 },
] as const

export type UniversitySlug = typeof UNIVERSITIES[number]['slug']

export const SERVICE_ICONS = ['graduation-cap', 'percent', 'file-signature', 'home'] as const
