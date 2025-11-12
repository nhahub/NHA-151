# Developer Guide — DEPI Graduation Project Backend

This guide walks developers through setting up the backend locally, configuring the environment, seeding the database, and running tests.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Seeding Data](#seeding-data)
6. [Running the Server](#running-the-server)
7. [Testing](#testing)
8. [Common Issues & Troubleshooting](#common-issues--troubleshooting)
9. [Project Structure](#project-structure)
10. [API Documentation](#api-documentation)

---

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v16 or higher) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (v4.4 or higher)
  - **Option 1 (Local)**: [Download MongoDB Community Edition](https://www.mongodb.com/try/download/community)
  - **Option 2 (Cloud)**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **Git** (for version control)
- **Postman** or **Thunder Client** (for API testing, optional)

### Verify Installation

```bash
node --version
npm --version
mongod --version
git --version
```

---

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ahmedarafastudent-tech/DEPI-graduation-project-backend.git
cd DEPI-graduation-project-backend
```

### 2. Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json`, including:
- **Express** — Web framework
- **Mongoose** — MongoDB ODM
- **Faker.js** — Generate realistic test data
- **bcryptjs** — Password hashing
- **jsonwebtoken** — JWT authentication
- **dotenv** — Environment variable management
- **Jest** — Testing framework

### 3. Verify Installation

```bash
npm list
```

You should see all dependencies listed without errors.

---

## Environment Configuration

### 1. Create `.env` File

In the root directory, create a `.env` file:

```bash
cp .env.example .env  # if .env.example exists
```

Or create manually:

```bash
touch .env
```

### 2. Configure Environment Variables

Edit `.env` and add the following:

#### **Local MongoDB Setup**

```env
# Database
MONGO_URI=mongodb://localhost:27017/ecommerce
NODE_ENV=development

# JWT & Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Email Configuration (optional, for testing)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@depi-plants.com

# Server
PORT=5000

# PayTabs (Payment Gateway, optional)
PAYTABS_MERCHANT_EMAIL=your_merchant@email.com
PAYTABS_MERCHANT_PASS=your_password

# API Keys (optional)
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLIC_KEY=pk_test_xxx
```

#### **MongoDB Atlas (Cloud) Setup**

```env
# Database (Atlas)
MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/ecommerce?retryWrites=true&w=majority
NODE_ENV=development

# ... rest of config same as above
```

### 3. Important Notes

- **Never commit `.env`** — Add it to `.gitignore` (already done)
- **Use strong JWT secret** — Change `JWT_SECRET` to something unique in production
- **Protect credentials** — Store sensitive keys in a secure vault, not in code
- **Test credentials** — Use throwaway accounts for development

---

## Database Setup

### Option 1: Local MongoDB (Linux/macOS)

```bash
# Start MongoDB service (Linux)
sudo systemctl start mongod

# Or macOS with Homebrew
brew services start mongodb-community

# Verify MongoDB is running
mongosh  # opens MongoDB shell
```

Then run:

```bash
db.version()  # should return version number
exit
```

### Option 2: Local MongoDB (Windows)

```bash
# Start MongoDB service
net start MongoDB

# Or if installed as app, MongoDB should auto-start
# Verify
mongosh
```

### Option 3: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get the connection string
5. Add to `.env` as `MONGO_URI`

**Whitelist your IP:**
- Go to **Network Access** → **Add IP Address**
- Add your current IP or `0.0.0.0` (allow all)

---

## Seeding Data

The backend includes intelligent seeding scripts to populate your database with realistic test data.

### Available Seeders

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/seed.js` | Simple seeder — clears Products, inserts 12 plants | `npm run seed` |
| `scripts/seedIntelligent.js` | Comprehensive seeder — creates users, products, orders, etc. | `npm run seed:intelligent` |
| `scripts/seedIncremental.js` | Smart incremental — preserves existing data, adds missing items | `npm run seed:incremental` |

### Quick Start (Recommended)

**First Time Setup:**

```bash
# Start with incremental seeder (safest for fresh DB)
npm run seed:incremental
```

This will:
- ✅ Load all Mongoose models
- ✅ Check existing data
- ✅ Insert missing collections (users, products, categories, etc.)
- ✅ Generate realistic data using Faker.js
- ✅ Create relationships between entities (users ↔ products, carts ↔ items, etc.)

**Output Example:**

```
╔════════════════════════════════════════════════════════════╗
║      INTELLIGENT INCREMENTAL SEEDING SYSTEM                ║
║      Smart data expansion while preserving existing data   ║
╚════════════════════════════════════════════════════════════╝

[✓] Connected to MongoDB: mongodb://localhost:27017/ecommerce
[LOADING] Loaded 14 models

[ANALYSIS] Checking existing data in collections...

Current collection state:
  ○ User                : 0 documents
  ○ Product             : 0 documents
  ○ Category            : 0 documents
  ...

[SEEDING] Performing intelligent incremental seeding...

[RESULTS] Seeding Summary:
✅ User                : Found 0, added 10, total: 10
✅ Product             : Found 0, added 12, total: 12
✅ Category            : Found 0, added 7, total: 7
✅ Subcategory         : Found 0, added 14, total: 14
✅ Cart                : Found 0, added 3, total: 3
✅ Tax                 : Found 0, added 2, total: 2
✅ SupportTicket       : Found 0, added 3, total: 3
✅ Analytics           : Found 0, added 20, total: 20
...

╔════════════════════════════════════════════════════════════╗
║           INCREMENTAL SEEDING COMPLETE ✓                   ║
╚════════════════════════════════════════════════════════════╝
```

### Manual Seeding Steps

If you want more control:

```bash
# 1. Clear and reseed with plants dataset
npm run seed

# 2. If you want comprehensive data with relationships
npm run seed:intelligent

# 3. Expand existing database (safe, adds only what's missing)
npm run seed:incremental
```

### What Gets Seeded

After running the seeder, your database will have:

```
Users:              10 users (mixed roles: user, seller, admin)
Products:           12 plant products (with variants, prices, stock)
Categories:         7 categories (Indoor Plants, Outdoor, Succulents, etc.)
Subcategories:      14 (2 per category)
Coupons:            5 discount codes (WELCOME10, SAVE20, LEAF15, etc.)
Shipping Methods:   3 (Standard, Express, Eco)
Tax Rules:          2 (EU VAT 15%, US Sales Tax 7%)
Carts:              3-6 user carts (with items & calculated totals)
Support Tickets:    3 tickets (with statuses, priorities)
Analytics Events:   20 event logs (views, purchases, etc.)
Orders:             2 sample orders (with order items)
Wishlists:          2 user wishlists
Newsletters:        13 subscribers
```

### Verify Seeding Success

After running the seeder, verify counts:

```bash
npm run db:check
```

Or manually in MongoDB:

```bash
mongosh

# In mongosh shell
use ecommerce
db.users.countDocuments()          # should be 10
db.products.countDocuments()       # should be 12
db.categories.countDocuments()     # should be 7
db.subcategories.countDocuments()  # should be 14
```

---

## Running the Server

### 1. Start MongoDB (if local)

```bash
# Linux/macOS
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 2. Start the Backend Server

```bash
# Development mode (with hot reload)
npm run dev

# Or production mode
npm start
```

### Expected Output

```
[INFO] [app-name] Listening on port 5000
[INFO] Connected to MongoDB: mongodb://localhost:27017/ecommerce
[INFO] Database connection established successfully
```

### 3. Test the Server

Open your browser or Postman and make a test request:

```bash
GET http://localhost:5000/api/products
```

Expected response:

```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Snake Plant",
      "price": 95,
      "category": "Indoor Plants",
      ...
    }
  ]
}
```

---

## Testing

### Run All Tests

```bash
npm test
```

### Run Specific Test File

```bash
npm test -- __tests__/products.test.js
```

### Run with Coverage

```bash
npm test -- --coverage
```

### Example Test Output

```
PASS  __tests__/products.test.js
  Product Controller
    ✓ should fetch all products (45ms)
    ✓ should fetch product by ID (32ms)
    ✓ should create a new product (78ms)
    ✓ should update product (65ms)
    ✓ should delete product (41ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        2.345s
```

---

## API Documentation

### Authentication

Most endpoints require a JWT token. Get a token by logging in:

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "User@Secure123!"
}

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Use token in subsequent requests:

```bash
GET /api/products
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Key Endpoints

#### Products
```
GET    /api/products                    # List all products
GET    /api/products/:id                # Get product by ID
POST   /api/products                    # Create product (admin)
PUT    /api/products/:id                # Update product (admin)
DELETE /api/products/:id                # Delete product (admin)
```

#### Users
```
GET    /api/users                       # List users (admin)
GET    /api/users/:id                   # Get user profile
POST   /api/auth/register               # Register new user
POST   /api/auth/login                  # Login
PUT    /api/users/:id                   # Update profile
```

#### Orders
```
GET    /api/orders                      # List user's orders
GET    /api/orders/:id                  # Get order details
POST   /api/orders                      # Create order
```

#### Carts
```
GET    /api/cart                        # Get current user's cart
POST   /api/cart                        # Add item to cart
PUT    /api/cart/:itemId                # Update cart item
DELETE /api/cart/:itemId                # Remove from cart
```

See `docs/api.md` for complete API documentation.

---

## Common Issues & Troubleshooting

### Issue 1: MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
```bash
# Check if MongoDB is running
mongosh

# If not, start it
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
net start MongoDB  # Windows
```

### Issue 2: "Cannot find module" Error

```
Error: Cannot find module 'express'
```

**Solution:**
```bash
npm install
```

### Issue 3: Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000  # Linux/macOS
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # Linux/macOS
taskkill /PID <PID> /F  # Windows

# Or change port in .env
PORT=5001
```

### Issue 4: Seeding Fails with Validation Error

**Solution:**
```bash
# Clear database and reseed
npm run seed:incremental

# Or manually clear
mongosh
use ecommerce
db.users.deleteMany({})
db.products.deleteMany({})
# ... etc for other collections
```

### Issue 5: JWT Token Expired

**Solution:**
```bash
# Re-login to get new token
POST /api/auth/login
# Use new token in Authorization header
```

---

## Project Structure

```
├── models/                    # Mongoose schemas
│   ├── userModel.js
│   ├── productModel.js
│   ├── orderModel.js
│   └── ...
├── controllers/               # Business logic
│   ├── authController.js
│   ├── productController.js
│   └── ...
├── routes/                    # API endpoints
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── ...
├── middleware/                # Auth, validation, error handling
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── ...
├── config/                    # Configuration files
│   ├── db.js                  # Database connection
│   ├── swagger.js             # API docs
│   └── ...
├── utils/                     # Helper functions
│   ├── sendEmail.js
│   ├── fileUpload.js
│   └── ...
├── scripts/                   # Seeding & automation
│   ├── seed.js
│   ├── seedIntelligent.js
│   └── seedIncremental.js
├── __tests__/                 # Test files
│   ├── products.test.js
│   ├── auth.test.js
│   └── ...
├── docs/                      # Documentation
│   ├── api.md
│   ├── SEEDING.md
│   └── ...
├── .env                       # Environment variables (DO NOT COMMIT)
├── package.json               # Dependencies & scripts
├── index.js                   # Entry point
└── README.md                  # Project overview
```

---

## npm Scripts

```bash
npm start              # Run server in production mode
npm run dev            # Run server in development mode (hot reload)
npm test               # Run all tests
npm run seed           # Simple seeder (plants only)
npm run seed:intelligent  # Comprehensive seeder
npm run seed:incremental  # Smart incremental seeder
npm run db:check       # Check database collection counts
npm run lint           # Run linter (if configured)
```

---

## Database Backup & Restore

### Backup MongoDB (Local)

```bash
# Create backup
mongodump --db ecommerce --out ./backup

# Restore from backup
mongorestore --db ecommerce ./backup/ecommerce
```

### Export/Import Collections

```bash
# Export to JSON
mongoexport --db ecommerce --collection products --out products.json

# Import from JSON
mongoimport --db ecommerce --collection products --file products.json
```

---

## Git Workflow

### Before Pushing Code

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes, then stage
git add .

# Commit with clear message
git commit -m "feat: add new endpoint for X"

# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Never Commit

- `.env` file (credentials)
- `node_modules/` folder
- `*.log` files
- Database backups

These are already in `.gitignore`.

---

## Performance Tips

1. **Use Indexes** — Models have indexes on frequently queried fields
2. **Pagination** — Always paginate large result sets
3. **Caching** — Use Redis (if configured) for frequently accessed data
4. **Query Optimization** — Use `.select()` to fetch only needed fields
5. **Connection Pooling** — Mongoose handles this automatically

---

## Security Best Practices

1. **Never expose `.env`** — Keep credentials safe
2. **Validate input** — All endpoints validate incoming data
3. **Use HTTPS** — Always in production
4. **Rate limiting** — Consider adding to production
5. **CORS** — Configured for frontend domain
6. **Password hashing** — Uses bcryptjs (never store plain passwords)

---

## Getting Help

- **API Documentation**: `docs/api.md`
- **Seeding Guide**: `docs/SEEDING.md`
- **Project Status**: `PROJECT_STATUS.md`
- **Issues**: Check GitHub issues or create a new one
- **Slack/Discord**: Ask in team channels

---

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Configure `.env` file
3. ✅ Start MongoDB
4. ✅ Seed database: `npm run seed:incremental`
5. ✅ Start server: `npm run dev`
6. ✅ Test endpoints: `http://localhost:5000/api/products`
7. ✅ Read API docs: `docs/api.md`

---

**Happy coding! 🚀**

If you have questions, reach out to the team or check the documentation in `docs/`.
