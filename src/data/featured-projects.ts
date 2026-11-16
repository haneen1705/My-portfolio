export type FeaturedProject = {
  slug: string;
  title: string;
  kind: string;
  tags: string;
  description: string;
  cover: string;
  width: number;
  height: number;
  alt: string;
  href: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "yume",
    title: "YUME",
    kind: "E-commerce · Web design",
    tags: "E-COMMERCE · WEB DESIGN",
    description:
      "A handmade crochet storefront built to feel personal and tactile, from first scroll to checkout.",
    cover: "/assets/projects/yume.webp",
    width: 1200,
    height: 854,
    alt: "YUME logo on a dusty rose paper texture",
    href: "https://www.behance.net/gallery/254810287/YUME-Handmade-Crochet-E-Commerce-UI-UX-Web-design",
  },
  {
    slug: "dukkan",
    title: "Dukkan",
    kind: "Marketplace · Mobile app",
    tags: "CASE STUDY · MOBILE APP",
    description:
      "An Arabic-first Saudi marketplace app, from user research and flows to a full buying and selling experience.",
    cover: "/assets/projects/dukkan.webp",
    width: 1200,
    height: 1188,
    alt: "Dukkan marketplace home screen held in a hand",
    href: "https://www.behance.net/gallery/253454509/Dukkan-Saudi-Marketplace-UIUX-Design-Case-Study",
  },
  {
    slug: "commerza",
    title: "Commerza",
    kind: "Dashboard · Web app",
    tags: "DASHBOARD · WEB APP",
    description:
      "A clean, scalable e-commerce dashboard on a 12-column grid, built around clarity and fast decisions.",
    cover: "/assets/projects/commerza.webp",
    width: 1200,
    height: 900,
    alt: "Commerza dashboard on a tablet",
    href: "https://www.behance.net/gallery/250665545/Commerza-E-commerce-Dashboard-UIUX-Design",
  },
  {
    slug: "zeyphr",
    title: "Zeyphr",
    kind: "AI assistant · Mobile app",
    tags: "CASE STUDY · MOBILE APP",
    description:
      "A futuristic AI companion that folds chat, voice, image generation and memory into one Gen-Z friendly app.",
    cover: "/assets/projects/zeyphr.webp",
    width: 1200,
    height: 900,
    alt: "Three Zeyphr app screens on phones",
    href: "https://www.behance.net/gallery/248932397/Zeyphr-UIUX-Personalized-AI-Assistant-Mobile-App",
  },
  {
    slug: "zad",
    title: "ZAD",
    kind: "Smart shopping · Mobile app",
    tags: "CASE STUDY · MOBILE APP",
    description:
      "An AI-powered grocery app for the Saudi market: smart lists, subscriptions and personalised offers.",
    cover: "/assets/projects/zad.webp",
    width: 1200,
    height: 1158,
    alt: "ZAD Market grocery app on a phone beside a rock",
    href: "https://www.behance.net/gallery/240022005/ZAD-Market-Smart-Hypermarket-for-Saudi-Market",
  },
];
