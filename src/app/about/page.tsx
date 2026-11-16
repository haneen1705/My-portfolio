import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
export default function AboutPage() {
  return (
    <main className="inner-page">
      <Link className="back-link" href="/">
        ← Home
      </Link>
      <p className="section-label">[/about]</p>
      <h1>{site.name}</h1>
      <div className="bio">
        <Image
          src="/assets/about-portrait.png"
          alt="Haneen and her black cat"
          width={1377}
          height={1142}
          quality={90}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
        <div>
          <h2>
            Design’s <span>black cat.</span>
          </h2>
          <p>
            A product designer turning chaos to clear, thoughtful experiences.
          </p>
          <p>
            My creative world runs on iced coffee, curiosity, and black cat
            energy. Drawn to expressive visuals and quiet details, the kind that
            make you pause, look closer, and feel something.
          </p>
          <Link className="button" href="/#contact">
            Let’s talk ↗
          </Link>
        </div>
      </div>
    </main>
  );
}
