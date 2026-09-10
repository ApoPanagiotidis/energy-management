# Apollo Green Solutions

A responsive energy-management website for an industrial and commercial audience, built as a web developer assignment using Apollo Green Solutions branding and company information.

- **Repository:** [ApoPanagiotidis/energy-management](https://github.com/ApoPanagiotidis/energy-management)
- **Live demo:** Pending Vercel deployment. Replace this line with the verified public URL before submission.
- **Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide icons, Docker, Mailpit, and Resend.

## Features and structure

| Route | Content |
| --- | --- |
| Home | Hero, energy-flow illustration, business benefits, solutions, contact CTA |
| Products | Four hardware products with specifications and enquiry links |
| About | Company background, mission, and team |
| Contact | Validated name, email, and message form with pending, success, and error states |

Pages and metadata render on the server. Small client components handle active navigation, animations, and form interaction. Product and team content live in `src/lib/products.ts` and `src/lib/team.ts`; delivery configuration stays in the server-side contact helper.

## Quick start

Install Docker Desktop, then run:

```bash
docker compose up --build
```

Open [the website](http://localhost:3000) and [the development inbox](http://localhost:8025).

Without Docker for the app, use Node.js 22.18 or newer, run `npm ci`, copy `.env.example` to `.env.local`, start Mailpit with `docker compose up -d mailpit`, and run `npm run dev`.

## Checks

```bash
npm test
npm run lint
npm run build
```

Tests cover validation, local inbox capture, production recipient selection, missing configuration, and provider failures. The email provider is mocked in tests; running them sends no live email.

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

## Motion, accessibility, and social previews

Framer Motion powers the shared `Reveal` component: cards enter when scrolled into view, and `src/app/template.tsx` gives each page a short entry transition. The shared header and footer stay in place during navigation. The contact button also has hover and press feedback. All page content starts visible in the server HTML, and the device's reduced-motion preference disables these animations. See the [Motion reduced-motion guide](https://motion.dev/docs/react-use-reduced-motion).

Navigation has an active-page indicator, visible keyboard focus, and a skip-to-content link. Contact errors are announced and focus moves to the first invalid field. Input borders and placeholder text use stronger contrast.

Each page defines its own title, description, canonical URL, Open Graph, and Twitter metadata through `src/lib/metadata.ts`. `src/app/opengraph-image.tsx` generates a shared 1200 by 630 branded PNG with Next.js `ImageResponse`; inline styles are used only inside this image renderer because it does not load the website's Tailwind CSS. The supplied logo is also copied unchanged to `src/app/icon.jpg` for the browser icon.

Set `SITE_URL` to your public origin before building on hosts other than Vercel. On Vercel, leave it unset to use `VERCEL_PROJECT_PRODUCTION_URL`, with `VERCEL_URL` as a fallback. Locally it defaults to `http://localhost:3000`. An explicit `SITE_URL` always wins, so do not copy the localhost value into Vercel. This is the assignment's URL, not the real company's domain. Social networks cannot fetch localhost previews. `/sitemap.xml` lists the four pages; `/robots.txt` discourages crawling local and Vercel preview deployments.

To review this batch locally, navigate through all four pages, scroll the cards into view, and check a narrow mobile viewport. Press Tab from a fresh page to reach the skip link. Enable reduced motion in your device settings and reload to check that movement stops. The generated preview is available at `/opengraph-image`.

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

**Production delivery:** Production uses Resend when `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` are configured. The recipient and sender come from server settings; the visitor's email is used only as Reply-To. The message is plain text. Missing settings, rejected requests, and malformed provider responses produce an unavailable response. Success means the provider accepted the message for delivery; it does not confirm inbox arrival. Development always uses Mailpit, even when Resend settings exist.

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
docker build --build-arg SITE_URL=https://your-project.example -t energy-management .
docker run --rm -p 3000:3000 --env-file .env.production.local energy-management
```

The Dockerfile uses a multi-stage build and runs the standalone server as a non-root user. Replace the example build URL with your actual origin. Create an ignored `.env.production.local` containing the three email settings for this command; pass credentials at runtime, never as image build arguments.

## Deploy on Vercel

1. Commit this batch in GitHub Desktop, then click **Push origin**.
2. In [Vercel New Project](https://vercel.com/new), import `ApoPanagiotidis/energy-management`. Use the Next.js preset, repository root, and Node.js 22.x or newer. Keep the detected install/build/output settings. Vercel builds Next.js directly; Docker Compose and Mailpit remain local tools.
3. Create a [Resend account](https://resend.com/) and a sending API key. Add the following variables to the Vercel project's **Production** environment:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Your private sending API key |
| `CONTACT_FROM_EMAIL` | `onboarding@resend.dev` for the assignment demonstration |
| `CONTACT_TO_EMAIL` | The email address used to register your Resend account |
| `SITE_URL` | Optional: your full public origin; otherwise use Vercel's automatic domain |

The Resend test sender can send only to your account address. To use another recipient, verify a domain you control and set a sender on that domain. See [Resend's test-domain restriction](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain) and [sending API](https://resend.com/docs/api-reference/emails/send-email). Never use the real company's address or domain unless you have its permission. Keep credentials in Vercel settings or ignored local env files, not GitHub or client-facing variables.

4. Deploy. After changing environment variables, redeploy for the changes to take effect. Preview deployments need their own email settings to send; leaving them unset keeps the form unavailable there.
5. Open the deployed Home, Products, About, and Contact pages on desktop and mobile. Submit a clearly labelled test enquiry to your own configured inbox and confirm receipt. Also try an invalid email and a short message.
6. Check `/opengraph-image`, `/sitemap.xml`, and page-source canonical/social URLs. Confirm none point to localhost. Open the production link in a private browser window to confirm the reviewer can access it.
7. Replace the **Live demo** line at the top of this README with the verified URL. Confirm the GitHub repository is public, as required by the assignment, then commit and push that final documentation update.

## Scope and remaining checks

This is an assignment demonstration, not the company's official website. It contains no live energy telemetry, CMS, customer accounts, or fabricated performance statistics. Team cards use initials, and company/product sources are linked above.

Local email tests use Mailpit. Resend integration tests use mocked responses; actual inbox delivery and the public deployment must be verified after account configuration. The API validates fields and caps accepted payload size, but this demonstration does not include a distributed rate limiter or CAPTCHA. Configure abuse protection before using the form as an actively promoted public contact channel.
