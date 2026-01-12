import "./globals.css";
import Link from "next/link";
import styles from "./layout.module.css";
import { ReactNode } from "react";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <header>
            <Link href={"/"}>ONEBITE CINEMA</Link>
          </header>
        </div>
        {children}
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
