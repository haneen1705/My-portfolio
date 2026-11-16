import records from "@/data/projects.json";

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  cover: string;
  photos: { src: string; alt: string; width: number; height: number }[];
  published: boolean;
};

// A single storage boundary: replace this reader with your database or CMS later.
export async function getProjects(): Promise<Project[]> {
  return (records as Project[]).filter((project) => project.published);
}
