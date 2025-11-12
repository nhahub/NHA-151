# 🌱 Greenify - E-Commerce Platform

A modern, full-stack e-commerce platform for selling plants and gardening products with admin dashboard, authentication, and real-time capabilities.

## 🚀 Features

- **Authentication System**
  - User registration and login with email verification
  - Admin and seller roles
  - JWT-based token management
  - Session tracking and security

- **Admin Dashboard**
  - User management
  - Product management
  - Order tracking
  - Analytics and reports

- **Customer Features**
  - Product browsing by category
  - Shopping cart and wishlist
  - Order placement and tracking
  - Coupon/discount codes

- **Technical Highlights**
  - Production-grade authentication with bcrypt password hashing
  - Rate limiting and CORS security
  - MongoDB Atlas integration
  - Comprehensive API documentation with Swagger
  - Full test coverage with Jest
  - Real-time data validation

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite
- **Redux** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Hook Form** with Zod validation

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ORM
- **JWT** for authentication
- **Bcryptjs** for password hashing
- **Jest** for testing
- **Swagger** for API documentation

## 📋 Prerequisites

- Node.js v18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Environment variables setup

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/greenify-depi.git
cd greenify-depi
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd server && npm install

# Install frontend dependencies  
cd ../client && npm install
```

### 3. Environment Setup

**Backend** (`server/.env`):
```
PORT=5002
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/greenify
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

**Frontend** (`client/.env`):
```
VITE_API_URL=http://localhost:5002
```

### 4. Start Development Servers
```bash
npm run dev
```

This starts both frontend (http://localhost:3000) and backend (http://localhost:5002) concurrently.

## 📝 Default Login Credentials

### Admin Account
- **Email**: `admin.plants@example.com`
- **Password**: `Admin@Secure123!`
- **Role**: Admin

### Customer Account  
- **Email**: `customer1@example.com`
- **Password**: `Customer@123!`
- **Role**: User

## 🔑 Key Features

### Authentication
- Secure password hashing with bcrypt (salt rounds: 12)
- JWT token-based sessions
- Automatic token refresh
- Session tracking per device
- Pre-hash password detection for security

### Security
- CORS protection (configurable origins)
- Rate limiting on auth endpoints (5 attempts per hour)
- Helmet.js for HTTP headers
- Input validation with Joi/Zod
- SQL injection prevention

### API Features
- RESTful API design
- Comprehensive error handling
- Structured logging
- Request/response validation
- Health check endpoint

## 📚 API Documentation

Access Swagger UI at: `http://localhost:5002/api-docs`

### Auth Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/reset-password` - Password reset

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product details
- `GET /api/categories` - List categories

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user's orders
- `GET /api/orders/:id` - Get order details

## 🧪 Testing

```bash
cd server
npm test
```

Tests cover:
- Authentication flows
- Authorization checks
- Input validation
- Rate limiting
- Security headers

## 📊 Project Structure

```
greenify-depi/
├── client/                 # React frontend
│   ├── src/
│   │   ├── Pages/         # Page components
│   │   ├── Components/    # Reusable components
│   │   ├── Routers/       # Route configuration
│   │   ├── redux/         # Redux store and slices
│   │   └── lib/           # API and utilities
│   └── package.json
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── __tests__/        # Jest tests
│   └── scripts/          # Utility scripts
└── package.json          # Root package.json
```

## 🔧 Scripts

### Root
- `npm run dev` - Start both frontend and backend
- `npm run build` - Build for production

### Backend
- `npm run dev` - Start dev server with nodemon
- `npm test` - Run Jest tests
- `npm run seed` - Seed database with sample data

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5002

# Kill process
kill -9 <PID>
```

### MongoDB Connection Failed
- Verify MONGO_URI in `.env`
- Check MongoDB Atlas IP whitelist
- Ensure database user has correct permissions

### Password Login Issues
- Clear browser password manager cache
- Use incognito/private mode for testing
- Verify password meets requirements (8+ chars, uppercase, lowercase, number, special char)

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 📄 License

MIT License - see LICENSE file for details

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Last Updated**: November 2025  
**Maintained By**: Development Team
