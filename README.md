# ✈ FlightBooker — Full Stack Flight Booking System

![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![Language](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge)
![Backend](https://img.shields.io/badge/Backend-Express%20%2B%20Prisma-orange?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blueviolet?style=for-the-badge)
![Database](https://img.shields.io/badge/DB-PostgreSQL-316192?style=for-the-badge&logo=postgresql)
![Rendering](https://img.shields.io/badge/Hosting-Render%20%2F%20Vercel-black?style=for-the-badge)

---

## 🖼 Screenshots Preview

| Home | Search | Flight Results |
|---|---|---|
| ![ss](screenshots/home.png) | ![ss](screenshots/search.png) | ![ss](screenshots/results.png) |

| Flight Details | Booking Success | Booking History |
|---|---|---|
| ![ss](screenshots/details.png) | ![ss](screenshots/success.png) | ![ss](screenshots/history.png) |


---

## 📂 Project Structure

```
flight-booking-assignment/
│── backend/       → Node + Express + Prisma + Auth API
│── frontend/      → React + Vite + Tailwind + Axios
└── README.md
```

---

## 🔧 Backend Setup (Express + Prisma + PostgreSQL)

```bash
cd backend
npm install
```

### Create `.env` inside backend 📄

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require
JWT_SECRET=your_secret_key
PORT=4000
```

### Run DB migrations
```bash
npx prisma migrate dev --name init
```

### Seed Flights for 4 Months Automatically
```bash
npm run prisma:seed
```

### Start backend
```bash
npm run dev
```

Backend now running →  
👉 http://localhost:4000

---

## 🌐 Frontend Setup (React + Vite)

```bash
cd frontend
npm install
```

### Create `.env` inside frontend

```
VITE_API_URL=http://localhost:4000
```

### Start client
```bash
npm run dev
```

Frontend →  
👉 http://localhost:5173

---

## 🚀 Production Build

### Backend
```bash
cd backend
npm run build
node dist/index.js
```

### Frontend
```bash
cd frontend
npm run build
```

Output → `frontend/dist`

---

## 🔥 Features

- JWT Auth & Session Persistence
- Search + Filter Flights
- Booking with Passenger Info
- Booking History Dashboard
- Database Seeder — generates flights for **next 4 months**
- Fully Responsive UI w/ Mobile Navigation
- TypeScript everywhere

---

## 🛣 API Endpoints

| Method | Route | Description |
|---|---|---|
| POST `/auth/signup` | Register |
| POST `/auth/login` | Login + Get Token |
| GET `/flights/search` | Fetch flights |
| POST `/booking` | Create booking |
| GET `/booking/:id` | Single booking |
| GET `/booking` | All user bookings |

---

## 🌍 Deployment Guide

### Backend (Render)

| Setting | Value |
|---|---|
| **Root Directory** | `backend` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `node dist/index.js` |
| **Env Vars** | Add `.env` values |

After deploy → Copy API URL  
Example: `https://flyswift-api.onrender.com`

---

### Frontend (Render / Vercel)

| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Publish Directory | `dist` |

📌 Must set env inside deployment  
```
VITE_API_URL=https://your-render-backend-url.com
```

### Rewrite Rule (SPA Routing Fix)

| Source | Destination | Type |
|---|---|---|
| `/*` | `/index.html` | Rewrite |

---

## 📌 Future Upgrades

- Seat Selection UI
- Admin Panel (Add flights manually)
- Ticket PDF + Email Receipt
- Real-time seat lock

---

## 🏁 You're Ready 🎉  
Copy → Paste → Push → Deploy.

