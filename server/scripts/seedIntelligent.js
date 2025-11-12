const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

// Load environment
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';

/**
 * PLANTS DATASET - CORE PRODUCT DATA
 */
const PLANTS_DATASET = [
  {
    name: 'Snake Plant',
    description: "The Snake Plant is known for its tall, sword-like green leaves edged in yellow. It's one of the easiest indoor plants to care for, perfect for beginners and busy people.",
    price: 95,
    category: 'Indoor',
    countInStock: 50,
    images: [{ url: 'https://images.squarespace-cdn.com/content/v1/54fbb611e4b0d7c1e151d22a/1610074066643-OP8HDJUWUH8T5MHN879K/Snake+Plant.jpg?format=1000w' }],
    tags: ['indoor', 'easy-care', 'air-purifying'],
  },
  {
    name: 'Peace Lily',
    description: 'The Peace Lily features shiny green leaves and elegant white blooms that symbolize purity and tranquility. It thrives in indoor environments with moderate care.',
    price: 48,
    category: 'Indoor',
    countInStock: 60,
    images: [{ url: 'https://www.mydomaine.com/thmb/N3StDx3PyGbF0Pwafv-P9-qiNZU=/900x0/filters:no_upscale():strip_icc()/1566417254329_20190821-1566417255317-b9314f1d9f7a4668a466c5ffb1913a8f.jpg' }],
    tags: ['indoor', 'flowering'],
  },
  {
    name: 'Ficus',
    description: "Ficus is a small indoor tree with glossy green leaves that bring a fresh, natural vibe to your space. It's ideal for bright corners and home offices.",
    price: 80,
    category: 'Indoor',
    countInStock: 30,
    images: [{ url: 'https://nurserylive.com/cdn/shop/products/nurserylive-g-ficus-benjamina-weeping-fig-plant-204240_512x512.jpg?v=1679750033' }],
    tags: ['indoor', 'tree'],
  },
  {
    name: 'Pothos',
    description: 'Pothos is a beautiful trailing vine with heart-shaped green leaves and yellow or white variegation. Perfect for hanging baskets or shelves.',
    price: 32,
    category: 'Indoor',
    countInStock: 120,
    images: [{ url: 'https://media.houseandgarden.co.uk/photos/64bff5f4d6a55acd0397054e/1:1/w_1342,h_1342,c_limit/Screenshot%202023-07-25%20at%2017.17.10.png' }],
    tags: ['indoor', 'trailing'],
  },
  {
    name: 'Aloe Vera',
    description: "Aloe Vera is a hardy succulent known for its healing gel. Its thick green leaves make it a stylish and practical plant for sunny spots.",
    price: 64,
    category: 'Indoor',
    countInStock: 40,
    images: [{ url: 'https://cdn.shopify.com/s/files/1/0004/2654/1108/files/acheter-plante-aloe-vera-barbadensis-517144.jpg?v=1718903952' }],
    tags: ['succulent', 'medicinal'],
  },
  {
    name: 'ZZ Plant',
    description: 'The ZZ Plant features shiny dark green leaves and thrives on neglect. It\'s one of the toughest indoor plants, perfect for any lighting conditions.',
    price: 110,
    category: 'Indoor',
    countInStock: 25,
    images: [{ url: 'https://shopaltmanplants.com/cdn/shop/files/6IN_Foliage_Zamia_ZZ_Plant_Lifestyle_final_4.jpg?v=1741815498' }],
    tags: ['low-maintenance', 'indoor'],
  },
  {
    name: 'Bougainvillea',
    description: 'Bougainvillea is a vibrant climbing plant that bursts with colorful papery flowers in shades of pink, purple, and orange. Ideal for fences, balconies, or walls.',
    price: 95,
    category: 'Outdoor',
    countInStock: 15,
    images: [{ url: 'https://eureka-farms.com/cdn/shop/files/Barbara_Karst_SSR.jpg?v=1758598426' }],
    tags: ['outdoor', 'climbing'],
  },
  {
    name: 'Jasmine',
    description: 'Jasmine is loved for its small white fragrant flowers that release a sweet aroma, especially at night. A classic choice for warm sunny gardens.',
    price: 48,
    category: 'Outdoor',
    countInStock: 35,
    images: [{ url: 'https://florastore.com/cdn/shop/files/1511201_Closeup_03_MJ_SQ.jpg?v=1760145081&width=1080' }],
    tags: ['fragrant', 'outdoor'],
  },
  {
    name: 'Hibiscus',
    description: 'The Hibiscus produces large, showy tropical flowers in bright colors like red, pink, and yellow. It adds a tropical feel to any garden.',
    price: 80,
    category: 'Outdoor',
    countInStock: 30,
    images: [{ url: 'https://m.media-amazon.com/images/I/71hNfU7o5kL._AC_UF1000,1000_QL80_.jpg' }],
    tags: ['tropical', 'outdoor'],
  },
  {
    name: 'Lavender',
    description: "Lavender is a fragrant herb with soothing purple blooms and gray-green foliage. It's known for its calming scent and mosquito-repelling properties.",
    price: 32,
    category: 'Outdoor',
    countInStock: 80,
    images: [{ url: 'https://theseedcompany.ca/cdn/shop/files/cropLAVE0514Lavender_English.png?v=1701702553&width=1024' }],
    tags: ['herb', 'fragrant'],
  },
  {
    name: 'Oleander',
    description: 'Oleander is a hardy evergreen shrub with clusters of pink, red, or white flowers. It thrives in full sun and is highly drought-tolerant once mature.',
    price: 64,
    category: 'Outdoor',
    countInStock: 20,
    images: [{ url: 'https://www.padmamnursery.com/cdn/shop/files/2.webp?v=1750314586&width=3840' }],
    tags: ['shrub', 'outdoor'],
  },
  {
    name: 'Rose',
    description: 'The Rose is the timeless symbol of beauty and love. With countless varieties and colors, roses add elegance and fragrance to any outdoor space.',
    price: 110,
    category: 'Outdoor',
    countInStock: 45,
    images: [{ url: 'https://media.istockphoto.com/id/480348072/photo/roses-bush-on-garden-landscape.jpg?s=612x612&w=0&k=20&c=SMKff_uNNuJdWMPY7tK_EWQKcDL-h2QDNXTiQBh6iCk=' }],
    tags: ['classic', 'outdoor'],
  },
];

