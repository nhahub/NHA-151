const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const Product = require('../models/productModel');
const User = require('../models/userModel');

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/depi-seed';

async function connect() {
  await mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const plants = [
  {
    name: 'Snake Plant',
    description:
      "The Snake Plant is known for its tall, sword-like green leaves edged in yellow. It's one of the easiest indoor plants to care for, perfect for beginners and busy people.",
    price: 95,
    category: 'Indoor',
    countInStock: 50,
    images: [
      {
        url: 'https://images.squarespace-cdn.com/content/v1/54fbb611e4b0d7c1e151d22a/1610074066643-OP8HDJUWUH8T5MHN879K/Snake+Plant.jpg?format=1000w',
      },
    ],
    tags: ['indoor', 'easy-care', 'air-purifying'],
  },
  {
    name: 'Peace Lily',
    description:
      'The Peace Lily features shiny green leaves and elegant white blooms that symbolize purity and tranquility. It thrives in indoor environments with moderate care.',
    price: 48,
    category: 'Indoor',
    countInStock: 60,
    images: [
      {
        url: 'https://www.mydomaine.com/thmb/N3StDx3PyGbF0Pwafv-P9-qiNZU=/900x0/filters:no_upscale():strip_icc()/1566417254329_20190821-1566417255317-b9314f1d9f7a4668a466c5ffb1913a8f.jpg',
      },
    ],
    tags: ['indoor', 'flowering'],
  },
  {
    name: 'Ficus',
    description:
      "Ficus is a small indoor tree with glossy green leaves that bring a fresh, natural vibe to your space. It's ideal for bright corners and home offices.",
    price: 80,
    category: 'Indoor',
    countInStock: 30,
    images: [
      { url: 'https://nurserylive.com/cdn/shop/products/nurserylive-g-ficus-benjamina-weeping-fig-plant-204240_512x512.jpg?v=1679750033' },
    ],
    tags: ['indoor', 'tree'],
  },
  {
    name: 'Pothos',
    description:
      'Pothos is a beautiful trailing vine with heart-shaped green leaves and yellow or white variegation. Perfect for hanging baskets or shelves.',
    price: 32,
    category: 'Indoor',
    countInStock: 120,
    images: [
      {
        url: 'https://media.houseandgarden.co.uk/photos/64bff5f4d6a55acd0397054e/1:1/w_1342,h_1342,c_limit/Screenshot%202023-07-25%20at%2017.17.10.png',
      },
    ],
    tags: ['indoor', 'trailing'],
  },
  {
    name: 'Aloe Vera',
    description:
      "Aloe Vera is a hardy succulent known for its healing gel. Its thick green leaves make it a stylish and practical plant for sunny spots.",
    price: 64,
    category: 'Indoor',
    countInStock: 40,
    images: [
      {
        url: 'https://cdn.shopify.com/s/files/1/0004/2654/1108/files/acheter-plante-aloe-vera-barbadensis-517144.jpg?v=1718903952',
      },
    ],
    tags: ['succulent', 'medicinal'],
  },
  {
    name: 'ZZ Plant',
    description:
      'The ZZ Plant features shiny dark green leaves and thrives on neglect. It’s one of the toughest indoor plants, perfect for any lighting conditions.',
    price: 110,
    category: 'Indoor',
    countInStock: 25,
    images: [
      { url: 'https://shopaltmanplants.com/cdn/shop/files/6IN_Foliage_Zamia_ZZ_Plant_Lifestyle_final_4.jpg?v=1741815498' },
    ],
    tags: ['low-maintenance', 'indoor'],
  },
  {
    name: 'Bougainvillea',
    description:
      'Bougainvillea is a vibrant climbing plant that bursts with colorful papery flowers in shades of pink, purple, and orange. Ideal for fences, balconies, or walls.',
    price: 95,
    category: 'Outdoor',
    countInStock: 15,
    images: [
      { url: 'https://eureka-farms.com/cdn/shop/files/Barbara_Karst_SSR.jpg?v=1758598426' },
    ],
    tags: ['outdoor', 'climbing'],
  },
  {
    name: 'Jasmine',
    description:
      'Jasmine is loved for its small white fragrant flowers that release a sweet aroma, especially at night. A classic choice for warm sunny gardens.',
    price: 48,
    category: 'Outdoor',
    countInStock: 35,
    images: [
      { url: 'https://florastore.com/cdn/shop/files/1511201_Closeup_03_MJ_SQ.jpg?v=1760145081&width=1080' },
    ],
    tags: ['fragrant', 'outdoor'],
  },
  {
    name: 'Hibiscus',
    description:
      'The Hibiscus produces large, showy tropical flowers in bright colors like red, pink, and yellow. It adds a tropical feel to any garden.',
    price: 80,
    category: 'Outdoor',
    countInStock: 30,
    images: [
      { url: 'https://m.media-amazon.com/images/I/71hNfU7o5kL._AC_UF1000,1000_QL80_.jpg' },
    ],
    tags: ['tropical', 'outdoor'],
  },
  {
    name: 'Lavender',
    description:
      "Lavender is a fragrant herb with soothing purple blooms and gray-green foliage. It’s known for its calming scent and mosquito-repelling properties.",
    price: 32,
    category: 'Outdoor',
    countInStock: 80,
    images: [
      { url: 'https://theseedcompany.ca/cdn/shop/files/cropLAVE0514Lavender_English.png?v=1701702553&width=1024' },
    ],
    tags: ['herb', 'fragrant'],
  },
  {
    name: 'Oleander',
    description:
      'Oleander is a hardy evergreen shrub with clusters of pink, red, or white flowers. It thrives in full sun and is highly drought-tolerant once mature.',
    price: 64,
    category: 'Outdoor',
    countInStock: 20,
    images: [
      { url: 'https://www.padmamnursery.com/cdn/shop/files/2.webp?v=1750314586&width=3840' },
    ],
    tags: ['shrub', 'outdoor'],
  },
  {
    name: 'Rose',
    description:
      'The Rose is the timeless symbol of beauty and love. With countless varieties and colors, roses add elegance and fragrance to any outdoor space.',
    price: 110,
    category: 'Outdoor',
    countInStock: 45,
    images: [
      {
        url: 'https://media.istockphoto.com/id/480348072/photo/roses-bush-on-garden-landscape.jpg?s=612x612&w=0&k=20&c=SMKff_uNNuJdWMPY7tK_EWQKcDL-h2QDNXTiQBh6iCk=',
      },
    ],
    tags: ['classic', 'outdoor'],
  },
];

async function run() {
  try {
    await connect();
    console.log('Connected to', MONGO);

    // Clear only Product collection per instructions
    console.log('Clearing Product collection...');
    await Product.deleteMany({});

    // Ensure a seller exists for required seller field
    let seller = await User.findOne({ email: 'seed-seller@example.com' });
    if (!seller) {
      seller = await User.create({
        name: 'Seed Seller',
        email: 'seed-seller@example.com',
        password: 'Seed@1234',
        isVerified: true,
      });
      console.log('Created seed seller:', seller.email);
    }

    // Map plants into Product model objects, adding a default variant with unique SKU
    const docs = plants.map((p, i) => ({
      seller: seller._id,
      name: p.name,
      description: p.description,
      price: p.price,
      countInStock: p.countInStock || 0,
      category: p.category,
      images: p.images || [],
      tags: p.tags || [],
      seoMetadata: p.seoMetadata || { title: p.name, description: (p.description || '').slice(0, 150) },
      variants: [
        {
          sku: `PLANT-${p.name.replace(/[^A-Za-z0-9]/g, '')}-${Date.now()}-${i}-${Math.floor(Math.random() * 1000)}`,
          attributes: { type: 'standard' },
          price: p.price,
          countInStock: p.countInStock || 0,
        },
      ],
    }));

    const created = await Product.create(docs);
    console.log(`Inserted ${created.length} products`);
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Connection closed');
  }
}

run();
