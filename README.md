This is a [Next.js](https://nextjs.org) project using Prisma with Supabase Postgres.

## Getting Started

First, create your environment file:

```bash
cp .env.example .env
```

Set `DATABASE_URL` to your Supabase connection string and set a strong `JWT_SECRET`.

Then prepare the database:

```bash
npm run db:push
npm run db:setup-admin
```

For production deployments with migrations:

```bash
npm run db:deploy
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Login with:

- Email: `admin@npbos.com`
- Password: `password123`

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Set these environment variables in Vercel Project Settings:

- `DATABASE_URL` (Supabase Postgres URL)
- `JWT_SECRET`

After setting env vars, redeploy.

Health check endpoint:

- `GET /api/health`

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