/**
 * STEP 1: Project Analysis
 * Recursively discover and analyze all model files
 */
async function analyzeProject() {
  console.log('\n[ANALYSIS] Discovering project structure...');
  const modelsPath = path.join(process.cwd(), 'models');
  const files = fs.readdirSync(modelsPath).filter(f => f.endsWith('Model.js'));
  
  const discovered = {
    models: {},
    dependencies: {
      User: [],
      Category: [],
      Subcategory: ['Category'],
      Product: ['User', 'Category', 'Subcategory'],
      Order: ['User', 'Product'],
      Coupon: ['Product', 'Category'],
      Wishlist: ['User', 'Product'],
      Cart: ['User', 'Product'],
      Tax: [],
      ShippingMethod: [],
      Newsletter: [],
      SupportTicket: ['User', 'Product'],
      Return: ['Order', 'User'],
      Analytics: ['Product', 'Order'],
    }
  };
  
  console.log(`[ANALYSIS] Found ${files.length} model files:`, files.map(f => f.replace('Model.js', '')).join(', '));
  return discovered;
}

/**
 * STEP 2: Dynamic Model Loading
 */
async function loadModels() {
  console.log('\n[LOADING] Importing Mongoose models...');
  const models = {};
  const modelsPath = path.join(process.cwd(), 'models');
  const files = fs.readdirSync(modelsPath).filter(f => f.endsWith('Model.js'));
  
  // Map of filename patterns to expected Mongoose model names
  const fileToModelName = {
    'userModel.js': 'User',
    'productModel.js': 'Product',
    'categoryModel.js': 'Category',
    'subcategoryModel.js': 'Subcategory',
    'orderModel.js': 'Order',
    'couponModel.js': 'Coupon',
    'cartModel.js': 'Cart',
    'wishlistModel.js': 'Wishlist',
    'shippingModel.js': 'ShippingMethod',
    'taxModel.js': 'Tax',
    'newsletterModel.js': 'Newsletter',
    'supportTicketModel.js': 'SupportTicket',
    'returnModel.js': 'Return',
    'analyticsModel.js': 'Analytics',
  };
  
  for (const file of files) {
    const modelName = fileToModelName[file];
    if (modelName) {
      const ModelClass = require(path.join(modelsPath, file));
      models[modelName] = ModelClass;
    }
  }
  
  console.log(`[LOADING] Loaded ${Object.keys(models).length} models: ${Object.keys(models).join(', ')}`);
  return models;
}

