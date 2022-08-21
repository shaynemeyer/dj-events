import React from "react";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { DJEvent } from "@/models/event";
import { API_URL } from "@/config/index";

interface EventsPageProps {
  events: DJEvent[];
}
export default function EventsPage({ events }: EventsPageProps) {
  return (
    <Layout>
      <>
        <h1>Events</h1>
        {events.length === 0 && <h3>No events to show.</h3>}

        {events.map((evt) => (
          <EventItem key={evt.id} event={evt} />
        ))}
      </>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events: DJEvent[] = await res.json();

  return {
    props: { events },
  };
}
