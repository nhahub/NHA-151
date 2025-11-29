# API Documentation

Base URL
- Local development: `http://localhost:5002/api`

Authentication
- All authenticated endpoints require a Bearer token in the `Authorization` header: `Authorization: Bearer <token>`.

Standard error responses
- 400 Bad Request — missing or invalid parameters
- 401 Unauthorized — missing/invalid auth token or credentials
- 403 Forbidden — insufficient permissions (admin only)
- 404 Not Found — resource not found
- 500 Internal Server Error — unexpected server error

--------------------------------------------------------------------------------

## Auth

- POST /api/auth/register
  - Description: Register a new user
  - Body: { name?: string, email: string, password: string }
  - Success: 201 Created
    - Response: { _id, name, email, isAdmin, token }

- POST /api/auth/login
  - Description: Login and obtain JWT
  - Body: { email: string, password: string }
  - Success: 200 OK
    - Response: { _id, name, email, isAdmin, token }

- POST /api/auth/logout
  - Description: Revoke current session token
  - Auth: Required
  - Success: 200 OK { message }

- GET /api/auth/sessions
  - Description: List active sessions for the user
  - Auth: Required
  - Success: 200 OK { sessions: [...] }

- DELETE /api/auth/sessions/:jti
  - Description: Revoke session with given jti
  - Auth: Required

- DELETE /api/auth/sessions
  - Description: Revoke all sessions for the authenticated user
  - Auth: Required

- GET /api/auth/verify-email/:token
  - Description: Verify email by token

- POST /api/auth/forgot-password
  - Description: Start password reset flow (sends email)
  - Body: { email: string }

- PUT /api/auth/reset-password/:token
  - Description: Reset password using token
  - Body: { password: string }

- GET /api/auth/profile
  - Description: Get authenticated user's profile
  - Auth: Required

- PUT /api/auth/profile
  - Description: Update profile (name, email)
  - Body: { name?: string, email?: string }
  - Auth: Required

--------------------------------------------------------------------------------

## Products

- GET /api/products
  - Description: List products (pagination & filters)
  - Query parameters: `page`, `limit`, `category`, `search`, `sort`
  - Success: 200 OK { products: [...], page, pages, total }

- GET /api/products/search
  - Description: Flexible search endpoint
  - Query: `q`, `category`, `minPrice`, `maxPrice`, `sort`

- GET /api/products/top
  - Description: Top rated products

- GET /api/products/featured
  - Description: Featured products

- GET /api/products/brand/:brand
  - Description: Products filtered by brand

- GET /api/products/:id
  - Description: Get product details

- POST /api/products
  - Description: Create product (admin)
  - Auth: Required (admin)
  - Body example:
    {
      "name": "Fiddle Leaf Fig",
      "description": "Large indoor plant",
      "price": 49.99,
      "category": "<categoryId>",
      "subcategory": "<subcategoryId>",
      "countInStock": 10,
      "images": ["https://..."],
      "careInfo": "Bright indirect light",
      "features": ["Low maintenance"]
    }

- PUT /api/products/:id
  - Description: Update product (admin)
  - Auth: Required (admin)

- DELETE /api/products/:id
  - Description: Delete product (admin)
  - Auth: Required (admin)

- POST /api/products/:id/reviews
  - Description: Add a review for a product
  - Auth: Required
  - Body: { rating: number, comment?: string }

--------------------------------------------------------------------------------

## Categories & Subcategories

- GET /api/categories
  - Description: List all categories

- POST /api/categories
  - Description: Create category (admin)
  - Auth: Required (admin)

- GET /api/categories/:id
  - Description: Get a category

- PUT /api/categories/:id
  - Description: Update category (admin)
  - Auth: Required (admin)

- DELETE /api/categories/:id
  - Description: Delete category (admin)
  - Auth: Required (admin)

- PUT /api/categories/:id/status
  - Description: Update category active/inactive (admin)

- GET /api/subcategories
  - Description: List subcategories

- POST /api/subcategories
  - Description: Create subcategory (admin)

- GET /api/subcategories/:id
  - Description: Get subcategory

- PUT /api/subcategories/:id
  - Description: Update subcategory (admin)

- DELETE /api/subcategories/:id
  - Description: Delete subcategory (admin)

--------------------------------------------------------------------------------

## Cart

- GET /api/cart
  - Description: Get current user's cart
  - Auth: Required

- POST /api/cart
  - Description: Add item to cart
  - Auth: Required
  - Body: { product: productId, qty: number }

