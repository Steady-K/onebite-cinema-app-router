"use client";

import { MovieData } from "@/types";
import Link from "next/link";
import styles from "./movie-item.module.css";

export default function MovieItem(props: MovieData) {
  return (
    <Link className={styles.container} href={`/movie/${props.id}`}>
      <img src={props.posterImgUrl} />
    </Link>
  );
}