/**
 * STEP 3: Intelligent Data Generation
 */
function generateSeedData(models) {
  console.log('\n[GENERATION] Creating realistic seed data with Faker.js...');
  
  const data = {};
  
  // Users: 1 admin, 3 sellers, 8 regular customers (ensure unique emails)
  const usedEmails = new Set();
  const generateUniqueEmail = () => {
    let email;
    let attempts = 0;
    do {
      email = faker.internet.email();
      attempts++;
    } while (usedEmails.has(email) && attempts < 100);
    usedEmails.add(email);
    return email;
  };
  
  data.User = [
    {
      name: 'Admin Manager',
      email: 'admin.plants@example.com',
      password: 'Admin@Secure123!',
      isAdmin: true,
      role: 'admin',
      isVerified: true,
    },
    {
      name: 'Green Earth Nursery',
      email: 'seller.green@example.com',
      password: 'Seller@Secure123!',
      isAdmin: false,
      role: 'seller',
      isVerified: true,
    },
    {
      name: 'Urban Garden Co',
      email: 'seller.urban@example.com',
      password: 'Seller@Secure123!',
      isAdmin: false,
      role: 'seller',
      isVerified: true,
    },
    {
      name: 'Botanical Paradise',
      email: 'seller.botanical@example.com',
      password: 'Seller@Secure123!',
      isAdmin: false,
      role: 'seller',
      isVerified: true,
    },
  ];
  
  // Add generated regular users
  // Generate validator-compliant user names (ASCII letters, numbers, spaces, hyphens)
  const makeValidName = () => {
    const first = faker.person.firstName();
    const last = faker.person.lastName();
    // Strip any characters not allowed by the User model validator
    const clean = (s) => s.replace(/[^A-Za-z0-9\s-]/g, '').trim();
    const combined = `${clean(first)} ${clean(last)}`.replace(/\s+/g, ' ').trim();
    return combined.length >= 2 ? combined : `User ${Math.floor(Math.random() * 9000) + 1000}`;
  };

  for (let i = 0; i < 8; i++) {
    data.User.push({
      name: makeValidName(),
      email: `customer${i + 1}@example.com`, // Use predictable emails to avoid duplicates
      password: 'User@Secure123!',
      isAdmin: false,
      role: 'user',
      isVerified: faker.datatype.boolean({ probability: 0.8 }),
    });
  }
  
  // Categories
  data.Category = [
    { name: 'Indoor Plants', description: 'Beautiful plants perfect for indoor spaces' },
    { name: 'Outdoor Plants', description: 'Hardy plants for gardens and patios' },
    { name: 'Succulents', description: 'Low-maintenance succulent plants' },
  ];
  
  // Subcategories (depends on categories)
  data.Subcategory = [
    { name: 'Air-Purifying', description: 'Plants that clean indoor air' },
    { name: 'Flowering', description: 'Plants with beautiful blooms' },
    { name: 'Trailing Vines', description: 'Perfect for hanging baskets' },
    { name: 'Climbing Plants', description: 'Plants for trellises and walls' },
    { name: 'Medicinal Herbs', description: 'Herbs with health benefits' },
    { name: 'Low-Light Tolerant', description: 'Plants that thrive in shade' },
    { name: 'Fast-Growing', description: 'Quick growing varieties' },
  ];
  
  // Tax rates
  data.Tax = [
    { name: 'Standard Tax', rate: 0.15, description: 'Standard VAT rate' },
    { name: 'Reduced Tax', rate: 0.05, description: 'Reduced rate for essentials' },
  ];
  
  // Shipping Methods
  data.ShippingMethod = [
    {
      name: 'Standard Shipping',
      carrier: 'Local Courier',
      baseRate: 15,
      ratePerKg: 2,
      regions: ['USA', 'Canada', 'EU'],
      estimatedDaysRange: { min: 5, max: 10 },
      isActive: true,
    },
    {
      name: 'Express Shipping',
      carrier: 'Fast Logistics',
      baseRate: 35,
      ratePerKg: 3,
      regions: ['USA', 'Canada', 'EU', 'Asia'],
      estimatedDaysRange: { min: 2, max: 5 },
      isActive: true,
    },
    {
      name: 'Eco Shipping',
      carrier: 'Green Delivery',
      baseRate: 10,
      ratePerKg: 1.5,
      regions: ['Local'],
      estimatedDaysRange: { min: 7, max: 14 },
      isActive: true,
    },
  ];
  
  // Coupons
  data.Coupon = [
    {
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      minimumPurchase: 50,
      maxUsage: 1000,
      isActive: true,
    },
    {
      code: 'SAVE20',
      type: 'fixed',
      value: 20,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      minimumPurchase: 100,
      maxUsage: 500,
      isActive: true,
    },
  ];
  
  // Newsletter
  data.Newsletter = Array.from({ length: 8 }, () => ({
    email: faker.internet.email(),
    isSubscribed: true,
    subscribedAt: faker.date.past({ years: 1 }),
    unsubscribeToken: faker.string.uuid(),
  }));
  
  console.log(`[GENERATION] Generated seed data structure (${Object.keys(data).length} entity types)`);
  return data;
}

