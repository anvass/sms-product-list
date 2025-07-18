import { AppDataSource } from '../data-source';
import { Product } from '../entity/Product';

const LIMIT = 50;

const productRepository = AppDataSource.getRepository(Product);

const productNames: readonly string[] = [
  'Элегантная сумка',
  'Смартфон X500',
  'Планшет AirTab',
  'Наушники SoundPro',
  'Кофеварка Premium',
  'Бытовой робот Robby',
  'Спортивные часы FitMax',
  'Фитнес-трекер Pulse',
  'Внешний HDD StorageX',
  'Графическая карта GTX9000',
  'Охлаждаемый кейс CoolBox',
  'Игровая клавиатура ProKey',
  'Мышь LaserPro',
  'Монитор UltraView',
  'Сканер DocPro',
  'Принтер JetPro',
  'Копировальный аппарат CopyMax',
  'Конфиденциальная папка SafeBox',
  'Защитный чехол ArmorCase',
  'Стеклянная защитная пленка GlassShield',
  'Автомобильные колонки SoundCar',
  'Навигатор GPS Guide',
  'Детектор радара RadarSafe',
  'Автоматический парковщик ParkAssist',
  'Адаптивные фары LightPro',
  'Система очистки воздуха AirClean',
  'Умная розетка SmartPlug',
  'Контроль температуры TempControl',
  'Система безопасности SafeHome',
  'Датчик движения MotionEye',
  'Умные часы SmartWatch',
  'Фитнес-браслет FitBand',
  'Спортивный ремень SportBelt',
  'Беговая дорожка RunMaster',
  'Эллиптический тренажер OrbitFit',
  'Гребной тренажер RowPower',
  'Велотренажер BikePro',
];

function generateRandomNumber(from: number, to: number): number {
  const min = Math.min(from, to);
  const max = Math.max(from, to);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomArticle(): string {
  const prefix = 'ART';
  const uuid = crypto.randomUUID();
  return `${prefix}-${uuid.substring(0, 8)}`;
}

function generateRamdomName() {
  return productNames[generateRandomNumber(0, productNames.length - 1)];
}

export async function seedProducts() {
  if ((await productRepository.count()) > 0) {
    console.log('no seeds');
    return;
  }
  for (let i = 0; i < LIMIT; i++) {
    const product = productRepository.create({
      article: generateRandomArticle(),
      name: generateRamdomName(),
      price: generateRandomNumber(1000, 10_000),
      quantity: generateRandomNumber(1, 100),
    });

    await productRepository.save(product);
  }
  console.log(`${LIMIT} seeds`);
}
