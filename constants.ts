import { Animal, MapPoint, MapZone } from './types';

// Helper to generate local paths based on folder structure
// Structure: /animals/{id}/{number}.jpg
const getLocalImages = (id: string, count: number) => {
  return Array.from({ length: count }, (_, i) => `/animals/${id}/${i + 1}.jpg`);
};

export const ANIMALS: Record<string, Animal> = {
  'wolf': {
    id: 'wolf',
    name: 'Волк',
    scientificName: 'Canis lupus cubanensis',
    category: 'mammal',
    shortDescription: 'Умный хищник, живущий стаями.',
    description: 'Кавказский волк — важный санитар леса. В вольерном комплексе живет пара, которая часто демонстрирует сложные социальные отношения. Волки активны и любопытны, часто наблюдают за посетителями.',
    images: getLocalImages('wolf', 3), // Expects 1.jpg, 2.jpg, 3.jpg in /animals/wolf/
    conservationStatus: 'LC'
  },
  'sika': {
    id: 'sika',
    name: 'Пятнистый олень',
    scientificName: 'Cervus nippon',
    category: 'mammal',
    shortDescription: 'Грациозный олень с пятнистой шкурой.',
    description: 'Пятнистый олень был акклиматизирован на Кавказе. Летом их окрас ярко-рыжий с белыми пятнами, а зимой тускнеет. Это очень осторожные и быстрые животные.',
    images: getLocalImages('sika', 2),
    conservationStatus: 'LC'
  },
  'chamois': {
    id: 'chamois',
    name: 'Серна Кавказская',
    scientificName: 'Rupicapra rupicapra caucasica',
    category: 'mammal',
    shortDescription: 'Ловкий горный житель.',
    description: 'Серны — виртуозы скалолазания. Их копыта устроены так, что позволяют удерживаться на крошечных уступах. Обитают в высокогорье, но в вольере чувствуют себя комфортно.',
    images: getLocalImages('chamois', 2),
    conservationStatus: 'NT'
  },
  'red_deer': {
    id: 'red_deer',
    name: 'Кавказский благородный олень',
    scientificName: 'Cervus elaphus maral',
    category: 'mammal',
    shortDescription: 'Гордость кавказских лесов.',
    description: 'Кавказский марал — один из самых крупных подвидов благородного оленя. Самцы носят ветвистые рога, которые сбрасывают каждый год. Осенью можно услышать их мощный рев.',
    images: getLocalImages('red_deer', 2),
    conservationStatus: 'LC'
  },
  'zubr': {
    id: 'zubr',
    name: 'Зубр',
    scientificName: 'Bison bonasus',
    category: 'mammal',
    shortDescription: 'Исполин леса.',
    description: 'Самое крупное наземное млекопитающее Европы. Кавказский заповедник — главное место восстановления популяции горного зубра. В вольере можно оценить их истинные размеры.',
    images: getLocalImages('zubr', 3),
    conservationStatus: 'EN'
  },
  'boar': {
    id: 'boar',
    name: 'Дикий Кабан',
    scientificName: 'Sus scrofa',
    category: 'mammal',
    shortDescription: 'Всеядный обитатель леса.',
    description: 'Кабаны умны и социальны. Они играют важную роль в экосистеме, рыхля землю в поисках пищи. Поросята рождаются полосатыми для маскировки.',
    images: getLocalImages('boar', 2),
    conservationStatus: 'LC'
  },
  'roe': {
    id: 'roe',
    name: 'Косуля',
    scientificName: 'Capreolus capreolus',
    category: 'mammal',
    shortDescription: 'Самый маленький олень Европы.',
    description: 'Изящные и легкие животные. У самцов небольшие рожки. Косули предпочитают светлые леса и поляны. При опасности издают характерный лающий звук.',
    images: getLocalImages('roe', 2),
    conservationStatus: 'LC'
  },
  // Split Small Predators
  'badger': {
    id: 'badger',
    name: 'Барсук',
    scientificName: 'Meles meles',
    category: 'mammal',
    shortDescription: 'Ночной житель нор.',
    description: 'Барсук — чистоплотное животное, строящее сложные системы нор. Ведет ночной образ жизни.',
    images: getLocalImages('badger', 1),
    conservationStatus: 'LC'
  },
  'raccoon': {
    id: 'raccoon',
    name: 'Енот-полоскун',
    scientificName: 'Procyon lotor',
    category: 'mammal',
    shortDescription: 'Ловкий и хитрый.',
    description: 'Инвазивный вид для Кавказа. Известен своей привычкой "полоскать" еду в воде и ловкими лапками.',
    images: getLocalImages('raccoon', 1),
    conservationStatus: 'LC'
  },
  'raccoon_dog': {
    id: 'raccoon_dog',
    name: 'Енотовидная собака',
    scientificName: 'Nyctereutes procyonoides',
    category: 'mammal',
    shortDescription: 'Похожа на енота, но собака.',
    description: 'Единственный представитель псовых, который впадает в зимнюю спячку.',
    images: getLocalImages('raccoon_dog', 1),
    conservationStatus: 'LC'
  },
  'fox': {
    id: 'fox',
    name: 'Лисица',
    scientificName: 'Vulpes vulpes',
    category: 'mammal',
    shortDescription: 'Рыжая плутовка.',
    description: 'Обыкновенная лисица широко распространена на Кавказе. Умный и осторожный хищник.',
    images: getLocalImages('fox', 2),
    conservationStatus: 'LC'
  },
  // Split Birds
  'steppe_eagle': {
    id: 'steppe_eagle',
    name: 'Степной орел',
    scientificName: 'Aquila nipalensis',
    category: 'bird',
    shortDescription: 'Обитатель открытых пространств.',
    description: 'Крупный орел, гнездящийся на земле. Питается грызунами.',
    images: getLocalImages('steppe_eagle', 1),
    conservationStatus: 'EN'
  },
  'falcon': {
    id: 'falcon',
    name: 'Сокол сапсан',
    scientificName: 'Falco peregrinus',
    category: 'bird',
    shortDescription: 'Самая быстрая птица.',
    description: 'В пикирующем полете способен развивать скорость свыше 300 км/ч.',
    images: getLocalImages('falcon', 1),
    conservationStatus: 'LC'
  },
  'white_tailed_eagle': {
    id: 'white_tailed_eagle',
    name: 'Орлан-белохвост',
    scientificName: 'Haliaeetus albicilla',
    category: 'bird',
    shortDescription: 'Крупнейший хищник неба.',
    description: 'Огромная птица с размахом крыльев до 2.5 метров. Обитает у водоемов.',
    images: getLocalImages('white_tailed_eagle', 1),
    conservationStatus: 'LC'
  },
  'swans': {
    id: 'swans',
    name: 'Лебеди и Гуси',
    scientificName: 'Cygnus',
    category: 'bird',
    shortDescription: 'Водоплавающие птицы.',
    description: 'Пруд является домом для лебедей и гусей. Это спокойный уголок комплекса, где можно понаблюдать за жизнью водоплавающих птиц.',
    images: getLocalImages('swans', 2),
    conservationStatus: 'LC'
  }
};

