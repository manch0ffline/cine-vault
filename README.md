# CineVault

A portfolio pet project: a web app for movie discovery and browsing with authentication, filtering, sorting, and a detailed movie page.

## About the Project

**CineVault** is an SPA/SSR hybrid built with Next.js (App Router), where users can:

- sign up and log in via Supabase Auth;
- browse the movie catalog;
- filter and sort results;
- open a detailed page for each selected movie;
- use a clean responsive interface.

The project was built to demonstrate practical skills in React/Next.js, TypeScript, Redux Toolkit, API integration, authentication, App Router architecture, and a production-ready SEO setup.

## Tech Stack

- **Frontend:** React 19, Next.js 16 (App Router), TypeScript
- **State Management:** Redux Toolkit, React Redux
- **Auth:** Supabase Auth
- **UI/Styling:** SCSS (Sass), Bootstrap 5, custom components
- **Notifications:** react-toastify
- **Data source:** imdbapi.dev (`/interests`)
- **Linting:** ESLint

## Core Features

- User registration and authentication
- Protected pages after login
- Fetching movie data from an external API
- Search, category filtering, and sorting
- Catalog pagination
- Detailed movie page
- Responsive layout for desktop/tablet/mobile
- Basic SEO setup (`metadata`, `robots`, `sitemap`)

## Project Structure

```text
src/
	app/
		(auth)/
		(autorized)/
		layout.tsx
		page.tsx
		robots.ts
		sitemap.ts
	components/
	lib/
	store/
	styles/
	types.ts
```

## Environment Variables

Create a `.env.local` file based on `.env.example` and fill in the values:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_IMDB_API_URL=
NEXT_PUBLIC_SITE_URL=
```

Where:

- `NEXT_PUBLIC_SUPABASE_URL` - your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - your public Supabase anon key
- `NEXT_PUBLIC_IMDB_API_URL` - base API URL (without `/interests`)
- `NEXT_PUBLIC_SITE_URL` - your project domain (for example `https://your-domain.com`)

## Local Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd cine-vault
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local`

```bash
cp .env.example .env.local
```

For Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

### 4. Start the development server

```bash
npm run dev
```

Open in your browser: `http://localhost:3000`

## Scripts

- `npm run dev` - run in development mode
- `npm run build` - create production build
- `npm run start` - start production build
- `npm run lint` - run ESLint

## Possible Improvements

- Add full watchlist/profile functionality
- Add e2e/integration tests
- Complete Sass migration from `@import` to `@use`
- Add CI (lint + build) via GitHub Actions
- Add preview screenshots to README

## Author

Pet project for a frontend developer portfolio.
