# ❔ GuessWord: Game Web App

GuessWord is an exciting, modern web app that challenges your vocabulary and
deduction skills. Inspired by Wordle, it offers endless fun as you try to guess
the hidden 6-letter word in seven attempts. Beyond gameplay, GuessWord provides
secure authentication, personalized stats, and a beautiful, responsive UI. Built
with Next.js, TypeScript, Tailwind CSS v4, and DaisyUI, it’s designed for both
casual play and serious word game enthusiasts.

---

## 🌐 Production Deployment

It's live! Check it out at:

🪄 **[guessword.cyberalcove.com](https://guessword.cyberalcove.com)**

Sign up for a free account and start playing today!

## ✨ Features

---

- **Interactive Word Game**: Play on a dynamic game board with real-time cell
  logic and gameplay tracking.
- **Secure Authentication**: Email/password login, password reset, email update,
  and social login flows.
- 📊 **Personalized Dashboard & Stats**: View game history, performance
  analytics, and user-specific stats.
- 🎨 **Modern UI**: Clean, responsive interface with dark mode support.
- **API Integration**: RESTful endpoints for authentication and game data.
- 📧 **Email Verification** - Secure account management with email workflows
- 🔒 **Encrypted Database** - Your data is protected with SQLite encryption

---

## 🛠️ Technology Stack

### 🖥️ Frontend

- **[Next.js](https://nextjs.org/)** – High-performance React framework (App
  Router)
- **[Tailwind CSS v4](https://tailwindcss.com/)** – Utility-first CSS framework
- **[DaisyUI](https://daisyui.com/)** – Tailwind component library with multiple
  themes
- **[Heroicons](https://heroicons.com/)** – Beautiful SVG icons for React

### Backend & Authentication

- **[Better Auth](https://github.com/hel-b/better-auth)** – Modern
  authentication library (email/password, password reset, email change, social
  login)
- **[zod](https://zod.dev/)** – Schema validation
- **[better-sqlite3-multiple-ciphers](https://github.com/m4heshd/better-sqlite3-multiple-ciphers)**
  – Encrypted SQLite at rest
- **Email & Password** - Traditional authentication with verification
- **GitHub OAuth** - Social authentication provider
- **Google OAuth** - Social authentication provider
- **Password Reset** - Secure password recovery flow
- **Email Change** - Verified email update workflow

### ✉️ Email & Notifications

- **[Resend](https://resend.com/)** - Modern email API

### 🛠️ Development Tools

- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Docker](https://www.docker.com/)** - Containerization for deployment

---

## 📁 Project Structure

```
nextjs/
├── app/              # Pages, routes, and server actions
├── components/        # UI components (auth, game, layout, navigation, hooks, ui)
├── data/              # Static data or database files
├── lib/               # Utilities, helpers, and database logic
├── public/            # Static assets (images, icons, etc.)
├── eslint.config.mjs  # ESLint configuration
├── next-env.d.ts      # Next.js type definitions
├── next.config.ts     # Next.js configuration
├── package.json       # NPM package configuration
├── postcss.config.mjs # PostCSS configuration
├── proxy.ts           # Proxy logic
├── tsconfig.json      # TypeScript configuration
├── README.MD          # Project documentation (Next.js app)
```

---

## 🚀 Getting Started

1. **Clone the repo**

```bash
git clone <your-repo-url>
cd <project-folder>
```

2. **Install dependencies**

```bash
cd nextjs
npm install
```

3. **Set up environment variables**

- Include `.env` within the `nextjs` directory and update values as needed.

```env
BETTER_AUTH_SECRET=...         # Secret key for Better Auth session encryption
BETTER_AUTH_URL=...            # Better Auth server URL

USERS_DB_ENCRYPT_KEY=...       # Encryption key for user database (SQLite)

NOREPLY_EMAIL=...              # Outgoing email address for notifications

RESEND_API_KEY=...             # API key for Resend email service

GITHUB_CLIENT_SECRET=...       # GitHub OAuth client secret
GITHUB_CLIENT_ID=...           # GitHub OAuth client ID

GOOGLE_CLIENT_SECRET=...       # Google OAuth client secret
GOOGLE_CLIENT_ID=...           # Google OAuth client ID

DICTIONARY_DB_PATH=...         # Path to dictionary database file
USERS_DB_PATH=...              # Path to users database file
```

4. **Run locally**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
npm start
```

---

## 🐳 Docker

To build and run the app using the Makefile (recommended method):

```bash
# If you don't have make installed, run:
sudo apt update && sudo apt install make

# Build images, run migrations, and start the app
# NOTE: Configure your network and environment variables for your production environment in the Makefile
make up

# To run locally (with port 3000 mapped)
make dev-up

# To stop and remove the runtime container (dev or prod)
make down
```

Using compose:

```bash
# For production
# NOTE: Configure your network and environment variables for your production environment
docker compose up --build
# For development (with port 3000 mapped)
docker compose -f docker-compose.dev.yml up --build
```

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes,
features, or improvements.

---

## 📜 License

MIT License

---

> Built with ❤️ using Next.js, Tailwind CSS, DaisyUI, and Better Auth.
