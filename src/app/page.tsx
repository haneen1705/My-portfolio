import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { TalkButton } from "@/components/talk-button";
import { MotionControl } from "@/components/motion-control";
import { MobileMenu } from "@/components/mobile-menu";
import { ShootingStars } from "@/components/shooting-stars";
import { ProjectDeck } from "@/components/project-deck";
import { featuredProjects } from "@/data/featured-projects";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a className="role" href="#main">
          Product Designer
        </a>
        <a className="logo" href="#main" aria-label="Haneen home">
          <img
            src="/assets/609d0.svg"
            width="132"
            height="78"
            alt="HM, with a black cat"
          />
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <Link href="/work">Work</Link>
          <a href="#contact">Contact</a>
        </nav>
        <MobileMenu />
      </header>
      <main id="main">
        <div className="hero-scroll-stage">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-media">
            <Image
              src="/assets/5b0e4.png"
              alt="A designer and her black cat at a desk overlooking a rainy city at night"
              fill
              sizes="100vw"
              priority
              quality={90}
            />
          </div>
          <div className="hero-shade" />
          <h1 id="hero-title">
            a little <span>chaos</span>.<br />a lot of intention.
          </h1>
          <div className="hero-bottom">
            <p>work fast, live slow</p>
            <div className="follow">
              <p>Follow the journey</p>
              <div className="socials">
                {site.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    className={s.name === "Behance" ? "behance" : ""}
                  >
                    <img
                      src={`/assets/${s.icon}`}
                      width={s.size}
                      height={s.size}
                      alt=""
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        </div>
        <section className="about" id="about" aria-labelledby="about-title">
          <ShootingStars />
          <div className="grid-art" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`grid-tile tile-${i}`}>
                <img
                  src="/assets/017b1.png"
                  alt=""
                  width="1236"
                  height="1073"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="about-intro">
            <h2 id="about-title">
              <span className="section-label">[/about]</span>a product designer
              turning chaos to clear, thoughtful experiences.
            </h2>
            <div className="about-description">
              <p>
                my creative world runs on iced coffee, curiosity, and black cat
                energy.
              </p>
              <p>
                drawn to expressive visuals and quiet details the kind that make
                you pause, look closer, and feel something.
              </p>
            </div>
          </div>
          <div className="portrait">
            <Image
              src="/assets/about-portrait.png"
              alt="Haneen sitting beside her black cat"
              width={1377}
              height={1142}
              quality={90}
              sizes="(max-width: 900px) 100vw, 62vw"
            />
          </div>
          <div className="identity">
            <p>
              Design’s <span>black cat</span>
            </p>
            <h3>
              {site.name}
              <img
                className="curved-arrow"
                src="/assets/cf9a6.svg"
                width="300"
                height="110"
                alt=""
                loading="lazy"
              />
            </h3>
            <Link className="button" href="/about">
              Learn more about me
              <img src="/assets/aa06c.svg" width="24" height="24" alt="" />
            </Link>
          </div>
        </section>
        <ProjectDeck items={featuredProjects} />
        <footer id="contact">
          <div>
            <p className="section-label">[/contact]</p>
            <h2>
              Have a project? <span>Let’s talk.</span>
            </h2>
            <a
              className="contact-link"
              href={site.email ? `mailto:${site.email}` : site.socials[1].href}
            >
              {site.email || "Connect with me on LinkedIn"}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <MotionControl />
        </footer>
      </main>
      <TalkButton />
    </>
  );
}
