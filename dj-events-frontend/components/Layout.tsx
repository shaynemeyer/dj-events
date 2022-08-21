import Head from "next/head";
import React from "react";
import styles from "@/styles/Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children?: JSX.Element | JSX.Element[];
}

const DefaultProps: LayoutProps = {
  title: "DJ Events",
  keywords: "music, dj, edm, events",
  description: "Find the latest DJ and other musical events",
};

export default function Layout({
  title,
  keywords,
  description,
  children,
}: LayoutProps): JSX.Element {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = DefaultProps;
