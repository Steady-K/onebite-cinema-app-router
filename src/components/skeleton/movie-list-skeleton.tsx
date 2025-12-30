import MovieItemSkeleton from "./movie-item-skeleton";
import styles from "./movie-list-skeleton.module.css";

type Variant = "reco" | "list";

export default function MovieListSkeleton({
  count,
  variant,
}: {
  count: number;
  variant: Variant;
}) {
  return (
    <div className={styles[variant]}>
      {new Array(count).fill(0).map((_, idx) => (
        <MovieItemSkeleton
          variant={variant}
          key={`movie-item-skeleton-${idx}`}
        />
      ))}
    </div>
  );
}
1;
