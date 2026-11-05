# Oikyo (ঐক্য) — Social Development Events Platform (Client)

A modern, transparent, community-driven event management platform designed to empower citizens across Dhaka, Bangladesh to create, discover, and lead grassroots social development drives.

Built for **Assignment 8 (Category: Hermione — Social Development)** with strict anti-AI slop code standards (certified 100/100 by `aislop`), Plus Jakarta Sans typography, and zero native browser alert/confirm dialogues.

---

## 🌐 Live Deployment Links

- **Frontend Client Application:** [https://oikyo-client.vercel.app](https://oikyo-client.vercel.app) *(Replace with your live Vercel URL)*
- **Backend Express API Server:** [https://oikyo-server.vercel.app](https://oikyo-server.vercel.app) *(Replace with your live backend URL)*

---

## 🌟 Key Features

1. **Cinematic Hero Banner with Background Video Support & Tri-Color Accents**
   - Inspired by contemporary NGO web design, featuring high-contrast emotional photography, tri-color civic accent dashes (Rose, Amber, Emerald), and `<video autoPlay loop muted playsInline>` integration with poster fallback (`/public/videos/hero.mp4`).
   - High-impact headlines: *"GIVING HOPE. RESTORING DIGNITY. BUILDING BANGLADESH."* with direct action buttons.

2. **Editorial "What We Do" Asymmetrical Impact Showcase**
   - Direct editorial layout addressing immediate humanitarian needs (Mirpur winter blanket drives, Korail flood relief) and long-term environmental stewardship (Dhanmondi Lake cleanups, Uttara tree plantations).

3. **Dual-Layer Authentication & Session Security (BetterAuth + JWT Handshake)**
   - Powered by **BetterAuth** with direct MongoDB Atlas adapter for high-security credential hashing and session storage.
   - Secure token handshake endpoint (`POST /api/jwt`) supplying signed JSON Web Tokens for authenticated backend mutations.
   - Comprehensive password complexity validation on registration (uppercase, lowercase, and minimum 6 characters).

4. **SPA & Reload-Safe Route Protection**
   - Implements `<ProtectedRoute>` with `isPending` session hydration checks.
   - Hard reloading on private routes (`/create-event`, `/joined-events`, `/manage-events`, `/profile`) never prematurely boots users to `/login`.
   - Dynamic dynamic routes wrapped in `<React.Suspense>` to enable Next.js Partial Prerendering (`◐`).

5. **Real-Time Participation Engine with Duplicate-Join Prevention**
   - Authenticated volunteers can register for drives in a single click.
   - Automatic `409 Conflict` detection if already registered, presenting friendly SweetAlert2 information dialogs.
   - Success triggers celebratory SweetAlert2 popups with immediate navigation to personal rosters.

6. **Advanced Directory Search, Filter Tabs & Cursorless Pagination**
   - 300ms debounced search on initiative title and Dhaka neighborhoods (Mirpur, Dhanmondi, Uttara, Mohammadpur).
   - Category selector tabs (Cleanup, Plantation, Donation, Healthcare, Education, Relief) and reset controls.
   - Skeleton card loaders (`<EventCardSkeleton />`) during network fetching.

7. **Organizer Control Panel & Event Lifecycle Management**
   - Dedicated `/manage-events` dashboard displaying exclusively the events created by the logged-in user.
   - Inline modal update with future-date validation (`getTomorrowOrTodayDateString()`).
   - Secure deletion verified by backend JWT ownership checks and protected by two-step SweetAlert2 confirmation dialogs.

8. **Volunteer Profile Customization & Civic Footprint (Optional Task #2)**
   - View profile details, member registration date, and aggregate civic engagement stats.
   - Update display name and custom avatar image URL via BetterAuth client.

9. **Accessible Theme Switching & Polished Branding**
   - Light / Dark / System mode toggle with `next-themes` and hydration-safe mounting.
   - Modern brand logo with emerald gradient badge and Banglish typography.
   - Official **new X logo** in footer (no legacy Twitter bird).

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack & Partial Prerendering
- **Language:** TypeScript 5 with strict typing
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/) / Radix UI primitives
- **Typography:** Google Font **Plus Jakarta Sans**
- **Authentication:** [BetterAuth](https://www.better-auth.com/) with native MongoDB Adapter
- **Icons:** [Lucide React](https://lucide.dev/)
- **Alerts & Toasts:** [SweetAlert2](https://sweetalert2.github.io/) & [Sonner](https://sonner.emilkowal.ski/)
- **Code Quality Gate:** [aislop CLI](https://github.com/scanaislop/aislop) (100/100 score across all components)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.18+ or 20+
- Running instance of `social-events-server` (on port 5000)

### 1. Installation
```bash
cd social-events-client
npm install
```

### 2. Environment Variables Configuration
Create a `.env.local` file in the root directory:

```env
# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_API_URL=http://localhost:5000

# BetterAuth Configuration
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_super_secret_better_auth_random_key_here

# MongoDB Atlas URI (Same cluster as backend)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 3. Adding Hero Video (Optional)
To display a custom hero background video, place your video file at:
```text
public/videos/hero.mp4
```
*(If no video is placed, the hero automatically displays the dramatic high-contrast photo poster)*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build Verification
```bash
npm run build
npm run start
```

---

## 📄 License
MIT License. Created with civic responsibility for Dhaka community development.
