const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { faker } = require('@faker-js/faker');

// Load environment
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';

/**
 * Plants dataset for reference when seeding products
 */
const PLANTS_DATASET = [
  { name: 'Snake Plant', price: 95, category: 'Indoor', countInStock: 50 },
  { name: 'Peace Lily', price: 48, category: 'Indoor', countInStock: 60 },
  { name: 'Ficus', price: 80, category: 'Indoor', countInStock: 30 },
  { name: 'Pothos', price: 32, category: 'Indoor', countInStock: 120 },
  { name: 'Aloe Vera', price: 64, category: 'Indoor', countInStock: 40 },
  { name: 'ZZ Plant', price: 110, category: 'Indoor', countInStock: 25 },
  { name: 'Bougainvillea', price: 95, category: 'Outdoor', countInStock: 15 },
  { name: 'Jasmine', price: 48, category: 'Outdoor', countInStock: 35 },
  { name: 'Hibiscus', price: 80, category: 'Outdoor', countInStock: 30 },
  { name: 'Lavender', price: 32, category: 'Outdoor', countInStock: 80 },
  { name: 'Oleander', price: 64, category: 'Outdoor', countInStock: 20 },
  { name: 'Rose', price: 110, category: 'Outdoor', countInStock: 45 },
];

/**
 * Model loading strategy
 */
