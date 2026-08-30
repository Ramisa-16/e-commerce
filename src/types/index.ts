export interface ProductVariant {
  id: string
  sku: string
  attributes: Record<string, string> // e.g. { size: 'M', color: 'Black' }
  price: number
  image?: string
  stock: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  rating: number
  reviews: number
  inStock: boolean
  tags?: string[]
  variants?: ProductVariant[]
  variantTypes?: Array<{ name: string; options: string[] }> // e.g. [{ name: 'Size', options: ['S', 'M', 'L'] }]
}

export interface CartItem {
  product: Product
  quantity: number
  variantId?: string
  variantSku?: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  date: string
  shippingAddress: ShippingAddress
}

export interface ShippingAddress {
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export const CATEGORIES = [
  'All',
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Books',
  'Sports',
  'Accessories',
] as const

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    description:
      'Premium over-ear headphones with industry-leading noise cancellation, 30-hour battery life, and crystal-clear audio. Features adaptive sound control and multipoint connection for seamless switching between devices.',
    price: 249.99,
    originalPrice: 349.99,
    images: [
      'https://picsum.photos/seed/headphones1/800/800',
      'https://picsum.photos/seed/headphones2/800/800',
      'https://picsum.photos/seed/headphones3/800/800',
    ],
    category: 'Electronics',
    rating: 4.7,
    reviews: 2341,
    inStock: true,
    tags: ['bestseller', 'sale'],
    variants: [
      {
        id: '1a',
        sku: 'HP-NC-BLK',
        attributes: { color: 'Black' },
        price: 249.99,
        image: 'https://picsum.photos/seed/headphones1/800/800',
        stock: 50,
      },
      {
        id: '1b',
        sku: 'HP-NC-WHT',
        attributes: { color: 'White' },
        price: 249.99,
        image: 'https://picsum.photos/seed/headphones2/800/800',
        stock: 30,
      },
      {
        id: '1c',
        sku: 'HP-NC-NVY',
        attributes: { color: 'Navy' },
        price: 269.99,
        image: 'https://picsum.photos/seed/headphones3/800/800',
        stock: 15,
      },
    ],
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description:
      'Track your health and fitness with GPS, heart rate monitoring, sleep analysis, and 100+ workout modes. Water-resistant to 50m with a vibrant AMOLED display and 7-day battery life.',
    price: 199.99,
    images: [
      'https://picsum.photos/seed/watch1/800/800',
      'https://picsum.photos/seed/watch2/800/800',
      'https://picsum.photos/seed/watch3/800/800',
    ],
    category: 'Electronics',
    rating: 4.5,
    reviews: 1876,
    inStock: true,
    tags: ['new'],
    variantTypes: [
      { name: 'Band', options: ['Silicone', 'Leather', 'Metal'] },
    ],
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description:
      'Soft, breathable, and sustainably made from 100% organic cotton. Pre-shrunk for a perfect fit that lasts wash after wash. Available in multiple colors and sizes.',
    price: 29.99,
    images: [
      'https://picsum.photos/seed/tshirt1/800/800',
      'https://picsum.photos/seed/tshirt2/800/800',
      'https://picsum.photos/seed/tshirt3/800/800',
      'https://picsum.photos/seed/tshirt4/800/800',
    ],
    category: 'Clothing',
    rating: 4.3,
    reviews: 892,
    inStock: true,
    variantTypes: [
      { name: 'Size', options: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Color', options: ['Black', 'White', 'Navy', 'Olive'] },
    ],
    variants: [
      { id: '3a', sku: 'TS-BLK-S', attributes: { size: 'S', color: 'Black' }, price: 29.99, image: 'https://picsum.photos/seed/tshirt1/800/800', stock: 25 },
      { id: '3b', sku: 'TS-BLK-M', attributes: { size: 'M', color: 'Black' }, price: 29.99, image: 'https://picsum.photos/seed/tshirt1/800/800', stock: 40 },
      { id: '3c', sku: 'TS-BLK-L', attributes: { size: 'L', color: 'Black' }, price: 29.99, image: 'https://picsum.photos/seed/tshirt1/800/800', stock: 35 },
      { id: '3d', sku: 'TS-WHT-S', attributes: { size: 'S', color: 'White' }, price: 29.99, image: 'https://picsum.photos/seed/tshirt2/800/800', stock: 20 },
      { id: '3e', sku: 'TS-WHT-M', attributes: { size: 'M', color: 'White' }, price: 29.99, image: 'https://picsum.photos/seed/tshirt2/800/800', stock: 45 },
      { id: '3f', sku: 'TS-WHT-L', attributes: { size: 'L', color: 'White' }, price: 29.99, image: 'https://picsum.photos/seed/tshirt2/800/800', stock: 30 },
      { id: '3g', sku: 'TS-NVY-M', attributes: { size: 'M', color: 'Navy' }, price: 29.99, image: 'https://picsum.photos/seed/tshirt3/800/800', stock: 28 },
      { id: '3h', sku: 'TS-NVY-L', attributes: { size: 'L', color: 'Navy' }, price: 29.99, image: 'https://picsum.photos/seed/tshirt3/800/800', stock: 22 },
    ],
  },
  {
    id: '4',
    name: 'Ceramic Pour-Over Coffee Maker',
    description:
      'Handcrafted ceramic dripper with a double wood handle. Brews a single to double cup of coffee with optimal flow rate for a clean, flavorful cup every time.',
    price: 44.99,
    originalPrice: 59.99,
    images: [
      'https://picsum.photos/seed/coffee1/800/800',
      'https://picsum.photos/seed/coffee2/800/800',
      'https://picsum.photos/seed/coffee3/800/800',
    ],
    category: 'Home & Kitchen',
    rating: 4.8,
    reviews: 567,
    inStock: true,
    tags: ['sale'],
  },
  {
    id: '5',
    name: 'The Art of Programming',
    description:
      'A comprehensive guide to modern software engineering practices. Covers algorithms, design patterns, testing strategies, and clean code principles with practical examples.',
    price: 39.99,
    images: [
      'https://picsum.photos/seed/book1/800/800',
      'https://picsum.photos/seed/book2/800/800',
    ],
    category: 'Books',
    rating: 4.6,
    reviews: 1234,
    inStock: true,
    tags: ['bestseller'],
  },
  {
    id: '6',
    name: 'Professional Yoga Mat',
    description:
      'Extra thick 6mm non-slip yoga mat made from eco-friendly TPE material. Includes carrying strap. Ideal for yoga, pilates, and floor exercises.',
    price: 49.99,
    images: [
      'https://picsum.photos/seed/yogamat1/800/800',
      'https://picsum.photos/seed/yogamat2/800/800',
      'https://picsum.photos/seed/yogamat3/800/800',
    ],
    category: 'Sports',
    rating: 4.4,
    reviews: 723,
    inStock: true,
    variantTypes: [
      { name: 'Color', options: ['Purple', 'Teal', 'Black', 'Pink'] },
    ],
  },
  {
    id: '7',
    name: 'Leather Minimalist Wallet',
    description:
      'Slim RFID-blocking wallet crafted from full-grain leather. Features 6 card slots, 2 bill compartments, and a hidden secure pocket. Ages beautifully with use.',
    price: 59.99,
    originalPrice: 79.99,
    images: [
      'https://picsum.photos/seed/wallet1/800/800',
      'https://picsum.photos/seed/wallet2/800/800',
      'https://picsum.photos/seed/wallet3/800/800',
    ],
    category: 'Accessories',
    rating: 4.6,
    reviews: 445,
    inStock: true,
    tags: ['sale'],
    variantTypes: [
      { name: 'Color', options: ['Brown', 'Black', 'Tan'] },
    ],
  },
  {
    id: '8',
    name: 'Portable Bluetooth Speaker',
    description:
      'Waterproof IP67 speaker with 360-degree sound, 20-hour playtime, and built-in microphone. Pairs easily with any Bluetooth device for music on the go.',
    price: 79.99,
    images: [
      'https://picsum.photos/seed/speaker1/800/800',
      'https://picsum.photos/seed/speaker2/800/800',
      'https://picsum.photos/seed/speaker3/800/800',
    ],
    category: 'Electronics',
    rating: 4.3,
    reviews: 1567,
    inStock: false,
    tags: ['outofstock'],
  },
  {
    id: '9',
    name: 'Stainless Steel Water Bottle',
    description:
      'Double-wall vacuum insulated bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof lid, and fits most cup holders.',
    price: 34.99,
    images: [
      'https://picsum.photos/seed/bottle1/800/800',
      'https://picsum.photos/seed/bottle2/800/800',
      'https://picsum.photos/seed/bottle3/800/800',
    ],
    category: 'Sports',
    rating: 4.7,
    reviews: 2103,
    inStock: true,
    tags: ['bestseller'],
    variantTypes: [
      { name: 'Size', options: ['500ml', '750ml', '1L'] },
      { name: 'Color', options: ['Silver', 'Black', 'Blue', 'Pink'] },
    ],
  },
  {
    id: '10',
    name: 'Mechanical Keyboard',
    description:
      'Compact 75% layout mechanical keyboard with hot-swappable switches, RGB backlight, and programmable macros. Premium PBT keycaps and USB-C connectivity.',
    price: 129.99,
    originalPrice: 159.99,
    images: [
      'https://picsum.photos/seed/keyboard1/800/800',
      'https://picsum.photos/seed/keyboard2/800/800',
      'https://picsum.photos/seed/keyboard3/800/800',
      'https://picsum.photos/seed/keyboard4/800/800',
    ],
    category: 'Electronics',
    rating: 4.8,
    reviews: 987,
    inStock: true,
    tags: ['sale'],
    variantTypes: [
      { name: 'Switch', options: ['Red', 'Blue', 'Brown'] },
    ],
  },
  {
    id: '11',
    name: 'Canvas Backpack',
    description:
      'Vintage-style canvas backpack with leather accents. Features a padded 15-inch laptop compartment, multiple organizer pockets, and water-resistant coating.',
    price: 89.99,
    images: [
      'https://picsum.photos/seed/backpack1/800/800',
      'https://picsum.photos/seed/backpack2/800/800',
      'https://picsum.photos/seed/backpack3/800/800',
    ],
    category: 'Accessories',
    rating: 4.5,
    reviews: 334,
    inStock: true,
  },
  {
    id: '12',
    name: 'Scented Soy Candle Set',
    description:
      'Set of 3 hand-poured soy wax candles in lavender, vanilla, and cedar scents. Each candle burns for approximately 40 hours. Perfect for relaxation or gifting.',
    price: 24.99,
    images: [
      'https://picsum.photos/seed/candle1/800/800',
      'https://picsum.photos/seed/candle2/800/800',
    ],
    category: 'Home & Kitchen',
    rating: 4.4,
    reviews: 612,
    inStock: true,
  },
]