// Layout matching the provided schema image closely
// Canvas size: 1000 x 600
export const MAP_ZONES: MapZone[] = [
  // --- TOP ROW ---
  {
    id: 'z-wolf',
    animalId: 'wolf',
    // Top Left Rectangle
    path: 'M 20,40 L 180,40 L 180,280 L 20,280 Z',
    labelX: 100,
    labelY: 160
  },
  {
    id: 'z-sika',
    animalId: 'sika',
    // Next to Wolf
    path: 'M 200,40 L 360,40 L 360,280 L 200,280 Z',
    labelX: 280,
    labelY: 160
  },
  {
    id: 'z-chamois',
    animalId: 'chamois',
    // Middle Top
    path: 'M 380,40 L 520,40 L 520,280 L 380,280 Z',
    labelX: 450,
    labelY: 160
  },
  {
    id: 'z-red_deer',
    animalId: 'red_deer',
    // Right Top Middle
    path: 'M 540,40 L 730,40 L 730,280 L 540,280 Z',
    labelX: 635,
    labelY: 160
  },
  {
    id: 'z-zubr',
    animalId: 'zubr',
    // Top Right Large Area with cut corner
    path: 'M 750,40 L 980,40 L 980,320 L 850,320 L 750,280 Z',
    labelX: 865,
    labelY: 180
  },

  // --- BOTTOM ROW ---
  {
    id: 'z-boar',
    animalId: 'boar',
    // Bottom Left
    path: 'M 60,340 L 220,340 L 220,540 L 60,540 Z',
    labelX: 140,
    labelY: 440
  },
  {
    id: 'z-roe',
    animalId: 'roe',
    // Next to Boar
    path: 'M 240,340 L 380,340 L 380,540 L 240,540 Z',
    labelX: 310,
    labelY: 440
  },
  
  // --- SPLIT PREDATORS ---
  // Area: x=400 to 520, y=340 to 540
  // 1. Badger (Top) - Small box
  {
    id: 'z-badger',
    animalId: 'badger',
    path: 'M 400,340 L 520,340 L 520,390 L 400,390 Z',
    labelX: 460,
    labelY: 370
  },
  // 2. Raccoon (Middle)
  {
    id: 'z-raccoon',
    animalId: 'raccoon',
    path: 'M 400,400 L 520,400 L 520,450 L 400,450 Z',
    labelX: 460,
    labelY: 430
  },
  // 3. Raccoon Dog (Bottom Left)
  {
    id: 'z-raccoon-dog',
    animalId: 'raccoon_dog',
    path: 'M 400,460 L 455,460 L 455,540 L 400,540 Z',
    labelX: 427,
    labelY: 500
  },
  // 4. Fox (Bottom Right)
  {
    id: 'z-fox',
    animalId: 'fox',
    path: 'M 465,460 L 520,460 L 520,540 L 465,540 Z',
    labelX: 492,
    labelY: 500
  },
  
  // -- ENTRANCE PATH GAP --

  // --- SPLIT BIRDS ---
  // Area: x=560 to 680, y=340 to 520
  // 1. Steppe Eagle (Left) - Vertical strip
  {
    id: 'z-steppe_eagle',
    animalId: 'steppe_eagle',
    path: 'M 560,340 L 615,340 L 615,520 L 560,520 Z',
    labelX: 587,
    labelY: 430
  },
  // 2. Falcon (Top Right)
  {
    id: 'z-falcon',
    animalId: 'falcon',
    path: 'M 625,340 L 680,340 L 680,425 L 625,425 Z',
    labelX: 652,
    labelY: 382
  },
  // 3. White-tailed Eagle (Bottom Right)
  {
    id: 'z-white_tailed_eagle',
    animalId: 'white_tailed_eagle',
    path: 'M 625,435 L 680,435 L 680,520 L 625,520 Z',
    labelX: 652,
    labelY: 477
  },

  {
    id: 'z-swans',
    animalId: 'swans',
    // Pond Area
    path: 'M 700,380 L 960,380 Q 990,380 980,450 Q 960,560 700,540 Q 680,460 700,380 Z',
    labelX: 840,
    labelY: 460
  }
];

export const MAP_POINTS: MapPoint[] = []; 

export const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  'LC': { label: 'Наименьшие опасения', color: 'bg-green-500' },
  'NT': { label: 'Близок к уязвимому', color: 'bg-yellow-500' },
  'VU': { label: 'Уязвимый', color: 'bg-orange-500' },
  'EN': { label: 'Вымирающий', color: 'bg-red-500' },
  'CR': { label: 'На грани исчезновения', color: 'bg-red-700' },
};