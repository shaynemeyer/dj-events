import React from 'react';
import styles from '@/styles/EventItem.module.css';
import { DJEvent } from '@/models/event';
import Image from 'next/image';
import Link from 'next/link';

interface EventItemProps {
  event: DJEvent;
}

export default function EventItem({ event }: EventItemProps): JSX.Element {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            event.attributes.image.data
              ? event.attributes.image.data.attributes.url
              : '/images/event-default.png'
          }
          height={100}
          width={170}
          alt={event.attributes.image.data.attributes.alternativeText}
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(event.attributes.date).toLocaleDateString('en-US')} at{' '}
          {event.attributes.time}
        </span>
        <h3>{event.attributes.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${event.attributes.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
