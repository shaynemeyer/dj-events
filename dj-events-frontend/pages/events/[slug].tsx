import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import { DJEvent } from '@/models/event';
import { API_URL } from '@/config/index';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface EventPageProps {
  event: DJEvent;
}

export default function EventPage({ event }: EventPageProps) {
  const router = useRouter();

  const deleteEvent = async (e: React.MouseEvent<HTMLElement>) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const res = await fetch(`${API_URL}/api/events/${event.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }
  };

  return (
    <Layout>
      <div>
        <div className={styles.event}>
          <div className={styles.controls}>
            <Link href={`/events/edit/${event.id}`}>
              <a>
                <FaPencilAlt /> Edit Event
              </a>
            </Link>{' '}
            <a href="#" onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </div>
        </div>
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
        <ToastContainer />
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
