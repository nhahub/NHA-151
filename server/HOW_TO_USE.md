# Backend Setup & Usage — Summary for Developers

This document summarizes how developers can get the backend running and use it for development.

---

## 🚀 Quick Start (10 Minutes)

### 1. Clone & Install
```bash
git clone https://github.com/ahmedarafastudent-tech/DEPI-graduation-project-backend.git
cd DEPI-graduation-project-backend
npm install
```

### 2. Create `.env`
```env
MONGO_URI=mongodb://localhost:27017/ecommerce
NODE_ENV=development
JWT_SECRET=dev_secret_change_in_production
PORT=5000
```

### 3. Start MongoDB
```bash
# Linux/macOS
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 4. Seed Database
```bash
npm run seed:incremental
```

### 5. Start Server
```bash
npm run dev
```

✅ **Done!** Server running on `http://localhost:5000`

---

## 📚 Full Documentation Files

### For Developers
- **`DEVELOPER_GUIDE.md`** — Complete setup, testing, API docs
- **`QUICK_SETUP.md`** — 10-minute checklist
- **`docs/SEEDING.md`** — Detailed seeding strategies

### For Project Overview
- **`README.md`** — Project description
- **`PROJECT_STATUS.md`** — Current state & stats
- **`docs/api.md`** — Full API endpoint reference

---

## 💾 Seeding Strategies

### For First Time
```bash
npm run seed:incremental  # Safe, preserves existing data
```
Creates: 10 users, 12 products, 7 categories, etc.

### For Fresh Start
```bash
npm run seed  # Simple: 12 plants only
```

### For Complete Reset
```bash
npm run seed:intelligent  # Everything with relationships
```

---

## 🔌 Database Connection

### Local MongoDB (Default)
```
mongodb://localhost:27017/ecommerce
```
- Start: `sudo systemctl start mongod` (Linux/macOS) or `net start MongoDB` (Windows)
- Check: `mongosh` in terminal

### MongoDB Atlas (Cloud)
- Create account: https://www.mongodb.com/cloud/atlas
- Replace `MONGO_URI` in `.env` with your connection string
- Whitelist IP in Network Access

---

## 🧪 Testing

```bash
npm test                        # Run all tests
npm test -- --coverage          # With coverage report
npm test -- __tests__/auth.test.js  # Specific test file
```

---

## 📡 API Endpoints (Examples)

### Authentication
```bash
POST   /api/auth/login              # Get JWT token
POST   /api/auth/register           # Create account
GET    /api/users/:id               # Get user profile
```

### Products
```bash
GET    /api/products                # List all
GET    /api/products/:id            # Get one
POST   /api/products                # Create (admin)
PUT    /api/products/:id            # Update (admin)
DELETE /api/products/:id            # Delete (admin)
```

### Orders
```bash
GET    /api/orders                  # List user's orders
GET    /api/orders/:id              # Get order details
POST   /api/orders                  # Create order
```

### Carts
```bash
GET    /api/cart                    # Get current cart
POST   /api/cart                    # Add item
PUT    /api/cart/:itemId            # Update quantity
DELETE /api/cart/:itemId            # Remove item
```

**See `docs/api.md` for complete endpoint list**

---

## 🔐 Authentication

All endpoints except auth & public endpoints require JWT:

```bash
# 1. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Response: { "token": "eyJhbGciOiJIUzI1..." }

# 2. Use token in requests
curl http://localhost:5000/api/products \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."
```

**Seeded test accounts:**
```
Email: user1@example.com
Password: User@Secure123!
(Check MongoDB for actual created accounts)
```

---

## 📁 Project Structure

```
├── models/           → Database schemas
├── controllers/      → Business logic
├── routes/          → API endpoints
├── middleware/      → Auth, validation, errors
├── config/          → Database, logger config
├── utils/           → Helpers (email, upload)
├── scripts/         → Seeding scripts
├── __tests__/       → Jest test files
├── docs/            → Documentation
├── .env             → Environment variables (DO NOT COMMIT)
├── index.js         → Server entry point
└── package.json     → Dependencies & scripts
```

---

## 📊 Seeded Data Summary

After running `npm run seed:incremental`:

```
✅ Users:              10 (mix of roles)
✅ Products:           12 (plant products)
✅ Categories:         7 (plant types)
✅ Subcategories:      14 (2 per category)
✅ Coupons:            5 (discount codes)
✅ Shipping Methods:   3 (Standard, Express, Eco)
✅ Tax Rules:          2 (EU VAT, US Tax)
✅ Carts:              3-6 (user carts with items)
✅ Support Tickets:    3 (with statuses)
✅ Analytics Events:   20 (product views, purchases)
✅ Orders:             2 (sample orders)
✅ Wishlists:          2 (user wishlists)
✅ Newsletter:         13 (subscribers)
```

---

## 🛠️ Common Commands

```bash
npm install              # Install dependencies
npm start                # Run in production mode
npm run dev              # Run in development (auto-reload)
npm test                 # Run all tests
npm run seed             # Seed simple dataset (12 plants)
npm run seed:intelligent # Seed everything with relationships
npm run seed:incremental # Smart seeding (recommended)
npm run db:check         # Check database counts
npm run lint             # Run linter (if configured)
```

---

## ⚠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| **MongoDB connection error** | Start MongoDB: `sudo systemctl start mongod` |
| **Port 5000 in use** | Change `PORT` in `.env` or kill process: `lsof -i :5000` |
| **Module not found** | Run `npm install` |
| **Seeding fails** | Check MongoDB is running, then run `npm run seed:incremental` again |
| **Tests fail** | Start MongoDB first, then run `npm test` |

---

## 🔒 Security Notes

- ✅ Passwords hashed with bcryptjs
- ✅ JWT-based authentication
- ✅ Input validation on all endpoints
- ✅ Never commit `.env` file
- ✅ Change `JWT_SECRET` in production
- ✅ Use environment variables for all secrets

---

## 📖 Next Steps

1. **Read full developer guide**: `DEVELOPER_GUIDE.md`
2. **Check seeding options**: `docs/SEEDING.md`
3. **View API endpoints**: `docs/api.md`
4. **Test an endpoint**: `GET http://localhost:5000/api/products`
5. **Run tests**: `npm test`
6. **Start coding!** 🚀

---

## 🤝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes & commit
git add .
git commit -m "feat: description"

# Push & create PR
git push origin feature/your-feature
```

**Never commit:**
- `.env` file
- `node_modules/`
- `*.log` files

---

## 📞 Need Help?

- Check `DEVELOPER_GUIDE.md` for detailed setup
- See `docs/api.md` for endpoint documentation
- Read `docs/SEEDING.md` for database seeding
- Check `PROJECT_STATUS.md` for current state

---

**Happy coding! 🎉**
