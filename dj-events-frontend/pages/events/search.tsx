import qs from 'qs';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { DJEvent } from '@/models/event';
import { API_URL } from '@/config/index';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface EventsPageProps {
  events: DJEvent[];
}
export default function SearchPage({ events }: EventsPageProps) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <>
        <h1>Search Results for {router.query.term}</h1>
        {events.length === 0 && <h3>No events to show.</h3>}

        {events.map((evt) => (
          <EventItem key={evt.id} event={evt} />
        ))}
      </>
    </Layout>
  );
}

export async function getServerSideProps({
  query: { term },
}: {
  query: { term: string };
}) {
  const query = qs.stringify({
    filters: {
      $or: [
        {
          name: {
            $contains: term,
          },
        },
        {
          performers: {
            $contains: term,
          },
        },
        {
          description: {
            $contains: term,
          },
        },
        {
          venue: {
            $contains: term,
          },
        },
      ],
    },
  });

  /*
  Probably a cleaner solution but this works for now. 
  Read more on advanced filters here: 
  https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#complex-filtering
  */

  const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
  const { data: events }: { data: DJEvent[] } = await res.json();

  return {
    props: { events },
  };
}