/**
 * STEP 4: Hash passwords and prepare data for insertion
 */
async function prepareDataForInsertion(data) {
  console.log('\n[PREPARATION] Hashing passwords and normalizing data...');
  
  // Hash user passwords - don't hash the data here, let Mongoose do it via pre-save hooks
  // Just ensure password fields are not undefined
  if (data.User) {
    for (const user of data.User) {
      // Password should stay as plain text - Mongoose will hash it on save
      if (!user.password) {
        user.password = 'Default@123!';
      }
    }
  }
  
  console.log('[PREPARATION] Data prepared for insertion');
  return data;
}

/**
 * STEP 5: Clear collections in dependency order
 */
async function clearCollections(models) {
  console.log('\n[CLEARING] Removing existing data from collections...');
  
  const clearOrder = [
    'Order', 'Cart', 'Wishlist', 'Return', 'Analytics', 
    'SupportTicket', 'Coupon', 'Product', 'Subcategory', 
    'Category', 'ShippingMethod', 'Tax', 'Newsletter', 'User'
  ];
  
  let clearedCount = 0;
  for (const modelName of clearOrder) {
    if (models[modelName]) {
      try {
        const result = await models[modelName].deleteMany({});
        if (result.deletedCount > 0) {
          console.log(`  [✓] Cleared ${modelName} (${result.deletedCount} documents)`);
          clearedCount++;
        }
      } catch (err) {
        console.log(`  [!] Warning clearing ${modelName}: ${err.message.split('\n')[0]}`);
      }
    }
  }
  
  console.log(`[CLEARING] Cleared ${clearedCount} collections`);
}

/**
 * STEP 6: Insert data in correct dependency order
 */