const MODEL_MAPPING = {
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

/**
 * Step 1: Load all models dynamically
 */
async function loadAllModels() {
  console.log('\n[LOADING] Importing all Mongoose models...');
  const models = {};
  const modelsPath = path.join(process.cwd(), 'models');

  for (const [file, modelName] of Object.entries(MODEL_MAPPING)) {
    const filePath = path.join(modelsPath, file);
    if (fs.existsSync(filePath)) {
      models[modelName] = require(filePath);
    }
  }

  console.log(`[LOADING] Loaded ${Object.keys(models).length} models`);
  return models;
}

/**
 * Step 2: Check collection status
 */
async function checkCollectionStatus(models) {
  console.log('\n[ANALYSIS] Checking existing data in collections...\n');

  const status = {};

  for (const [modelName, Model] of Object.entries(models)) {
    try {
      const count = await Model.countDocuments();
      status[modelName] = { count, exists: count > 0 };
    } catch (err) {
      status[modelName] = { count: 0, exists: false, error: err.message };
    }
  }

  return status;
}

/**
 * Step 3: Generate unique user data
 */
function generateNewUsers(existingCount = 0) {
  const count = Math.max(3, 5 - existingCount); // Ensure at least 5 total
  const users = [];
  const usedEmails = new Set();

  for (let i = 0; i < count; i++) {
    let email;
    let attempts = 0;
    do {
      email = `user${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}@example.com`;
      attempts++;
    } while (usedEmails.has(email) && attempts < 10);

    usedEmails.add(email);
    users.push({
      name: faker.person.fullName(),
      email,
      password: 'User@Secure123!',
      isAdmin: false,
      role: 'user',
      isVerified: faker.datatype.boolean({ probability: 0.8 }),
    });
  }

  return users;
}

/**
 * Step 4: Generate unique products
 */
function generateNewProducts(existingCount = 0, sellers = []) {
  if (sellers.length === 0) return [];

  const count = Math.max(5, 12 - existingCount); // Ensure at least 12 total
  const products = [];
  const usedNames = new Set();

  // Add more plants if needed
  const moreProducts = [
    { name: 'String of Pearls', price: 28, category: 'Indoor' },
    { name: 'Monstera Deliciosa', price: 75, category: 'Indoor' },
    { name: 'Calathea', price: 55, category: 'Indoor' },
    { name: 'Rubber Plant', price: 85, category: 'Indoor' },
    { name: 'Orchid', price: 45, category: 'Indoor' },
    { name: 'Bamboo Palm', price: 120, category: 'Indoor' },
    { name: 'Bird of Paradise', price: 95, category: 'Outdoor' },
    { name: 'Clematis', price: 50, category: 'Outdoor' },
    { name: 'Wisteria', price: 65, category: 'Outdoor' },
  ];

  const productNames = new Set(PLANTS_DATASET.map((p) => p.name));

  for (let i = 0; i < count; i++) {
    let plantData = moreProducts[i % moreProducts.length];
    if (usedNames.has(plantData.name)) continue;

    usedNames.add(plantData.name);

    products.push({
      seller: sellers[i % sellers.length]._id,
      name: plantData.name,
      description: `Beautiful ${plantData.name} plant - perfect for your home or garden`,
      price: plantData.price,
      basePrice: plantData.price,
      countInStock: faker.number.int({ min: 10, max: 100 }),
      category: plantData.category,
      images: [
        {
          url: `https://via.placeholder.com/300?text=${plantData.name.replace(/\s/g, '+')}&w=300&h=300`,
        },
      ],
      tags: [plantData.category.toLowerCase(), 'plant', 'indoor', 'outdoor'],
      variants: [
        {
          sku: `PLANT-${plantData.name.replace(/[^A-Za-z0-9]/g, '')}-${Date.now()}-${i}`,
          attributes: { type: 'standard', size: 'medium' },
          price: plantData.price,
          countInStock: faker.number.int({ min: 10, max: 100 }),
        },
      ],
      rating: faker.number.int({ min: 3, max: 5 }),
      numReviews: faker.number.int({ min: 0, max: 50 }),
      isFeatured: faker.datatype.boolean({ probability: 0.3 }),
      seoMetadata: {
        title: plantData.name,
        description: `Beautiful ${plantData.name} plant - perfect for ${plantData.category.toLowerCase()} spaces`,
      },
    });
  }

  return products;
}

/**
 * Step 5: Generate unique coupons
 */
function generateNewCoupons(existingCount = 0) {
  const count = Math.max(2, 5 - existingCount);
  const coupons = [];
  const usedCodes = new Set(['WELCOME10', 'SAVE20']);

  const discountTypes = ['PLANT', 'GREEN', 'NATURE', 'GROW', 'BLOOM', 'LEAF'];

  for (let i = 0; i < count; i++) {
    let code;
    do {
      const prefix = discountTypes[Math.floor(Math.random() * discountTypes.length)];
      const suffix = faker.number.int({ min: 10, max: 50 });
      code = `${prefix}${suffix}`;
    } while (usedCodes.has(code));

    usedCodes.add(code);

    coupons.push({
      code,
      type: faker.helpers.arrayElement(['percentage', 'fixed']),
      value: faker.number.int({ min: 5, max: 30 }),
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      minimumPurchase: faker.number.int({ min: 0, max: 100 }),
      maxUsage: faker.number.int({ min: 100, max: 1000 }),
      usedCount: 0,
      isActive: true,
    });
  }

  return coupons;
}

/**
 * Step 6: Generate newsletter subscribers
 */
function generateNewNewsletters(existingCount = 0) {
  const count = Math.max(5, 10 - existingCount);
  const newsletters = [];
  const usedEmails = new Set();

  for (let i = 0; i < count; i++) {
    let email;
    do {
      email = `subscriber${Date.now()}-${i}@example.com`;
    } while (usedEmails.has(email));

    usedEmails.add(email);
    newsletters.push({
      email,
      isSubscribed: true,
      subscribedAt: faker.date.past({ years: 1 }),
      unsubscribeToken: faker.string.uuid(),
    });
  }

  return newsletters;
}

/**
 * Step 7.1: Generate subcategories for each category
 */
function generateNewSubcategories(categories, existingCountMap = {}) {
  const subcategories = [];
  for (const cat of categories) {
    const existingForCat = existingCountMap[cat._id?.toString()] || 0;
    const need = Math.max(0, 2 - existingForCat); // ensure up to 2 per category
    for (let i = 0; i < need; i++) {
      subcategories.push({
        name: `${cat.name.split(' ')[0]} Sub ${i + 1}`,
        slug: `${cat.name.toLowerCase().replace(/\s+/g, '-')}-sub-${i + 1}`,
        description: `Subcategory ${i + 1} for ${cat.name}`,
        category: cat._id,
        isActive: true,
      });
    }
  }
  return subcategories;
}

/**
 * Step 7.2: Generate default tax entries
 */
function generateDefaultTaxes() {
  return [
    {
      name: 'Default VAT',
      region: 'EU',
      state: 'EU',
      rate: 15.0,
      type: 'vat',
      isDefault: true,
      isActive: true,
    },
    {
      name: 'US Sales Tax',
      region: 'USA',
      state: 'US',
      rate: 7.0,
      type: 'sales',
      isDefault: false,
      isActive: true,
    },
  ];
}

/**
 * Step 7.3: Generate carts for users without one
 */
function prepareCartForUser(user, products) {
  const items = [];
  const pickCount = Math.min(3, Math.max(1, Math.floor(Math.random() * 3) + 1));
  for (let i = 0; i < pickCount; i++) {
    const p = products[Math.floor(Math.random() * products.length)];
    if (!p) continue;
    items.push({
      product: p._id,
      name: p.name,
      qty: Math.floor(Math.random() * 3) + 1,
      price: p.price || p.basePrice || 0,
    });
  }
  const totalPrice = items.reduce((s, it) => s + it.qty * it.price, 0);
  return { user: user._id, items, totalPrice };
}

/**
 * Step 7.4: Generate support tickets
 */
function generateSupportTickets(users, products, count = 3) {
  const tickets = [];
  const statuses = ['open', 'in-progress', 'resolved', 'awaiting_response'];
  const priorities = ['low', 'medium', 'high'];
  const categories = ['order', 'product', 'shipping', 'technical', 'general'];

  for (let i = 0; i < count; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const product = products.length ? products[Math.floor(Math.random() * products.length)] : null;
    tickets.push({
      user: user._id,
      subject: `Issue ${Math.random().toString(36).slice(2, 8)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      messages: [
        {
          sender: user._id,
          message: `Hello, I need help regarding ${product ? product.name : 'my account'}`,
        },
      ],
      relatedProduct: product ? product._id : undefined,
    });
  }

  return tickets;
}

/**
 * Step 7.5: Generate analytics events
 */
function generateAnalyticsEvents(users, products, count = 20) {
  const events = [];
  const types = ['product_view', 'view', 'cart', 'purchase', 'wishlist', 'search', 'page_view'];
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const user = users.length ? users[Math.floor(Math.random() * users.length)] : null;
    const product = products.length ? products[Math.floor(Math.random() * products.length)] : null;
    events.push({
      eventType: type,
      product: product ? product._id : undefined,
      userId: user ? user._id : undefined,
      metadata: { sample: true },
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)),
      value: Math.floor(Math.random() * 100),
    });
  }
  return events;
}

/**
 * Step 7: Intelligently seed each collection
 */
async function intelligentSeed(models, status) {
  console.log('\n[SEEDING] Performing intelligent incremental seeding...\n');

  const results = {};

  // USERS: Check if we need to add more
  if (models.User) {
    const userCount = status.User?.count || 0;
    if (userCount < 5) {
      const newUsers = generateNewUsers(userCount);
      try {
        for (const userData of newUsers) {
          try {
            await models.User.create(userData);
          } catch (err) {
            // Skip duplicates
          }
        }
        const finalCount = await models.User.countDocuments();
        results.User = {
          status: '✅',
          message: `Found ${userCount}, added ${finalCount - userCount}, total: ${finalCount}`,
        };
      } catch (err) {
        results.User = {
          status: '⚠️',
          message: `Error seeding users: ${err.message.split('\n')[0]}`,
        };
      }
    } else {
      results.User = {
        status: '🟡',
        message: `Already populated with ${userCount} users, skipped`,
      };
    }
  }

  // PRODUCTS: Check if we need to add more
  if (models.Product && models.User) {
    const productCount = status.Product?.count || 0;
    const sellers = await models.User.find({ role: 'seller' }).limit(3);

    if (productCount < 12 && sellers.length > 0) {
      const newProducts = generateNewProducts(productCount, sellers);
      try {
        const inserted = await models.Product.insertMany(newProducts, { ordered: false });
        const finalCount = await models.Product.countDocuments();
        results.Product = {
          status: '✅',
          message: `Found ${productCount}, added ${inserted.length}, total: ${finalCount}`,
        };
      } catch (err) {
        const finalCount = await models.Product.countDocuments();
        results.Product = {
          status: '✅',
          message: `Found ${productCount}, added some, total: ${finalCount}`,
        };
      }
    } else {
      results.Product = {
        status: '🟡',
        message: `Already populated with ${productCount} products, skipped`,
      };
    }
  }

  // CATEGORIES: Check if we need to add more
  if (models.Category) {
    const categoryCount = status.Category?.count || 0;
    const categories = [
      'Indoor Plants',
      'Outdoor Plants',
      'Succulents',
      'Herbs',
      'Trees',
      'Flowering Plants',
      'Foliage Plants',
    ];

    if (categoryCount < 7) {
      const newCategories = categories.slice(categoryCount).map((name) => ({
        name,
        description: `Explore our ${name.toLowerCase()} collection`,
      }));

      try {
        for (const cat of newCategories) {
          try {
            await models.Category.create(cat);
          } catch (err) {
            // Skip duplicates
          }
        }
        const finalCount = await models.Category.countDocuments();
        results.Category = {
          status: '✅',
          message: `Found ${categoryCount}, added ${finalCount - categoryCount}, total: ${finalCount}`,
        };
      } catch (err) {
        results.Category = {
          status: '⚠️',
          message: `Error seeding categories: ${err.message.split('\n')[0]}`,
        };
      }
    } else {
      results.Category = {
        status: '🟡',
        message: `Already populated with ${categoryCount} categories, skipped`,
      };
    }
  }

  // SHIPPING METHODS: Check if we need to add more
  if (models.ShippingMethod) {
    const shippingCount = status.ShippingMethod?.count || 0;
    if (shippingCount < 3) {
      const shippingMethods = [
        { name: 'Standard Shipping', baseRate: 15, ratePerKg: 2, regions: ['USA', 'Canada'] },
        { name: 'Express Shipping', baseRate: 35, ratePerKg: 3, regions: ['USA', 'Canada', 'EU'] },
        { name: 'Eco Shipping', baseRate: 10, ratePerKg: 1.5, regions: ['Local'] },
      ];

      try {
        for (const method of shippingMethods) {
          try {
            await models.ShippingMethod.create({ ...method, isActive: true });
          } catch (err) {
            // Skip duplicates
          }
        }
        const finalCount = await models.ShippingMethod.countDocuments();
        results.ShippingMethod = {
          status: '✅',
          message: `Found ${shippingCount}, added ${finalCount - shippingCount}, total: ${finalCount}`,
        };
      } catch (err) {
        results.ShippingMethod = {
          status: '⚠️',
          message: `Error seeding shipping methods: ${err.message.split('\n')[0]}`,
        };
      }
    } else {
      results.ShippingMethod = {
        status: '🟡',
        message: `Already populated with ${shippingCount} shipping methods, skipped`,
      };
    }
  }

  // COUPONS: Check if we need to add more
  if (models.Coupon) {
    const couponCount = status.Coupon?.count || 0;
    if (couponCount < 5) {
      const newCoupons = generateNewCoupons(couponCount);
      try {
        const inserted = await models.Coupon.insertMany(newCoupons, { ordered: false });
        const finalCount = await models.Coupon.countDocuments();
        results.Coupon = {
          status: '✅',
          message: `Found ${couponCount}, added ${inserted.length}, total: ${finalCount}`,
        };
      } catch (err) {
        const finalCount = await models.Coupon.countDocuments();
        results.Coupon = {
          status: '✅',
          message: `Found ${couponCount}, some added, total: ${finalCount}`,
        };
      }
    } else {
      results.Coupon = {
        status: '🟡',
        message: `Already populated with ${couponCount} coupons, skipped`,
      };
    }
  }

  // NEWSLETTERS: Check if we need to add more
  if (models.Newsletter) {
    const newsletterCount = status.Newsletter?.count || 0;
    if (newsletterCount < 10) {
      const newNewsletters = generateNewNewsletters(newsletterCount);
      try {
        const inserted = await models.Newsletter.insertMany(newNewsletters, { ordered: false });
        const finalCount = await models.Newsletter.countDocuments();
        results.Newsletter = {
          status: '✅',
          message: `Found ${newsletterCount}, added ${inserted.length}, total: ${finalCount}`,
        };
      } catch (err) {
        const finalCount = await models.Newsletter.countDocuments();
        results.Newsletter = {
          status: '✅',
          message: `Found ${newsletterCount}, some added, total: ${finalCount}`,
        };
      }
    } else {
      results.Newsletter = {
        status: '🟡',
        message: `Already populated with ${newsletterCount} newsletters, skipped`,
      };
    }
  }

  // SUBCATEGORIES: create a couple per category if none exist
  if (models.Subcategory && models.Category) {
    const subCount = status.Subcategory?.count || 0;
    const categories = await models.Category.find();
    const subs = await models.Subcategory.find();
    const existingMap = {};
    for (const s of subs) existingMap[s.category?.toString()] = (existingMap[s.category?.toString()] || 0) + 1;

    if (subCount < categories.length * 1) {
      const newSubs = generateNewSubcategories(categories, existingMap);
      try {
        const inserted = await models.Subcategory.insertMany(newSubs, { ordered: false });
        const finalCount = await models.Subcategory.countDocuments();
        results.Subcategory = {
          status: '✅',
          message: `Found ${subCount}, added ${inserted.length}, total: ${finalCount}`,
        };
      } catch (err) {
        const finalCount = await models.Subcategory.countDocuments();
        results.Subcategory = {
          status: '✅',
          message: `Found ${subCount}, some added, total: ${finalCount}`,
        };
      }
    } else {
      results.Subcategory = { status: '🟡', message: `Already populated with ${subCount} subcategories, skipped` };
    }
  }

  // TAX: add default tax rules if empty
  if (models.Tax) {
    const taxCount = status.Tax?.count || 0;
    if (taxCount === 0) {
      const taxes = generateDefaultTaxes();
      try {
        const inserted = await models.Tax.insertMany(taxes, { ordered: false });
        const finalCount = await models.Tax.countDocuments();
        results.Tax = { status: '✅', message: `Found ${taxCount}, added ${inserted.length}, total: ${finalCount}` };
      } catch (err) {
        const finalCount = await models.Tax.countDocuments();
        results.Tax = { status: '✅', message: `Found ${taxCount}, some added, total: ${finalCount}` };
      }
    } else {
      results.Tax = { status: '🟡', message: `Already populated with ${taxCount} tax rules, skipped` };
    }
  }

  // CARTS: create carts for a few users without carts
  if (models.Cart && models.User && models.Product) {
    const cartCount = status.Cart?.count || 0;
    const users = await models.User.find({ role: 'user' }).limit(10);
    const products = await models.Product.find().limit(50);
    const usersWithCarts = await models.Cart.find().distinct('user');
    const toCreate = users.filter((u) => !usersWithCarts.map(String).includes(String(u._id))).slice(0, 3);
    if (toCreate.length > 0 && products.length > 0) {
      let created = 0;
      for (const u of toCreate) {
        const cartData = prepareCartForUser(u, products);
        try { await models.Cart.create(cartData); created++; } catch (err) { /* skip */ }
      }
      const finalCount = await models.Cart.countDocuments();
      results.Cart = { status: '✅', message: `Found ${cartCount}, added ${created}, total: ${finalCount}` };
    } else {
      results.Cart = { status: cartCount > 0 ? '🟡' : '📭', message: cartCount > 0 ? `${cartCount} documents found` : 'Empty collection' };
    }
  }

  // SUPPORT TICKETS
  if (models.SupportTicket && models.User) {
    const stCount = status.SupportTicket?.count || 0;
    const users = await models.User.find({ role: 'user' }).limit(10);
    const products = models.Product ? await models.Product.find().limit(50) : [];
    if (stCount < 3 && users.length > 0) {
      const toCreate = generateSupportTickets(users, products, 3 - stCount);
      let created = 0;
      for (const t of toCreate) {
        try { await models.SupportTicket.create(t); created++; } catch (err) { /* skip */ }
      }
      const finalCount = await models.SupportTicket.countDocuments();
      results.SupportTicket = { status: '✅', message: `Found ${stCount}, added ${created}, total: ${finalCount}` };
    } else {
      results.SupportTicket = { status: stCount > 0 ? '🟡' : '📭', message: stCount > 0 ? `${stCount} documents found` : 'Empty collection' };
    }
  }

  // ANALYTICS: create some event documents
  if (models.Analytics && models.User) {
    const anCount = status.Analytics?.count || 0;
    const users = await models.User.find().limit(20);
    const products = models.Product ? await models.Product.find().limit(50) : [];
    if (anCount < 20 && users.length > 0) {
      const events = generateAnalyticsEvents(users, products, 20 - anCount);
      try {
        const inserted = await models.Analytics.insertMany(events, { ordered: false });
        const finalCount = await models.Analytics.countDocuments();
        results.Analytics = { status: '✅', message: `Found ${anCount}, added ${inserted.length}, total: ${finalCount}` };
      } catch (err) {
        const finalCount = await models.Analytics.countDocuments();
        results.Analytics = { status: '✅', message: `Found ${anCount}, some added, total: ${finalCount}` };
      }
    } else {
      results.Analytics = { status: anCount > 0 ? '🟡' : '📭', message: anCount > 0 ? `${anCount} documents found` : 'Empty collection' };
    }
  }

  // Other collections: Just report status (skip those we already seeded above)
  const otherModels = [
    'Order',
    'Wishlist',
    'Return',
  ];
  for (const modelName of otherModels) {
    if (models[modelName]) {
      const count = status[modelName]?.count || 0;
      results[modelName] = {
        status: count > 0 ? '🟡' : '📭',
        message: count > 0 ? `${count} documents found` : 'Empty collection',
      };
    }
  }

  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║      INTELLIGENT INCREMENTAL SEEDING SYSTEM                ║');
  console.log('║      Smart data expansion while preserving existing data   ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  try {
    // Connect
    await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('\n[✓] Connected to MongoDB:', MONGO);

    // Load models
    const models = await loadAllModels();

    // Check status
    const status = await checkCollectionStatus(models);

    // Display current state
    console.log('Current collection state:');
    Object.entries(status).forEach(([name, info]) => {
      const icon = info.count > 0 ? '✓' : '○';
      console.log(`  ${icon} ${name.padEnd(20)}: ${info.count} documents`);
    });

    // Perform intelligent seeding
    const results = await intelligentSeed(models, status);

    // Display results
    console.log('\n[RESULTS] Seeding Summary:\n');
    Object.entries(results).forEach(([model, result]) => {
      console.log(`${result.status} ${model.padEnd(20)}: ${result.message}`);
    });

    // Final summary
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║           INCREMENTAL SEEDING COMPLETE ✓                   ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
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
