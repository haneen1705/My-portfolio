# Current outcome

- [x] The hero section is full-height on mobile screens without the reported lagging behavior. Keep the scroll animation; fix its behavior rather than disabling it. Preserve the desktop animation, reduced-motion support and the site-wide pause control.

Implemented native scroll-driven parallax with lighter, stable mobile travel and a compositor-ready transform. Typecheck and production build pass. Verified forward and reverse scrolling at 360×640, 390×844, 412×915, 430×932, 844×390 and 1440×900, including stable hero height, preserved desktop travel, no horizontal overflow, reduced-motion support and the pause control.
