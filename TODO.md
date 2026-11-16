# Current outcomes

- [x] The hero section is full-height on mobile screens without the reported lagging behavior. Keep the scroll animation; fix its behavior rather than disabling it. Preserve the desktop animation, reduced-motion support and the site-wide pause control.

Implemented native scroll-driven parallax with lighter, stable mobile travel and a compositor-ready transform. Typecheck and production build pass. Verified forward and reverse scrolling at 360×640, 390×844, 412×915, 430×932, 844×390 and 1440×900, including stable hero height, preserved desktop travel, no horizontal overflow, reduced-motion support and the pause control.

- [x] Make the `[/projects]` tag match the attached About-tag reference using Inter, while preserving the main Projects heading.

Section tags explicitly use the locally loaded Inter family, avoiding inheritance from display-font headings. Verified Projects and About tags share the same regular weight, gray color and letter spacing at mobile and desktop sizes. The main Projects heading retains Newake. Typecheck and production build pass.
