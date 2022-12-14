import type { NextPage, InferGetServerSidePropsType } from 'next';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { DJEvent } from '@/models/event';
import styles from '@/styles/Home.module.css';
import EventItem from '@/components/EventItem';
import Link from 'next/link';

interface HomePageProps {
  events: DJEvent[];
}

const HomePage: NextPage<HomePageProps> = ({
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <>
        <h1>Upcoming Events</h1>
        {events.length === 0 && <h3>No events to show.</h3>}

        {events.map((evt: DJEvent) => (
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
  const res = await fetch(
    `${API_URL}/api/events?_sort=date:ASC&_limit=3&populate=*`
  );
  const { data: events }: { data: DJEvent[] } = await res.json();

  return {
    props: { events },
  };
}

export default HomePage;
