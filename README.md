# TannerCastora.com - Book Landing Page

A professional book landing page for "Stig and The Rise of South Dakota State Football" with admin editing capabilities and Vercel deployment.

## Local Development

### Prerequisites
- Node.js 20+
- npm
- Vercel CLI (optional)

### Setup

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your values
```

3. **Initialize database (for local SQLite development):**
```bash
npx prisma migrate dev
npx prisma db seed
```

5. **Start development server:**
```bash
npm run dev
```

Visit http://localhost:3000

## Admin Portal

Access the admin portal at http://localhost:3000/admin/login

Default credentials (from .env):
- Email: admin@example.com
- Password: admin123

Features:
- Edit book details (title, tagline, description, Amazon URL)
- Edit author information (name, bios)
- Manage social links (add/edit/delete/reorder, max 6)
- Image uploads (when GCS is configured)

## Deployment to Vercel

### Prerequisites
- Vercel account
- GitHub repository (recommended)
- Vercel CLI: `npm i -g vercel`

### Setup

1. **Install Vercel CLI and login:**
```bash
npm i -g vercel
vercel login
```

2. **Link project:**
```bash
vercel link
```

3. **Configure database:**
- Go to Vercel Dashboard → Storage
- Create a new Postgres database (Vercel Postgres or Neon)
- The DATABASE_URL will be automatically added to your project

4. **Configure Blob Storage:**
- Go to Vercel Dashboard → Storage
- Create a new Blob store
- The BLOB_READ_WRITE_TOKEN will be automatically added

5. **Set environment variables:**
```bash
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
vercel env add ADMIN_EMAIL  
vercel env add ADMIN_PASSWORD
```

6. **Pull environment variables for local development:**
```bash
vercel env pull .env.local
```

### Deploy

**Option 1: Git-based deployment (recommended)**
- Push to GitHub
- Import project in Vercel Dashboard
- Automatic deployments on every push

**Option 2: CLI deployment**
```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

### Post-deployment

1. **Run database migrations:**
```bash
npx prisma migrate deploy
```

2. **Seed initial data:**
```bash
npx prisma db seed
```

3. **Update NEXTAUTH_URL:**
- Set to your production URL in Vercel Dashboard
- Example: `https://your-domain.vercel.app` or custom domain

## Project Structure

```
stig-site/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/         # NextAuth endpoints
│   │   └── admin/        # Admin API endpoints
│   ├── admin/            # Admin pages
│   └── page.tsx          # Home page
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── vercel.json           # Vercel configuration (optional)
```

## Key Features

✅ **Two CTAs only** - Hero and footer Amazon links
✅ **Clean blue/white theme** - Matches book cover
✅ **Admin portal** - Edit content without code changes
✅ **Social Links Manager** - Dynamic social links with icons
✅ **GA4 Analytics** - Track visitor behavior
✅ **Vercel optimized** - Edge-ready with automatic scaling
✅ **Responsive design** - Works on all devices
✅ **Accessibility** - Keyboard navigation, screen reader support

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | PostgreSQL connection string | Yes |
| NEXTAUTH_SECRET | Secret for NextAuth.js | Yes |
| NEXTAUTH_URL | Site URL (production only) | Production |
| ADMIN_EMAIL | Admin login email | Yes |
| ADMIN_PASSWORD | Admin login password | Yes |
| NEXT_PUBLIC_GA_MEASUREMENT_ID | Google Analytics ID | No |
| BLOB_READ_WRITE_TOKEN | Vercel Blob storage token | Production |

## Development Commands

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
npm run db:push       # Push schema changes
npm run db:migrate    # Run migrations
npm run db:seed       # Seed database
```

## License

© 2024 All rights reserved.
