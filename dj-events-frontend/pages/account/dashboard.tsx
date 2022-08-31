import React from 'react';
import Layout from '@/components/Layout';
import { parseCookies } from '@/helpers/index';
import { API_URL } from '@/config/index';
import { NextApiRequest } from 'next';
import { DJEvent } from '@/models/event';
import styles from '@/styles/Dashboard.module.css';
import DashboardEvent from '@/components/DashboardEvent';
interface DashboardProps {
  events: DJEvent[];
}

export default function dashboard({ events }: DashboardProps = { events: [] }) {
  const deleteEvent = (id: string) => {
    console.log('DELETE', { id });
  };
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((event) => (
          <DashboardEvent
            key={event.id}
            evt={event}
            handleDelete={deleteEvent}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: { events: events.data?.attributes?.data || [] },
  };
}
