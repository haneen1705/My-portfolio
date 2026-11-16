# Current outcomes

- [x] The hero section is full-height on mobile screens without the reported lagging behavior. Keep the scroll animation; fix its behavior rather than disabling it. Preserve the desktop animation, reduced-motion support and the site-wide pause control.

Implemented native scroll-driven parallax with lighter, stable mobile travel and a compositor-ready transform. Typecheck and production build pass. Verified forward and reverse scrolling at 360×640, 390×844, 412×915, 430×932, 844×390 and 1440×900, including stable hero height, preserved desktop travel, no horizontal overflow, reduced-motion support and the pause control.

- [x] Make the `[/projects]` tag match the attached About-tag reference using Inter, while preserving the main Projects heading.

Section tags explicitly use the locally loaded Inter family, avoiding inheritance from display-font headings. Verified Projects and About tags share the same regular weight, gray color and letter spacing at mobile and desktop sizes. The main Projects heading retains Newake. Typecheck and production build pass.

- [x] Center the Projects carousel's previous/next arrows and pagination beneath the cards on mobile and desktop, without an off-center pause button or phone-only horizontal offset.

Removed the phone-only left shift and positioned the desktop pause control outside the centered navigation group's layout. Verified exact arrow and pagination centering at 360px, 390px, 900px and 1440px viewport widths, plus working previous/next navigation and desktop pause. Typecheck and production build pass.