async function insertData(models, seedData) {
  console.log('\n[INSERTION] Inserting seed data in dependency order...');
  
  const insertOrder = [
    'User', 'Tax', 'ShippingMethod', 'Newsletter',
    'Category', 'Subcategory', 'Coupon', 'Product',
    'Order', 'Cart', 'Wishlist', 'SupportTicket', 'Return', 'Analytics'
  ];
  
  const inserted = {};
  
  for (const modelName of insertOrder) {
    if (!seedData[modelName] || seedData[modelName].length === 0) continue;
    
    const Model = models[modelName];
    if (!Model) {
      console.log(`  [!] Skipped ${modelName} (model not found)`);
      continue;
    }
    
    try {
      if (modelName === 'User') {
        console.log(`  [⏳] Attempting to insert ${seedData[modelName].length} users...`);
        // Insert users one by one for better error handling
        let successCount = 0;
        for (const userData of seedData[modelName]) {
          try {
            await Model.create(userData);
            successCount++;
          } catch (err) {
            // Silently skip duplicate or validation errors for individual users
            console.log(`      [Skip] ${userData.email}: ${err.message.split('\n')[0].substring(0, 60)}`);
          }
        }
        inserted[modelName] = successCount;
        console.log(`  [✓] Inserted ${modelName}: ${successCount} documents`);
        continue;
      }
      // Special handling for Subcategory: attach a category ObjectId (required by schema)
      if (modelName === 'Subcategory') {
        const Category = models.Category;
        const categories = await Category.find();
        if (!categories || categories.length === 0) {
          console.log('  [!] No categories available to link Subcategories to. Skipping Subcategory insertion.');
          inserted[modelName] = 0;
          continue;
        }
        const docs = seedData[modelName].map(d => ({
          ...d,
          category: categories[Math.floor(Math.random() * categories.length)]._id,
        }));
        const result = await Model.insertMany(docs, { ordered: false });
        inserted[modelName] = result.length;
        console.log(`  [✓] Inserted ${modelName}: ${result.length} documents`);
        continue;
      }

      // Special handling for Tax: ensure required 'region' and 'type' fields exist
      if (modelName === 'Tax') {
        const docs = seedData[modelName].map(d => ({
          region: d.region || 'USA',
          name: d.name || 'Standard Tax',
          rate: (typeof d.rate === 'number') ? d.rate * (d.rate < 1 ? 100 : 1) : 0,
          type: d.type || 'percentage',
          description: d.description || '',
          isDefault: !!d.isDefault,
        }));
        const result = await Model.insertMany(docs, { ordered: false });
        inserted[modelName] = result.length;
        console.log(`  [✓] Inserted ${modelName}: ${result.length} documents`);
        continue;
      }

      const result = await Model.insertMany(seedData[modelName], { ordered: false });
      inserted[modelName] = result.length;
      console.log(`  [✓] Inserted ${modelName}: ${result.length} documents`);
    } catch (err) {
      // Check if this is a partial insert error (some docs inserted despite errors)
      if (err.insertedDocs && err.insertedDocs.length > 0) {
        inserted[modelName] = err.insertedDocs.length;
        console.log(`  [✓] Inserted ${modelName}: ${err.insertedDocs.length} documents (with ${err.writeErrors?.length || 0} errors)`);
      } else {
        console.error(`  [✗] Error inserting ${modelName}:`, err.message.split('\n')[0]);
      }
    }
  }
  
  return inserted;
}

/**
 * STEP 7: Insert Plants Products (special handling with seller references)
 */
async function insertPlantProducts(models, seedData) {
  console.log('\n[PLANTS] Inserting plant products with seller references...');
  
  const User = models.User;
  const Product = models.Product;
  const Category = models.Category;
  
  // Get sellers
  const sellers = await User.find({ role: 'seller' }).limit(2);
  const categories = await Category.find();
  
  if (sellers.length === 0) {
    console.log('  [!] No sellers found, skipping plant products');
    return;
  }
  
  const products = PLANTS_DATASET.map((plant, index) => ({
    seller: sellers[index % sellers.length]._id,
    name: plant.name,
    description: plant.description,
    price: plant.price,
    basePrice: plant.price,
    countInStock: plant.countInStock,
    category: plant.category,
    images: plant.images,
    tags: plant.tags,
    variants: [
      {
        sku: `PLANT-${plant.name.replace(/[^A-Za-z0-9]/g, '')}-${Date.now()}-${index}`,
        attributes: { type: 'standard', size: 'medium' },
        price: plant.price,
        countInStock: plant.countInStock,
      }
    ],
    rating: faker.number.int({ min: 3, max: 5 }),
    numReviews: faker.number.int({ min: 0, max: 50 }),
    isFeatured: faker.datatype.boolean({ probability: 0.3 }),
    seoMetadata: {
      title: plant.name,
      description: plant.description.slice(0, 160),
    }
  }));
  
  try {
    const result = await Product.insertMany(products, { ordered: false });
    console.log(`  [✓] Inserted Products: ${result.length} plant products`);
    return result;
  } catch (err) {
    console.error(`  [✗] Error inserting plant products:`, err.message.split('\n')[0]);
  }
}

