// Generated from docs/commerce/catalog/*/product.json (Echoray product files) on 2026-10-27.
// Deterministic stand-in for the public catalog when ECHORAY_STOREFRONT_ID is not set.
// Regenerate by hand when the product files change; never import docs/ at runtime.
import type { PublicDetailV2 } from './types'

export const fixtureProducts: readonly PublicDetailV2[] = [
  {
    id: 'm175fysgpbpzatqtpjz9wds3ah8h3252',
    slug: 'drift-taxi',
    name: 'Дрифт Такси',
    collection: 'Дрифт Преживявания',
    material: '',
    optionLabel: '',
    minAmount: 15500,
    maxAmount: 15500,
    currency: 'EUR',
    images: [
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/taxi/0.png',
        alt: 'Дрифт Такси 1',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/taxi/2.png',
        alt: 'Дрифт Такси 2',
        derivatives: [],
      },
    ],
    description:
      'Седнете на пасажерската седалка до Дани Русев и усетете истинската G-сила. Без теория, само чист адреналин.\n\nПрограма:\n• Запознаване с мерките за безопасност и екипировката.\n• Слагане на каска и закопчаване на 4-точковите колани.\n• 45 минути бясно лашкане на седалката.',
    specifications: [
      {
        label: 'Време',
        value: '60 мин',
      },
      {
        label: 'Автомобил',
        value: 'BMW E46 V6',
      },
      {
        label: 'Мощност',
        value: '240 HP',
      },
      {
        label: 'Гуми',
        value: '4',
      },
      {
        label: 'Локация',
        value: 'София, Писта Крайници',
      },
      {
        label: 'Цената включва',
        value:
          'Професионален пилот, Гориво и Гуми, Каска и боне, Наем на писта',
      },
      {
        label: 'Цената не включва',
        value: 'Транспорт до пистата, Храна и напитки',
      },
    ],
    defaultVariant: 'default',
    variants: [
      {
        key: 'default',
        label: '',
        amount: 15500,
        mode: 'made_to_order',
        unlimited: true,
        leadMinDays: 0,
        leadMaxDays: 0,
        methods: ['delivery'],
      },
    ],
    options: [],
    page: {
      headline: 'Пасажерско Изживяване',
      labels: [],
      faqs: [],
      photos: [],
    },
    gallery: [
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/taxi/0.png',
        alt: 'Дрифт Такси 1',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/taxi/2.png',
        alt: 'Дрифт Такси 2',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/taxi/3.png',
        alt: 'Дрифт Такси 3',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/taxi/4.png',
        alt: 'Дрифт Такси 4',
        derivatives: [],
      },
    ],
    related: [],
    experience: {
      type: 'Дрифт преживяване',
      configurator: {
        version: 1,
        pricing: [],
        inputs: [
          {
            key: 'voucher',
            label: 'Ваучер',
            kind: 'choice',
            required: true,
            choices: [
              {
                value: 'digital',
                label: 'Ваучер Дигитален',
                amount: 0,
                digital: true,
              },
              {
                value: 'physical',
                label: 'Ваучер Физически',
                amount: 400,
              },
            ],
          },
          {
            key: 'location',
            label: 'Локация',
            kind: 'choice',
            required: true,
            hint: 'Google Maps: https://maps.app.goo.gl/WRbAdxrXFM2ZaM8Z7',
            choices: [
              {
                value: 'pista-kraynitsi',
                label: 'Писта Крайници',
                amount: 0,
                venue: 'pista-kraynitsi',
              },
            ],
          },
          {
            key: 'gopro',
            label: 'GoPro Заснемане',
            kind: 'toggle',
            required: false,
            amount: 2000,
            hint: 'Професионално заснемане на цялата сесия',
          },
          {
            key: 'extra_tires',
            label: 'Допълнителни Гуми',
            kind: 'toggle',
            required: false,
            amount: 8000,
            hint: '2 екстра гуми за по-дълго возене',
          },
          {
            key: 'recipient',
            label: 'Име на ваучера / Име на получателя (по избор)',
            kind: 'text',
            required: false,
            maxLength: 16,
          },
          {
            key: 'preferred_date',
            label: 'Предпочитана дата',
            kind: 'date',
            required: false,
            minDays: 1,
            maxDays: 365,
            hint: 'Избраната дата е предпочитана и ще бъде потвърдена по телефон след покупката.',
          },
        ],
      },
    },
  },
  {
    id: 'm170rrsy0n577y5xfkh8wbkc2d8h23a2',
    slug: 'drift-rent',
    name: 'Карай Дрифтачка',
    collection: 'Дрифт Преживявания',
    material: '',
    optionLabel: '',
    minAmount: 27000,
    maxAmount: 27000,
    currency: 'EUR',
    images: [
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/rent/1.png',
        alt: 'Карай Дрифтачка 1',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/rent/2.png',
        alt: 'Карай Дрифтачка 2',
        derivatives: [],
      },
    ],
    description:
      "Поемете контрола. Под напътствията на Дани, вие ще се научите да контролирате хаоса.\n\nПрограма:\n• Основи на дрифта, работа с волан и газ.\n• Упражнения за иницииране на дрифт и 'донъти'.\n• Връзване на завои по трасето.\n• Обобщение на карането и обратна връзка",
    specifications: [
      {
        label: 'Време',
        value: '60 мин',
      },
      {
        label: 'Автомобил',
        value: 'BMW E46 V6',
      },
      {
        label: 'Мощност',
        value: '240 HP',
      },
      {
        label: 'Гуми',
        value: '4',
      },
      {
        label: 'Локация',
        value: 'София, Писта Крайници',
      },
      {
        label: 'Цената включва',
        value:
          'Инструктор (Дани Русев), Наем на подготвен автомобил, Гориво и Гуми, Наем на писта',
      },
      {
        label: 'Цената не включва',
        value: 'Транспорт до пистата, Храна и напитки',
      },
    ],
    defaultVariant: 'default',
    variants: [
      {
        key: 'default',
        label: '',
        amount: 27000,
        mode: 'made_to_order',
        unlimited: true,
        leadMinDays: 0,
        leadMaxDays: 0,
        methods: ['delivery'],
      },
    ],
    options: [],
    page: {
      headline: 'Карай Сам',
      labels: [],
      faqs: [],
      photos: [],
    },
    gallery: [
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/rent/1.png',
        alt: 'Карай Дрифтачка 1',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/rent/2.png',
        alt: 'Карай Дрифтачка 2',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/rent/3.png',
        alt: 'Карай Дрифтачка 3',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/rent/4.png',
        alt: 'Карай Дрифтачка 4',
        derivatives: [],
      },
    ],
    related: [],
    experience: {
      type: 'Дрифт преживяване',
      configurator: {
        version: 1,
        pricing: [],
        inputs: [
          {
            key: 'voucher',
            label: 'Ваучер',
            kind: 'choice',
            required: true,
            choices: [
              {
                value: 'digital',
                label: 'Ваучер Дигитален',
                amount: 0,
                digital: true,
              },
              {
                value: 'physical',
                label: 'Ваучер Физически',
                amount: 400,
              },
            ],
          },
          {
            key: 'location',
            label: 'Локация',
            kind: 'choice',
            required: true,
            hint: 'Google Maps: https://maps.app.goo.gl/WRbAdxrXFM2ZaM8Z7',
            choices: [
              {
                value: 'pista-kraynitsi',
                label: 'Писта Крайници',
                amount: 0,
                venue: 'pista-kraynitsi',
              },
            ],
          },
          {
            key: 'gopro',
            label: 'GoPro Заснемане',
            kind: 'toggle',
            required: false,
            amount: 2000,
            hint: 'Професионално заснемане на цялата сесия',
          },
          {
            key: 'extra_tires',
            label: 'Допълнителни Гуми',
            kind: 'toggle',
            required: false,
            amount: 8000,
            hint: '2 екстра гуми за по-дълго возене',
          },
          {
            key: 'recipient',
            label: 'Име на ваучера / Име на получателя (по избор)',
            kind: 'text',
            required: false,
            maxLength: 16,
          },
          {
            key: 'preferred_date',
            label: 'Предпочитана дата',
            kind: 'date',
            required: false,
            minDays: 1,
            maxDays: 365,
            hint: 'Избраната дата е предпочитана и ще бъде потвърдена по телефон след покупката.',
          },
        ],
      },
    },
  },
  {
    id: 'm174bbxxcz6d38kjzqn9c844098h2f5c',
    slug: 'drift-mix',
    name: 'Дрифт Микс',
    collection: 'Дрифт Преживявания',
    material: '',
    optionLabel: '',
    minAmount: 21500,
    maxAmount: 21500,
    currency: 'EUR',
    images: [
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/mix/2.png',
        alt: 'Дрифт Микс 1',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/mix/1.png',
        alt: 'Дрифт Микс 2',
        derivatives: [],
      },
    ],
    description:
      'Усетете дрифта от двете страни - от пасажерското място и от шофьорската седалка!\n\nПрограма:\n• Основи на дрифта, работа с волан и газ.\n• Интензивно возене на трасе.\n• Започни трансформацията си в дрифт звяр.\n• Обобщение на карането и обратна връзка.',
    specifications: [
      {
        label: 'Време',
        value: '60 мин',
      },
      {
        label: 'Автомобил',
        value: 'BMW E46 V6',
      },
      {
        label: 'Мощност',
        value: '240 HP',
      },
      {
        label: 'Гуми',
        value: '4',
      },
      {
        label: 'Локация',
        value: 'София, Писта Крайници',
      },
      {
        label: 'Цената включва',
        value:
          'Инструктор (Дани Русев), Наем на подготвен автомобил, Гориво и Гуми, Наем на писта',
      },
      {
        label: 'Цената не включва',
        value: 'Транспорт до пистата, Храна и напитки',
      },
    ],
    defaultVariant: 'default',
    variants: [
      {
        key: 'default',
        label: '',
        amount: 21500,
        mode: 'made_to_order',
        unlimited: true,
        leadMinDays: 0,
        leadMaxDays: 0,
        methods: ['delivery'],
      },
    ],
    options: [],
    page: {
      headline: 'Возене + Каране',
      labels: [],
      faqs: [],
      photos: [],
    },
    gallery: [
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/mix/2.png',
        alt: 'Дрифт Микс 1',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/mix/1.png',
        alt: 'Дрифт Микс 2',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/mix/3.png',
        alt: 'Дрифт Микс 3',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/mix/4.png',
        alt: 'Дрифт Микс 4',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/mix/5.png',
        alt: 'Дрифт Микс 5',
        derivatives: [],
      },
    ],
    related: [],
    experience: {
      type: 'Дрифт преживяване',
      configurator: {
        version: 1,
        pricing: [],
        inputs: [
          {
            key: 'voucher',
            label: 'Ваучер',
            kind: 'choice',
            required: true,
            choices: [
              {
                value: 'digital',
                label: 'Ваучер Дигитален',
                amount: 0,
                digital: true,
              },
              {
                value: 'physical',
                label: 'Ваучер Физически',
                amount: 400,
              },
            ],
          },
          {
            key: 'location',
            label: 'Локация',
            kind: 'choice',
            required: true,
            hint: 'Google Maps: https://maps.app.goo.gl/WRbAdxrXFM2ZaM8Z7',
            choices: [
              {
                value: 'pista-kraynitsi',
                label: 'Писта Крайници',
                amount: 0,
                venue: 'pista-kraynitsi',
              },
            ],
          },
          {
            key: 'gopro',
            label: 'GoPro Заснемане',
            kind: 'toggle',
            required: false,
            amount: 2000,
            hint: 'Професионално заснемане на цялата сесия',
          },
          {
            key: 'extra_tires',
            label: 'Допълнителни Гуми',
            kind: 'toggle',
            required: false,
            amount: 8000,
            hint: '2 екстра гуми за по-дълго возене или каране',
          },
          {
            key: 'recipient',
            label: 'Име на ваучера / Име на получателя (по избор)',
            kind: 'text',
            required: false,
            maxLength: 16,
          },
          {
            key: 'preferred_date',
            label: 'Предпочитана дата',
            kind: 'date',
            required: false,
            minDays: 1,
            maxDays: 365,
            hint: 'Избраната дата е предпочитана и ще бъде потвърдена по телефон след покупката.',
          },
        ],
      },
    },
  },
  {
    id: 'm17ctxp1frvfgmhkn8c5299wn58h38m0',
    slug: 'drift-event',
    name: 'Дрифт Събитие',
    collection: 'Дрифт Преживявания',
    material: '',
    optionLabel: '',
    minAmount: 0,
    maxAmount: 0,
    currency: 'EUR',
    images: [
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/event/1.png',
        alt: 'Дрифт Събитие 1',
        derivatives: [],
      },
      {
        originalUrl: 'https://danirusev.com/api/media/file/2.webp',
        alt: 'Дрифт Събитие 2',
        derivatives: [],
      },
    ],
    description:
      'Поверете ни организацията на Вашите най-ценни моменти. Ние създаваме стилни, добре обмислени изненади и преживявания, които оставят вечен спомен!\n\nПодходящо за:\n• Празнувайте поредната година с висока скорост и личен урок по дрифт, който ще държи пулса ти висок дълго след финала.\n• Влезте в семейния живот с контролиран занос и споделен адреналин в кабината на мощни дрифт автомобили.\n• Разберете пола на вашето бебе чрез зрелищни облаци от син или розов дим, генерирани от въртящи се гуми.\n• Кажете „Да!“ под звука на въртящи се гуми, превръщайки пристигането си в незабравимо шоу с много конски сили.\n• Сплотете екипа чрез екстремно предизвикателство на пистата, което изисква пълно доверие и перфектна координация.\n• Отбележете важните моменти с ексклузивно дрифт преживяване, където прецизното шофиране среща безкомпромисния лукс.',
    specifications: [
      {
        label: 'Време',
        value: '~4 часа',
      },
      {
        label: 'Автомобил',
        value: 'BMW E46 V6',
      },
      {
        label: 'Мощност',
        value: '240 HP',
      },
      {
        label: 'Гуми',
        value: '∞',
      },
      {
        label: 'Локация',
        value: 'София, Писта Крайници',
      },
      {
        label: 'Цената включва',
        value:
          'Инструктор (Дани Русев), Наем на подготвен автомобил, Гориво и Гуми за цялата сесия, Кетъринг, Музика, Декор, Игри',
      },
      {
        label: 'Цената не включва',
        value: 'Депозит за щети, Транспорт до пистата',
      },
    ],
    defaultVariant: 'default',
    variants: [
      {
        key: 'default',
        label: '',
        amount: 0,
        mode: 'made_to_order',
        unlimited: true,
        leadMinDays: 0,
        leadMaxDays: 0,
        methods: ['delivery'],
      },
    ],
    options: [],
    page: {
      headline: 'Специален Повод',
      labels: ['По договаряне'],
      faqs: [],
      photos: [],
    },
    gallery: [
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/event/1.png',
        alt: 'Дрифт Събитие 1',
        derivatives: [],
      },
      {
        originalUrl: 'https://danirusev.com/api/media/file/2.webp',
        alt: 'Дрифт Събитие 2',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/event/3.png',
        alt: 'Дрифт Събитие 3',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/event/4.png',
        alt: 'Дрифт Събитие 4',
        derivatives: [],
      },
      {
        originalUrl: 'https://danirusev.com/api/media/file/7.webp',
        alt: 'Дрифт Събитие 5',
        derivatives: [],
      },
    ],
    related: [],
    experience: {
      type: 'Дрифт преживяване',
      configurator: {
        version: 1,
        pricing: [],
        inputs: [
          {
            key: 'voucher',
            label: 'Ваучер',
            kind: 'choice',
            required: true,
            choices: [
              {
                value: 'digital',
                label: 'Ваучер Дигитален',
                amount: 0,
                digital: true,
              },
              {
                value: 'physical',
                label: 'Ваучер Физически',
                amount: 0,
              },
            ],
          },
          {
            key: 'location',
            label: 'Локация',
            kind: 'choice',
            required: true,
            hint: 'Google Maps: https://maps.app.goo.gl/WRbAdxrXFM2ZaM8Z7',
            choices: [
              {
                value: 'pista-kraynitsi',
                label: 'Писта Крайници',
                amount: 0,
                venue: 'pista-kraynitsi',
              },
            ],
          },
          {
            key: 'recipient',
            label: 'Име на ваучера / Име на получателя (по избор)',
            kind: 'text',
            required: false,
            maxLength: 16,
          },
          {
            key: 'preferred_date',
            label: 'Предпочитана дата',
            kind: 'date',
            required: false,
            minDays: 1,
            maxDays: 365,
            hint: 'Избраната дата е предпочитана и ще бъде потвърдена по телефон след покупката.',
          },
        ],
      },
      inquiry: {
        label: 'по договаряне',
      },
    },
  },
  {
    id: 'm175040bz0vc24pg74yf8f9g098h2s1n',
    slug: 'drift-day',
    name: 'Дрифт Ден',
    collection: 'Дрифт Преживявания',
    material: '',
    optionLabel: '',
    minAmount: 35800,
    maxAmount: 35800,
    currency: 'EUR',
    images: [
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/day/1.png',
        alt: 'Дрифт Ден 1',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/day/2.png',
        alt: 'Дрифт Ден 2',
        derivatives: [],
      },
    ],
    description:
      'Дрифт обучение за начинаещи, подходящо за хора без опит и без шофьорска книжка. Индивидуален подход към всеки желаещ, на трасе съобразено с уменията му.\n\nПрограма:\n• Настройка на седалката и волана за максимален контрол и безопасност.\n• Използване на ръчната спирачка за иницииране и контролирано спиране.\n• Фин контрол на газта за стабилизиране и корекция на дрифта.\n• Контролирано въртене в малък радиус с постоянен ъгъл на занасяне.\n• Поддържане на стабилен дрифт в по-голям радиус и по-висока скорост.\n• Плавно прехвърляне на тежестта за смяна на посоката без загуба на контрол.\n• Свързване на два последователни дрифта с прецизен контрол.\n• Обсъждане на техниките и индивидуална обратна връзка за напредък.',
    specifications: [
      {
        label: 'Време',
        value: 'ЦЯЛ ДЕН',
      },
      {
        label: 'Автомобил',
        value: 'BMW E46 V6',
      },
      {
        label: 'Мощност',
        value: '240 HP',
      },
      {
        label: 'Гуми',
        value: '∞',
      },
      {
        label: 'Локация',
        value: 'София, Писта Крайници',
      },
      {
        label: 'Цената включва',
        value:
          'Инструктор (Дани Русев), Наем на подготвен автомобил, Неограничени гориво и гуми, Кетъринг, Музика, Наем на писта',
      },
      {
        label: 'Цената не включва',
        value: 'Транспорт до пистата',
      },
    ],
    defaultVariant: 'default',
    variants: [
      {
        key: 'default',
        label: '',
        amount: 35800,
        mode: 'made_to_order',
        unlimited: true,
        leadMinDays: 0,
        leadMaxDays: 0,
        methods: ['delivery'],
      },
    ],
    options: [],
    page: {
      headline: 'Курс',
      labels: [],
      faqs: [],
      photos: [],
    },
    gallery: [
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/day/1.png',
        alt: 'Дрифт Ден 1',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/day/2.png',
        alt: 'Дрифт Ден 2',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/day/3.png',
        alt: 'Дрифт Ден 3',
        derivatives: [],
      },
      {
        originalUrl:
          'https://raw.githubusercontent.com/Ethereumistic/danirusev-assets/main/experiences/day/4.png',
        alt: 'Дрифт Ден 4',
        derivatives: [],
      },
    ],
    related: [],
    experience: {
      type: 'Дрифт преживяване',
      configurator: {
        version: 1,
        pricing: [],
        inputs: [
          {
            key: 'voucher',
            label: 'Ваучер',
            kind: 'choice',
            required: true,
            choices: [
              {
                value: 'digital',
                label: 'Ваучер Дигитален',
                amount: 0,
                digital: true,
              },
              {
                value: 'physical',
                label: 'Ваучер Физически',
                amount: 400,
              },
            ],
          },
          {
            key: 'location',
            label: 'Локация',
            kind: 'choice',
            required: true,
            hint: 'Google Maps: https://maps.app.goo.gl/WRbAdxrXFM2ZaM8Z7',
            choices: [
              {
                value: 'pista-kraynitsi',
                label: 'Писта Крайници',
                amount: 0,
                venue: 'pista-kraynitsi',
              },
            ],
          },
          {
            key: 'duration',
            label: 'Продължителност',
            kind: 'choice',
            required: true,
            choices: [
              {
                value: '2h',
                label: '2 Часа',
                amount: 0,
              },
              {
                value: '4h',
                label: '4 Часа',
                amount: 14100,
              },
              {
                value: '6h',
                label: '6 Часа',
                amount: 34800,
              },
            ],
          },
          {
            key: 'gopro',
            label: 'GoPro Заснемане',
            kind: 'toggle',
            required: false,
            amount: 2000,
            hint: 'Професионално заснемане на цялата сесия',
          },
          {
            key: 'recipient',
            label: 'Име на ваучера / Име на получателя (по избор)',
            kind: 'text',
            required: false,
            maxLength: 16,
          },
          {
            key: 'preferred_date',
            label: 'Предпочитана дата',
            kind: 'date',
            required: false,
            minDays: 1,
            maxDays: 365,
            hint: 'Избраната дата е предпочитана и ще бъде потвърдена по телефон след покупката.',
          },
        ],
      },
    },
  },
]