- DELETE /api/cart
  - Description: Clear cart (authenticated user's cart)
  - Auth: Required

- PUT /api/cart/item/:productId
  - Description: Update quantity for cart item
  - Body: { qty: number }
  - Auth: Required

- DELETE /api/cart/item/:productId
  - Description: Remove item from cart
  - Auth: Required

--------------------------------------------------------------------------------

## Orders

- POST /api/orders
  - Description: Create an order (addOrderItems route)
  - Auth: Required
  - Body example (accepted shapes):
    {
      "orderItems": [ { "product": "<id>", "qty": 2 } ],
      "shippingAddress": { "address":"...", "city":"...", "postalCode":"...", "country":"..." },
      "paymentMethod": "card",
      "itemsPrice": 100.0,
      "taxPrice": 5.0,
      "shippingPrice": 10.0,
      "totalPrice": 115.0
    }

- GET /api/orders/myorders
  - Description: Get orders for authenticated user
  - Auth: Required

- GET /api/orders/:id
  - Description: Get order details (owner or admin)
  - Auth: Required

- PUT /api/orders/:id/pay
  - Description: Mark order as paid (payment callback or client verify)
  - Auth: Required

Admin order management:
- GET /api/orders (admin)
- POST /api/orders (admin create)
- PUT /api/orders/:id (admin update)
- DELETE /api/orders/:id (admin delete)
- PUT /api/orders/admin/:orderId (admin update custom fields)
- DELETE /api/orders/admin/:orderId (admin delete)

--------------------------------------------------------------------------------

## Payments

- POST /api/payments/create-payment
  - Description: Create a payment page / initiate payment with PayTabs
  - Auth: Required
  - Body: { orderId: string, returnUrl: string }
  - Success: { success: true, payment_url, tran_ref }

- POST /api/payments/verify-payment
  - Description: Public verification endpoint (can be used by client)
  - Body: { tran_ref, orderId }

- POST /api/payments/refund
  - Description: Request a refund for a paid order
  - Auth: Required (order owner)
  - Body: { orderId, refundAmount, reason }

- POST /api/payments/ipn
  - Description: IPN handler (instant payment notification)

- POST /api/payments/webhook
  - Description: Webhook handler for payment gateway notifications

- GET /api/payments/config
  - Description: Return configured payment provider values (public)

--------------------------------------------------------------------------------

## Newsletter

- POST /api/newsletter/subscribe
  - Body: { email }

- POST /api/newsletter/unsubscribe
  - Body: { email }

- PUT /api/newsletter/preferences
  - Body: { email, preferences }

- GET /api/newsletter/subscribers (admin)
  - Auth: Required (admin)

- POST /api/newsletter/send (admin)
  - Auth: Required (admin)

--------------------------------------------------------------------------------

## Support Tickets

- POST /api/support
  - Description: Create support ticket
  - Auth: Required

- GET /api/support (admin)
  - Description: Get all tickets (admin only)

- GET /api/support/my-tickets
  - Description: Get tickets for authenticated user

- GET /api/support/:id
  - Auth: Required

- POST /api/support/:id/message
  - Description: Add a message to the ticket
  - Auth: Required

- PUT /api/support/:id/status (admin)
- PUT /api/support/:id/priority (admin)

--------------------------------------------------------------------------------

## Contact

- POST /api/contact
  - Description: Public contact form; uses optional auth
  - Body: { name, email, subject, message }

- GET /api/admin/contact
  - Description: Admin-only read of contact messages
  - Auth: Required (admin)

- PATCH /api/admin/contact/:id/read
  - Description: Mark a message as read (admin)

--------------------------------------------------------------------------------

## Analytics

- POST /api/analytics/event
  - Description: Track an event (optional auth)

- GET /api/analytics (admin)
  - Description: Get aggregated analytics

- GET /api/analytics/user/:userId (admin)

- GET /api/analytics/products (admin)

--------------------------------------------------------------------------------

## Returns

- POST /api/returns
  - Description: Request a return for an order (authenticated)

- GET /api/returns (admin)

- GET /api/returns/my-returns
  - Description: Get returns for authenticated user

- GET /api/returns/:id
  - Auth: Required

- PUT /api/returns/:id (admin)
  - Description: Update return status (admin)

--------------------------------------------------------------------------------

## Wishlist

- GET /api/wishlist
  - Auth: Required

- POST /api/wishlist
  - Body: { product: productId }

- DELETE /api/wishlist
  - Description: Clear wishlist

- DELETE /api/wishlist/:productId
  - Description: Remove product from wishlist

- POST /api/wishlist/:productId/move-to-cart
  - Description: Move wishlist item to cart

--------------------------------------------------------------------------------

## Coupons

- POST /api/coupons
  - Auth: Admin
  - Description: Create coupon

- GET /api/coupons
  - Auth: Admin

- GET /api/coupons/:id
  - Auth: Admin

- PUT /api/coupons/:id
  - Auth: Admin

- DELETE /api/coupons/:id
  - Auth: Admin

- POST /api/coupons/validate
  - Auth: Required
  - Body: { code }

- POST /api/coupons/:id/apply
  - Auth: Required
  - Description: Apply coupon to cart

--------------------------------------------------------------------------------

## Shipping

- GET /api/shipping
  - Description: List shipping methods (public)

- POST /api/shipping/calculate
  - Description: Calculate shipping cost

- POST /api/shipping (admin)
  - Description: Create shipping method

- PUT /api/shipping/:id (admin)

--------------------------------------------------------------------------------

## Tax

- POST /api/tax/calculate
  - Description: Calculate tax for an order

- POST /api/tax (admin)
  - Description: Create tax rate

- GET /api/tax (admin)

- GET /api/tax/:id (admin)

- PUT /api/tax/:id (admin)

- DELETE /api/tax/:id (admin)

--------------------------------------------------------------------------------

## Health

- GET /api/health
  - Description: Basic health check (public)

- GET /api/health/ready
  - Description: Readiness check (public)

--------------------------------------------------------------------------------

Notes and examples
- Date/time fields are ISO-8601 strings where applicable.
- IDs are MongoDB ObjectId strings.
- Authentication uses JWT tokens returned on login/registration. Include them in `Authorization` header.
- Some endpoints accept multiple payload shapes for backwards compatibility (see controllers for details).

If you want this converted to an OpenAPI (Swagger) YAML/JSON file, I can generate it next.
