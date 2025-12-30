import styles from "./movie-item-skeleton.module.css";

type Variant = "reco" | "list";
export default function MovieItemSkeleton({ variant }: { variant: Variant }) {
  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      <div className={styles.img}></div>
    </div>
  );
}
