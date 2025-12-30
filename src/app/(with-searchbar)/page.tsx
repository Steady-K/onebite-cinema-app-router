import MovieItem from "@/components/movie-item";
import styles from "./page.module.css";
import { MovieData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";

async function AllMovies() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }
  const allMovies: MovieData[] = await response.json();
  return (
    <div className={styles.all_container}>
      {allMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

async function RecoMovies() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 60 * 10 } }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }
  const recoMovies: MovieData[] = await response.json();
  return (
    <div className={styles.reco_container}>
      {recoMovies.map((movie) => (
        <MovieItem key={`reco-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <Suspense fallback={<MovieListSkeleton count={3} variant="reco" />}>
          <RecoMovies />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <Suspense fallback={<MovieListSkeleton count={18} variant="list" />}>
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
