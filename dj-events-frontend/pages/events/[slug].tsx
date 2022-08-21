import React, { AnchorHTMLAttributes } from "react";
import Layout from "@/components/Layout";
import { DJEvent } from "@/models/event";
import { API_URL } from "@/config/index";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";

interface EventPageProps {
  event: DJEvent;
}

export default function EventPage({ event }: EventPageProps) {
  const deleteEvent = (e: React.MouseEvent<HTMLElement>) => {
    console.log("delete", e);
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
            </Link>{" "}
            <a href="#" onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </div>
        </div>
        <span>
          {event.date} at {event.time}
        </span>
        <h1>{event.name}</h1>
        {event.image && (
          <div className={styles.image}>
            <Image src={event.image} width={960} height={600} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{event.performers}</p>

        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue:</h3>
        <p>{event.venue}</p>

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { slug } = ctx.params as ParsedUrlQuery;
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const event: DJEvent = await res.json();

  return {
    props: { event },
  };
}
