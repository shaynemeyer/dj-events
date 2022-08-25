import React from 'react';
import { FaImage } from 'react-icons/fa';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { DJEvent, EventImage } from '@/models/event';
import format from 'date-fns/format';
import Image from 'next/image';
import ImageUpload from '@/components/ImageUpload';

interface EventValues {
  id?: number;
  name: string;
  performers: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  description: string;
  image?: EventImage;
}

interface EditEventPageProps {
  evt: EventValues;
}

export default function EditEventPage({ evt }: EditEventPageProps) {
  const [values, setValues] = React.useState<EventValues>({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const [imagePreview, setImagePreview] = React.useState(
    evt.image?.data ? evt.image?.data?.attributes?.formats?.thumbnail.url : null
  );
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }

    const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: values }),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included');
        return;
      }
      toast.error('Something Went Wrong');
    } else {
      const { data }: { data: DJEvent } = await res.json();
      const { slug } = data.attributes;
      router.push(`/events/${slug}`);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/api/events/${evt.id}?[populate]=*`);
    const { data: event }: { data: DJEvent } = await res.json();

    const { url } = event.attributes.image.data?.attributes.formats.thumbnail;

    setImagePreview(url);
    setShowModal(false);
  };

  return (
    <Layout title="Edit Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer position="top-center" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={format(new Date(values.date), 'yyyy-MM-dd')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} alt="Preview" />
      ) : (
        <div>No image uploaded.</div>
      )}
      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Image Upload"
      >
        <ImageUpload imageUploaded={imageUploaded} evtId={`${evt.id}`} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { id } = ctx.params as ParsedUrlQuery;
  const res = await fetch(
    `${API_URL}/api/events?filters[id][$eq]=${id}&populate=*`
  );
  const { data: event }: { data: DJEvent[] } = await res.json();
  const { name, performers, venue, address, date, time, description, image } =
    event[0].attributes;
  return {
    props: {
      evt: {
        id: parseInt(id as string),
        name,
        performers,
        venue,
        address,
        date,
        time,
        description,
        image,
      },
    },
  };
}
