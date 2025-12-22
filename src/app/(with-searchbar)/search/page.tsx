import MovieItem from "@/components/movie-item";
import styles from "./page.module.css";
import movies from "@/mock/movies.json";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
