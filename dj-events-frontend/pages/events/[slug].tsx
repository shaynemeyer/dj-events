import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import { DJEvent } from '@/models/event';
import { API_URL } from '@/config/index';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface EventPageProps {
  event: DJEvent;
}

export default function EventPage({ event }: EventPageProps) {
  return (
    <Layout>
      <div>
        <div className={styles.event}></div>
        <span>
          {new Date(event.attributes.date).toLocaleDateString('en-US')} at{' '}
          {event.attributes.time}
        </span>
        <h1>{event.attributes.name}</h1>
        {event.attributes.image.data && (
          <div className={styles.image}>
            <Image
              src={event.attributes.image.data.attributes.url}
              alt={event.attributes.image.data.attributes.alternativeText}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.attributes.performers}</p>

        <h3>Description:</h3>
        <p>{event.attributes.description}</p>
        <h3>Venue:</h3>
        <p>{event.attributes.venue}</p>

        <Link href="/events">
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { slug } = ctx.params as ParsedUrlQuery;
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
  );
  const { data: event }: { data: DJEvent[] } = await res.json();

  return {
    props: { event: event[0] },
  };
}
