# Apollo Green Solutions

<img src="public/images/apollo-logo.jpg" alt="Apollo Green Solutions logo" width="64" height="64" />

**Make every watt count.**

A responsive B2B website presenting energy monitoring hardware, software, and expertise for industrial and commercial facilities. Built as a web developer assignment using Apollo Green Solutions branding and company information.

**[View the live demo](https://energy-management-rosy.vercel.app)** · **[GitHub repository](https://github.com/ApoPanagiotidis/energy-management)**

> **Contact delivery is local only.** Run the project with Docker to submit enquiries to Mailpit. The public website displays the form and validates inputs, but valid submissions return a delivery-unavailable message because live email is not configured.

## Contents

- [Features](#features)
- [Technology and design](#technology-and-design)
- [Run locally](#run-locally)
- [Project structure](#project-structure)
- [Verification](#verification)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Content sources and scope](#content-sources-and-scope)

## Features

| Page | What it includes |
| --- | --- |
| `/` — Home | Hero, energy-flow illustration, business benefits, solutions, and contact calls to action |
| `/products` — Products | Four hardware products with descriptions, specifications, enquiry links, and original product sources |
| `/about` — About | Company background, mission, operations, and team cards |
| `/contact` — Contact | Name, email, and message form with validation, pending feedback, success messages, and recoverable errors |

- Responsive layouts with shared branding and an active-page indicator.
- A desktop **Get in touch** button and mobile **Contact** navigation link; footer navigation contains Home, Products, and About.
- Framer Motion scroll reveals and CSS button interactions that respect reduced-motion preferences. Page backgrounds remain visible and stationary during loading and navigation.
- CTA and specification-link arrows move 2 px on hover or keyboard focus over 180 ms. Buttons press to 98% size over 150 ms, including on touch screens. Reduced motion disables movement, and the contact button stays still while sending.
- Product and team cards reveal once as they enter view, with an 80 ms stagger across each row. Delays adapt to the two-column product grid and two-/three-column team grid; single-column mobile cards have no extra delay. Reduced motion skips both movement and delay.
- The energy-flow diagram highlights Measure, Understand, and Improve in order, with a small arrow movement between steps. The three-second sequence plays once per page visit when most of the diagram enters view, and is disabled with reduced motion. All text and the blue background remain visible throughout.
- Visible keyboard focus, a skip-to-content link, an accessible Back to top link, and announced form errors.
- Page-specific titles, descriptions, canonical URLs, Open Graph and Twitter metadata, a branded social image, sitemap, and robots rules.

## Technology and design

| Technology | Role |
| --- | --- |
| Next.js 16 App Router + React 19 | Routing, server-rendered pages, metadata, and contact API |
| TypeScript | Typed content, components, and validation |
| Tailwind CSS 4 | Responsive layouts and shared colour tokens |
| Framer Motion | Scroll reveals and microinteractions |
| Lucide React | Interface and feature icons |
| Docker Compose + Mailpit | Local development and a test inbox |
| Node.js test runner + ESLint | Validation/delivery tests and code checks |
| Vercel | Website hosting |

An optional Resend HTTP integration is implemented but inactive without production credentials. Exact dependency versions are recorded in [package.json](package.json) and [package-lock.json](package-lock.json).

### Visual identity

The core palette was sampled from the [Apollo Green Solutions website](https://www.apollo-gs.com/) and is defined in [globals.css](src/app/globals.css).

| Colour | Hex | Use |
| --- | --- | --- |
| Black | `#000000` | Header, hero, footer, and body text |
| White | `#FFFFFF` | Content surfaces and text on dark backgrounds |
| Blue | `#020CB1` | Headings, buttons, illustrations, and CTA sections |
| Pale green | `#E3F5B9` | Highlights, active navigation, buttons, and supporting sections |

Large headings and spacious sections establish a clear reading order. Product specifications use definition lists for quick comparison. Team cards use initials, and the homepage illustration explains the monitoring process without presenting simulated data as live telemetry.

The supplied logo is stored unchanged in [public/images/apollo-logo.jpg](public/images/apollo-logo.jpg) and reused in the header, footer, browser icon, and social preview. Geist fonts are loaded through `next/font`. Website styling uses Tailwind; the social image uses inline styles because Next.js `ImageResponse` renders outside the browser stylesheet.

## Run locally

### Docker — app and inbox together

**Prerequisites:** Git and Docker Desktop with the Docker engine running.

```bash
git clone https://github.com/ApoPanagiotidis/energy-management.git
cd energy-management
docker compose up --build
```

| Service | Local address |
| --- | --- |
| Website | [localhost:3000](http://localhost:3000) |
| Contact form | [localhost:3000/contact](http://localhost:3000/contact) |
| Mailpit inbox | [localhost:8025](http://localhost:8025) |

No email account, API key, or `.env.local` file is needed for this workflow. Compose supplies the internal Mailpit address automatically.

Submit a test enquiry through Contact, then open Mailpit to read it. Messages are plain text and use `apollo.example` test addresses; they are not sent to the real company. The inbox is bound to the local machine and its Docker volume preserves messages across restarts.

Press `Ctrl+C` to stop an attached run. To start in the background or stop the services:

```bash
docker compose up -d
docker compose down
```

Development uses Webpack and file polling so Windows host edits are detected inside Docker. After changing Compose settings, run `docker compose up -d` again.

### Node.js app with a Docker inbox

Use Node.js **22.18 or newer**, npm, and Docker Desktop. From the repository root:

```bash
npm ci
docker compose up -d mailpit
```

Copy `.env.example` to `.env.local`. In PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Then start the app:

```bash
npm run dev
```

The example uses `MAILPIT_URL=http://localhost:8025` for the host-run app. If the Docker app already occupies port 3000, stop just that service with `docker compose stop app` before starting Node.js.

## Project structure

```text
src/
  app/
    page.tsx                 Home page
    products/page.tsx        Product catalogue
    about/page.tsx           Company and team
    contact/page.tsx         Contact page
    api/contact/route.ts     Validated submission endpoint
    layout.tsx               Shared layout, fonts, and metadata base
    template.tsx             Stable page wrapper
    globals.css              Tailwind theme and brand colours
    opengraph-image.tsx       Generated social preview
    robots.ts / sitemap.ts   Search engine metadata
  components/                Shared UI, contact form, and motion wrapper
  lib/
    products.ts / team.ts    Editable product and team content
    navigation.ts            Shared route definitions
    contact.ts               Browser and server validation
    contact-delivery.ts      Mailpit and optional email delivery
    metadata.ts              Page metadata and deployment URLs
public/images/               Supplied company logo
tests/contact.test.mjs        Validation and delivery tests
```

Pages remain Server Components. Small Client Components handle active navigation, form state, and animation. Content starts visible in server-rendered HTML before motion is applied.

## Verification

Run these commands after installing dependencies:

```bash
npm test
npm run lint
npm run build
```

Tests cover validation, normalization, field length limits, local capture, fixed production recipients, missing settings, and provider failures. Production email responses are mocked; the suite sends no live email. The production build also checks TypeScript.

### Reviewer checklist

- Open all four pages on desktop and mobile and check for horizontal overflow.
- Navigate with the keyboard; check the skip link, visible focus, and Back to top link.
- Enable reduced motion in device settings and confirm that movement stops.
- Submit empty fields, an invalid email, and a message shorter than 10 characters. Confirm the first invalid field receives focus.
- Submit a valid enquiry locally and confirm it appears in Mailpit and the form clears.
- On the public deployment, confirm submission shows an unavailable message and preserves the entered text.
- Open `/opengraph-image`, `/sitemap.xml`, and `/robots.txt`; check that production canonical and social URLs use the deployed domain.

### Troubleshooting

| Symptom | Check |
| --- | --- |
| Port 3000 is already in use | Run either the Docker app or the host Node.js app on that port |
| Local form cannot deliver | Confirm Mailpit is running and `MAILPIT_URL` matches the chosen workflow |
| Docker edits are not reflected | Keep the Compose Webpack/polling settings and apply configuration changes with `docker compose up -d` |
| Build cannot download Geist fonts | The build needs access to Google Fonts; check network or proxy settings |
| Vercel reports missing `next-server.js.nft.json` | Deploy the latest `next.config.ts`, which disables standalone output on Vercel |

## Deployment

### Vercel

1. Commit changes and push the repository to GitHub.
2. Import `ApoPanagiotidis/energy-management` at [Vercel New Project](https://vercel.com/new).
3. Use the **Next.js** preset, repository root (`./`), and `master` production branch. Keep the detected build/output settings.
4. For the current local-only contact setup, leave environment variables empty. Remove automatically detected `MAILPIT_URL`, localhost `SITE_URL`, and email settings.
5. Deploy, then open the production URL in a private browser window to check reviewer access. Confirm the repository is public before assignment submission.

Vercel builds the app directly. Docker Compose and Mailpit remain local tools. The configuration disables standalone output when `VERCEL=1`, avoiding the [Next.js 16.3 adapter/standalone tracing conflict](https://github.com/vercel/next.js/issues/96646); Docker builds keep standalone output.

The deployed URL is linked at the top of this README. Update that link if the production domain changes.

### Production Docker image

To preview production behavior locally, stop the development app if it uses port 3000, then run:

```bash
docker build -t energy-management .
docker run --rm -p 3000:3000 energy-management
```

The multi-stage image runs a standalone Next.js server as a non-root user. As on the unconfigured Vercel deployment, production submissions return an unavailable response; Mailpit is used only in development.

For a public Docker deployment, pass the actual public origin at build time:

```bash
docker build --build-arg SITE_URL=https://your-domain.example -t energy-management .
```

## Configuration

Use [.env.example](.env.example) as a reference. Keep actual secrets in ignored local env files or hosting settings.

| Variable | Purpose | Current setup |
| --- | --- | --- |
| `MAILPIT_URL` | Local inbox API address | Set by Compose, or `http://localhost:8025` for host development |
| `SITE_URL` | Explicit public origin for canonical/social URLs | Leave unset on Vercel; defaults to localhost outside a deployment |
| `RESEND_API_KEY` | Optional production email API key | Unset |
| `CONTACT_FROM_EMAIL` | Optional production sender | Unset on the deployment |
| `CONTACT_TO_EMAIL` | Optional production recipient | Unset |

Without `SITE_URL`, the app uses `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`, then `http://localhost:3000`. An explicit `SITE_URL` takes priority. Robots rules discourage crawling localhost and Vercel preview deployments.

### Optional live email

Resend support is implemented for future use; it is not required for local development. To enable it, configure all three email variables in the hosting environment and redeploy. The visitor's address is used as Reply-To; sender and recipient are fixed server settings. Development continues using Mailpit even if Resend credentials exist.

Resend's `onboarding@resend.dev` test sender can send only to the email associated with the Resend account. Other recipients require a sender on a verified domain. See [Resend's test-domain restriction](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain). Credentials belong in server settings, never `NEXT_PUBLIC_` variables.

A success response means the provider accepted the message for delivery, not that it reached the recipient's inbox. Live email delivery has not been verified in the current setup.

## Content sources and scope

The company website provided the reference material for the branding, product catalogue, and company overview:

- [KDK COUNT3 PRO](https://www.apollo-gs.com/product-page/kdk-count3-pro)
- [KDK COUNT3 CAGE CLAMP](https://www.apollo-gs.com/product-page/kdk-count3-cage-clamp-push-in)
- [KDK COUNT CT CAGE CLAMP](https://www.apollo-gs.com/product-page/kdk-count-ct-cage-clamp-push-in)
- [KDK CONVERTER](https://www.apollo-gs.com/product-page/kdk-converter-modbus-rtu-to-modbus-tcp)
- [Energy management systems](https://www.apollo-gs.com/energy-management)
- [Company history and mission](https://www.apollo-gs.com/about-us)

Team content is maintained separately in `src/lib/team.ts`; the cards use initials and should not be treated as a verified current company staff directory.

This repository is an assignment demonstration, not the company's official website. It does not include live energy telemetry, a CMS, customer accounts, or invented savings statistics. The public contact form does not deliver messages under the selected local-only configuration. Distributed rate limiting and CAPTCHA are outside the current implementation.
