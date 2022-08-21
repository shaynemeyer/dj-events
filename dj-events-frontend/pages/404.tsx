import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
import React from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";

export default function NotFoundPage() {
  return (
    <Layout>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> 404
        </h1>
        <h4>Sorry, we could not find what you're looking for.</h4>
        <Link href="/">Go Back Home</Link>
      </div>
    </Layout>
  );
}
