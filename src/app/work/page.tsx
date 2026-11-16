import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/projects";
import { site } from "@/data/site";
export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <main className="inner-page">
      <Link className="back-link" href="/">
        ← Home
      </Link>
      <p className="section-label">[/work]</p>
      <h1>
        A little chaos.
        <br />
        <span>A lot of intention.</span>
      </h1>
      {projects.length ? (
        <div className="projects">
          {projects.map((p) => (
            <Link href={`/work/${p.slug}`} key={p.slug}>
              <Image
                src={p.cover}
                alt={p.title}
                width={1200}
                height={900}
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <p>{p.category}</p>
              <h2>{p.title}</h2>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-work">
          <h2>Explore my work on Behance.</h2>
          <p>
            Case studies will be added here. In the meantime, take a look at my
            portfolio.
          </p>
          <a className="button" href={site.socials[0].href}>
            View my Behance ↗
          </a>
        </div>
      )}
    </main>
  );
}
