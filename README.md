Apollo Green Solutions is a [Next.js](https://nextjs.org) energy management website for an industrial and commercial audience.

## Design palette

The core colours are sampled from the [Apollo Green Solutions website](https://www.apollo-gs.com/) and defined in `src/app/globals.css` as Tailwind theme tokens.

| Colour | Hex | Usage |
| --- | --- | --- |
| Black | `#000000` | Header, homepage hero, footer, and body text on white |
| White | `#FFFFFF` | Content backgrounds and text on black |
| Blue | `#020CB1` | Headings and accents on light backgrounds (`brand`) |
| Pale green | `#E3F5B9` | Buttons, active navigation, and accents on black (`accent`) |

Pale-green buttons use black text. Page introductions support light and dark sections so their text remains readable on either background.

## Homepage and branding

The homepage introduces the company through a hero, an energy-flow illustration, business benefits, solution highlights, and a contact call to action. The illustration explains the monitoring process; it does not represent live telemetry.

The supplied company logo is stored unchanged at `public/images/apollo-logo.jpg`. A shared `Brand` component displays it with the company name in the header and footer. The JPEG is 200 by 200 pixels and is displayed at 44 by 44 pixels.

## Products and About content

Product names, descriptions, and key specifications live in `src/lib/products.ts`; the reusable `ProductCard` component renders them as a responsive catalogue. Each card links to Contact for enquiries and to the original listing for full specifications. The CT meter's current rating refers to its transformer input.

Team names and roles live in `src/lib/team.ts`. Team cards use initials. The About page covers the company's origins, mission, and operations in Germany and Greece.

Content is summarised from these company sources:

- [KDK COUNT3 PRO](https://www.apollo-gs.com/product-page/kdk-count3-pro)
- [KDK COUNT3 CAGE CLAMP](https://www.apollo-gs.com/product-page/kdk-count3-cage-clamp-push-in)
- [KDK COUNT CT CAGE CLAMP](https://www.apollo-gs.com/product-page/kdk-count-ct-cage-clamp-push-in)
- [KDK CONVERTER](https://www.apollo-gs.com/product-page/kdk-converter-modbus-rtu-to-modbus-tcp)
- [Energy management systems](https://www.apollo-gs.com/energy-management)
- [Company history, mission, and team](https://www.apollo-gs.com/about-us)

## Contact form and local inbox

The Contact page validates name, email, and message in the browser and again in `POST /api/contact`. The server sends plain-text enquiries to [Mailpit](https://mailpit.axllent.org/docs/), a local development inbox. Success appears only after the inbox accepts the request. Failed submissions keep the entered text, and the Send button is disabled while a request is pending.

Start or update the development services:

```bash
docker compose up -d
```

1. Open [Contact](http://localhost:3000/contact) and submit a test enquiry.
2. Open [the local inbox](http://localhost:8025) to read it.

The inbox uses a Docker volume, so messages survive container restarts. Its web interface is bound to your local machine. The configured `apollo.example` addresses are test addresses; no email is sent to the real company.

For development outside Docker, start the inbox with `docker compose up -d mailpit`, copy `.env.example` to `.env.local`, and run `npm run dev`. Compose sets `MAILPIT_URL=http://mailpit:8025` for its app container; `.env.example` uses `http://localhost:8025` for a host-run app. Neither variable is public.

**Deployment requirement:** Mailpit capture is deliberately disabled in production. A live email provider and recipient must be configured in a later batch before the deployed form can send messages. Until then, production submissions return an unavailable response rather than a false success.

Run contact validation and delivery tests with `npm test` (Node.js 22.18 or newer). Run `npm run lint` for lint checks.

## Run with Docker

### Development

Start the development server with hot reload:

```bash
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000). Stop it with `Ctrl+C`, or run `docker compose down`.

Docker development uses Webpack with file polling so edits on the Windows host are detected inside the container. After changing `docker-compose.yml`, run `docker compose up -d` to apply the updated configuration.

### Production image

Build and run the optimized standalone image:

```bash
docker build -t energy-management .
docker run --rm -p 3000:3000 energy-management
```

The Dockerfile uses a multi-stage build so the final image contains only the standalone Next.js server and production assets.

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
