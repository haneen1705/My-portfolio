# Haneen — Personal Brand

A Next.js App Router + TypeScript implementation of the supplied Figma Home frame, with original local assets, Newake/Inter typography, responsive layouts, hero-to-about parallax, and rotating contact text around a fixed mail icon.

## Run

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Next.js. Production checks: `npm run build` and `npm run typecheck`. Run the production server with `npm start`.

## Edit content

- `src/data/site.ts`: email and social URLs. Email is currently blank; contact links lead to the contact section and LinkedIn until an address is provided.
- `src/data/projects.json`: project records. The list starts empty because no project case studies were supplied. Work links to the real Behance profile in the meantime.
- `public/projects/`: add your project photos here and reference them as `/projects/filename.webp`.
- `src/lib/projects.ts`: typed project model and storage reader. Replace this reader with a database/CMS adapter when needed; page components do not need to change.

Example project record:

```json
{
  "slug": "project-name",
  "title": "Project name",
  "category": "Product design",
  "description": "Your case study summary.",
  "cover": "/projects/cover.webp",
  "photos": [
    {
      "src": "/projects/cover.webp",
      "alt": "Describe the project image",
      "width": 1200,
      "height": 900
    }
  ],
  "published": true
}
```

Put records inside the JSON array. After changing content, rebuild for production. `/work/[slug]` displays the corresponding published case study. Unknown or unpublished slugs return 404.

Storage is currently versioned local JSON plus local images. There is no database, upload service, admin dashboard, authentication, or remote write API yet. This is an extensible frontend foundation, not a deployed content management system.

## Motion

The supplied lime cat paw is displayed as a 48px desktop cursor across the site. Mouse movement leaves alternating 32px paw prints every 42 pixels, fading from 30% opacity over 0.9 seconds. A pool of 48 prints bounds memory use. Prints are decorative, do not intercept input, and clear on route changes. Touch interaction, reduced-motion preferences, and Pause motion disable the trail. The static paw cursor remains available with reduced motion. The `motion` guide informed opacity-only fading and motion-preference handling.

The `parallax-scroll-effects` modern-web-guidance guide informed native CSS view timelines with both timeline/range feature checks. Hero moves more slowly while About scrolls over it on desktop and mobile; unsupported browsers receive the normal static layout. Reduced-motion preferences disable parallax and rotation. The footer has a Pause motion control; hovering or focusing the contact ring also pauses its rotation. Navigation and the circular contact button remain fixed while scrolling.

The supplied shooting-stars animation plays behind About using Lottie. Its JSON is extracted from the original `.lottie` archive. The player loads when needed, pauses offscreen or in a hidden tab, and honors reduced motion and the footer motion control.

## Design and fonts

The original Figma assets are stored in `public/assets`. The Home frame supplied contains Hero and About; About/Work routes and the contact footer are complementary additions using supplied copy and real social links. No projects or testimonials have been invented.

Newake was found in your local Downloads folder. Its included license is personal-use-only; obtain an appropriate commercial license before commercial publication. Inter is locally hosted. This project has not been published.

References: [Figma design](https://www.figma.com/design/g5OwDa5kaegobBprEtElUO/Personal-brand?node-id=83-206), [Archer motion reference](https://archar.framer.website/), [Metakey motion reference](https://www.themetakey.com/), [Next.js documentation](https://nextjs.org/docs/app), [Vercel interface guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).

## Mobile navigation

At widths of 900px and below, the header shows the HM logo and a hamburger button. The button opens a full-screen navigation dialog sliding down from above. Selecting a link, pressing Escape, or using Close dismisses it. Desktop retains inline navigation. Reduced motion and Pause motion disable the entrance animation.

The modern-web-guidance guides dialog and prevent-page-scroll-under-modal-dialog informed native modal focus handling and scroll containment. Browser checks covered opening, full viewport coverage, About navigation, Escape dismissal, focus return, and desktop navigation visibility.

