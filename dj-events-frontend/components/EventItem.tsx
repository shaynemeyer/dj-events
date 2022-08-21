import React from "react";
import styles from "@/styles/EventItem.module.css";
import { DJEvent } from "@/models/event";
import Image from "next/image";
import Link from "next/link";

interface EventItemProps {
  event: DJEvent;
}

export default function EventItem({ event }: EventItemProps): JSX.Element {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={event.image ? event.image : "/images/event-default.png"}
          height={100}
          width={170}
        />
      </div>
      <div className={styles.info}>
        <span>
          {event.date} at {event.time}
        </span>
        <h3>{event.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${event.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
