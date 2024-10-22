# Dolar En Bancos

## Pre-requisites

- [Doppler (for secrets management)](https://doppler.com/)
- [Node.js](https://nodejs.org/en/) **v20.11.0**

## Getting Started

First, prepare environment running:

```bash
npm run prepare
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

## Environment Variables

We use Doppler to manage secrets. Please request access and run the project with `doppler run -- npm` or
add your own token.


## Migrations
This project uses Prisma ORM to handle database connection and migrations.

In order to apply pending migrations in dev env, we recommend you to run: `npm run migrate:dev` 
