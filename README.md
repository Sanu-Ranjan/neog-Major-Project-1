# GrillMart

A full-stack e-commerce platform for baking, grilling, and tandoor equipment. Built to demonstrate cart and wishlist state management, address management, order placement, and self-hosted VPS deployment.

---

## Demo Link

[Live Demo](https://shop.devranjan.cloud/)

---

## Demo Video

Watch a walkthrough of all major features:

[Video Link](https://drive.google.com/file/d/1UUCCsolSq9IqObdgztknIfkHZnciO3RD/view?usp=sharing)

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/Sanu-Ranjan/Grill-Mart.git
cd Grill-Mart
 
# Backend
cd backend
cp .env.example .env      # fill in your MONGODB and ALLOWED_ORIGINS
npm install
npm start                 # starts on http://localhost:3000
 
# Frontend
cd ../client/ecom-project
npm install
npm run dev                # starts on http://localhost:5173
```

---

## Tech Stack

- **Frontend:** React 19, React Router 7, Bootstrap 5, Bootstrap Icons, react-hook-form, react-toastify
- **Backend:** Node.js, Express 5, Mongoose 9
- **Database:** MongoDB (self-hosted on VPS)
- **Infrastructure:** Hostinger VPS (Ubuntu LTS), Nginx, PM2, Let's Encrypt via Certbot
- **CI/CD:** GitHub Actions — auto-deploys on push to `main`

---

## Documentation

- [App Features](./docs/features.md)
- [API Reference](./docs/apiInfo.md)
- [Database Models](./docs/models.md)

---

## Design Decisions

- **Server-side price recalculation on order placement** — the order controller looks up each product's real price from the database rather than trusting the price sent by the client, preventing price tampering
- **Free delivery threshold** — orders over ₹999 get free delivery, calculated on the backend at order time, not just displayed on the frontend
- **Single global cart and wishlist** — there's no per-user cart since there's no authentication; cart and wishlist are app-wide collections with one active document
- **`useBusyState` hook** — tracks a local busy flag independent of the global loading state, preventing duplicate clicks while a specific row's action is in flight
- **Response helpers (`ok`/`err`, `success`/`failure`)** — every controller follows the same two-layer pattern: a data-layer function returns `{ data, error }`, and the route handler wraps that into a consistent `{ success, message, data }` JSON response

---

## Known Limitations

- No authentication — the user profile is static, and cart/wishlist/address data is shared across all visitors of the deployed app
- No pagination on `GET /products` — would be needed at scale
- No payment integration — checkout creates an order record but does not process real payment

---

## Contact

For bugs or feature requests, reach out at [ranjan.code33@gmail.com]()
