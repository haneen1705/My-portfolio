import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/projects";
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) notFound();
  return (
    <main className="inner-page">
      <Link className="back-link" href="/work">
        ← All work
      </Link>
      <p>{project.category}</p>
      <h1>{project.title}</h1>
      <p className="project-description">{project.description}</p>
      <div className="project-gallery">
        {project.photos.map((photo) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="90vw"
          />
        ))}
      </div>
    </main>
  );
}
