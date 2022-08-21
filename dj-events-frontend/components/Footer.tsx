import Link from "next/link";
import React from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Events {thisYear}</p>
      <p>
        <Link href="/about">About This Project</Link>
      </p>
    </footer>
  );
}
