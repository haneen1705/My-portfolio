import Link from "next/link";
export default function NotFound() {
  return (
    <main className="inner-page">
      <h1>Nothing here yet.</h1>
      <Link className="button" href="/work">
        Explore my work
      </Link>
    </main>
  );
}
