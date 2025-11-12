# Quick Setup Checklist

Use this checklist to get the backend running on your machine in 10 minutes.

## ✅ Step 1: Prerequisites (5 min)

- [ ] Node.js v16+ installed? `node --version`
- [ ] npm installed? `npm --version`
- [ ] MongoDB installed locally OR MongoDB Atlas account created?
- [ ] Git installed? `git --version`

## ✅ Step 2: Clone & Install (3 min)

```bash
git clone https://github.com/ahmedarafastudent-tech/DEPI-graduation-project-backend.git
cd DEPI-graduation-project-backend
npm install
```

- [ ] All dependencies installed without errors?

## ✅ Step 3: Environment Setup (2 min)

Create `.env` file in root directory:

```bash
# Copy template (if exists)
cp .env.example .env

# Or create manually and add:
MONGO_URI=mongodb://localhost:27017/ecommerce
NODE_ENV=development
JWT_SECRET=your_secret_key_here_change_in_production
PORT=5000
```

- [ ] `.env` file created in root?
- [ ] `MONGO_URI` points to your MongoDB instance?

## ✅ Step 4: Start MongoDB (1 min)

**Linux:**
```bash
sudo systemctl start mongod
```

**macOS:**
```bash
brew services start mongodb-community
```

**Windows:**
```bash
net start MongoDB
```

**Or use MongoDB Atlas (Cloud):**
- Update `MONGO_URI` in `.env` with your Atlas connection string

- [ ] MongoDB is running and accessible?

## ✅ Step 5: Seed Database (2 min)

```bash
npm run seed:incremental
```

Wait for output showing:
```
╔════════════════════════════════════════════════════════════╗
║           INCREMENTAL SEEDING COMPLETE ✓                   ║
╚════════════════════════════════════════════════════════════╝
```

- [ ] Seeding completed without errors?
- [ ] Collections populated (users, products, categories, etc.)?

## ✅ Step 6: Start the Server (instant)

```bash
npm run dev
```

Expected output:
```
[INFO] Listening on port 5000
[INFO] Connected to MongoDB: mongodb://localhost:27017/ecommerce
```

- [ ] Server running without errors?
- [ ] Port 5000 is accessible?

## ✅ Step 7: Test the API (1 min)

Open browser or Postman:

```
GET http://localhost:5000/api/products
```

Expected response:
```json
{
  "success": true,
  "count": 12,
  "data": [
    { "_id": "...", "name": "Snake Plant", "price": 95, ... }
  ]
}
```

- [ ] Got successful response with products?

## 🎉 Done! Your Backend is Running

You now have:
- ✅ 10 users
- ✅ 12 products
- ✅ 7 categories
- ✅ 14 subcategories
- ✅ 5 coupons
- ✅ 3 shipping methods
- ✅ 2 tax rules
- ✅ 3+ carts
- ✅ 3 support tickets
- ✅ 20 analytics events

## Next Steps

- 📖 Read full API docs: `docs/api.md`
- 🌱 Read seeding guide: `docs/SEEDING.md`
- 🧪 Run tests: `npm test`
- 🔒 Check authentication: Login and use JWT tokens
- 📊 View project status: `PROJECT_STATUS.md`

## Common Commands

```bash
npm start              # Run in production
npm run dev            # Run in development (auto-reload)
npm test               # Run all tests
npm run seed           # Reseed database
npm run seed:intelligent  # Comprehensive reseed
npm run seed:incremental  # Smart incremental seed
```

## Need Help?

| Issue | Solution |
|-------|----------|
| Can't connect to MongoDB | Make sure `mongod` is running OR update `MONGO_URI` in `.env` |
| Port 5000 already in use | Change `PORT` in `.env` or kill process using port |
| Seeding fails | Run `npm run seed:incremental` again or check `.env` |
| Tests fail | Make sure MongoDB is running: `sudo systemctl start mongod` |

---

**You're all set! 🚀**
