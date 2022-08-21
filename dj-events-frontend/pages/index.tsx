import type { NextPage, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { DJEvent } from "@/models/event";
import styles from "@/styles/Home.module.css";
import EventItem from "@/components/EventItem";
import Link from "next/link";

interface HomePageProps {
  events: DJEvent[];
}

const HomePage: NextPage<HomePageProps> = ({
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // console.log({ events });
  return (
    <Layout>
      <>
        <h1>Upcoming Events</h1>
        {events.length === 0 && <h3>No events to show.</h3>}

        {events.map((evt) => (
          <EventItem key={evt.id} event={evt} />
        ))}

        {events.length > 0 && (
          <Link href="/events">
            <a className="btn-secondary">View All Events</a>
          </Link>
        )}
      </>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events: DJEvent[] = await res.json();

  return {
    props: { events: events.slice(0, 3) },
  };
}

export default HomePage;
