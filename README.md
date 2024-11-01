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

## Docker container
If you want to setup a local Postgres server, you can use Docker

First, make sure you have the following env keys in the `.env` file:
```
POSTGRES_PASSWORD=your_password
POSTGRES_USER=your_username
POSTGRES_DB=dolar-en-bancos
POSTGRES_PORT=5432
```

And then, please run the following command to build and start the containers: `docker-compose up -d`

## Migrations
This project uses Prisma ORM to handle database connection and migrations.

Please run `npm run prepare:db` if it's the first time setting up the project.

In order to apply pending migrations in dev env, we recommend you to run: `npm run migrate:dev` 