/**
 * STEP 8: Generate and insert additional data (orders, reviews, etc.)
 */
async function insertAdditionalData(models, seedData) {
  console.log('\n[ADDITIONAL] Generating additional relationships...');
  
  const User = models.User;
  const Product = models.Product;
  const Order = models.Order;
  const Wishlist = models.Wishlist;
  const Review = models.Review;
  
  const users = await User.find({ role: 'user' }).limit(5);
  const products = await Product.find().limit(5);
  
  if (users.length === 0 || products.length === 0) {
    console.log('  [!] Not enough users/products for additional data');
    return;
  }
  
  // Create a couple of orders
  let ordersCreated = 0;
  for (const user of users.slice(0, 2)) {
    const orderItems = products.slice(0, 2).map(product => ({
      product: product._id,
      name: product.name,
      qty: faker.number.int({ min: 1, max: 3 }),
      price: product.price,
      image: product.images?.[0]?.url || '',
    }));
    
    const itemsPrice = orderItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const taxPrice = itemsPrice * 0.15;
    const shippingPrice = 25;
    
    try {
      const order = await Order.create({
        user: user._id,
        orderItems,
        shippingAddress: {
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          postalCode: faker.location.zipCode(),
          country: 'USA',
        },
        paymentMethod: 'paytabs',
        itemsPrice: parseFloat(itemsPrice.toFixed(2)),
        taxPrice: parseFloat(taxPrice.toFixed(2)),
        shippingPrice,
        totalPrice: parseFloat((itemsPrice + taxPrice + shippingPrice).toFixed(2)),
        isPaid: true,
        paidAt: new Date(),
      });
      ordersCreated++;
    } catch (err) {
      console.log(`  [!] Error creating order: ${err.message.split('\n')[0]}`);
    }
  }
  console.log(`  [✓] Created ${ordersCreated} sample orders`);
  
  // Add wishlist items (check for duplicates before inserting)
  let wishlistCreated = 0;
  for (const user of users.slice(0, 2)) {
    for (const product of products.slice(0, 2)) {
      const existing = await Wishlist.findOne({ user: user._id, product: product._id });
      if (!existing) {
        try {
          await Wishlist.create({ user: user._id, product: product._id });
          wishlistCreated++;
        } catch (err) {
          // Ignore duplicate errors
        }
      }
    }
  }
  console.log(`  [✓] Created ${wishlistCreated} wishlist items`);
}

/**
 * STEP 9: Main execution flow
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║     INTELLIGENT SEEDING SYSTEM FOR PLANTS ECOMMERCE        ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('\n[✓] Connected to MongoDB:', MONGO);
    
    // Step 1: Analyze project
    const analysis = await analyzeProject();
    
    // Step 2: Load all models
    const models = await loadModels();
    
    // Step 3: Generate seed data
    const seedData = generateSeedData(models);
    
    // Step 4: Prepare data (hash passwords, etc.)
    const preparedData = await prepareDataForInsertion(seedData);
    
    // Step 5: Clear existing collections
    await clearCollections(models);
    
    // Step 6: Insert base data (users, categories, shipping, etc.)
    const insertedCounts = await insertData(models, preparedData);
    
    // Step 7: Insert plant products (with seller/category refs)
    await insertPlantProducts(models, preparedData);
    
    // Step 8: Generate additional relationships
    await insertAdditionalData(models, preparedData);
    
    // Summary
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                    SEEDING COMPLETE ✓                       ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('\nSummary of inserted documents:');
    Object.entries(insertedCounts).forEach(([model, count]) => {
      console.log(`  ${model.padEnd(20)} : ${count} documents`);
    });
    console.log('\nYour database is now populated with realistic seed data!');
    console.log('Ready for development and testing.\n');
    
  } catch (err) {
    console.error('\n[ERROR] Seeding failed:', err.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('[✓] Database connection closed\n');
  }
}

// Execute
main();
