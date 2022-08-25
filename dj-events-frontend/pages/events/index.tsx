import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { DJEvent } from '@/models/event';
import { API_URL, PER_PAGE } from '@/config/index';
import { GetServerSideProps } from 'next';
import Pagination from '@/components/Pagination';

interface EventsPageProps {
  events: DJEvent[];
  page: number;
  total: number;
}
export default function EventsPage({ events, page, total }: EventsPageProps) {
  return (
    <Layout>
      <>
        <h1>Events</h1>
        {events.length === 0 && <h3>No events to show.</h3>}

        {events.map((evt) => (
          <EventItem key={evt.id} event={evt} />
        ))}

        <Pagination page={page} total={total} />
      </>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 1 },
}) => {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch events from the server
  const totalRes = await fetch(`${API_URL}/api/events/count`);
  const total = await totalRes.json();

  // Fetch events from the server
  const eventRes = await fetch(
    `${API_URL}/api/events?sort[0]=date:asc&pagination[start]=${start}&pagination[limit]=${PER_PAGE}&populate=*`
  );
  const { data: events }: { data: DJEvent[] } = await eventRes.json();

  return {
    props: { events, page: +page, total },
  };
};
