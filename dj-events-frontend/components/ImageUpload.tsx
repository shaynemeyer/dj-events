import React, { useState } from 'react';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

interface ImageUploadProps {
  evtId: string;
  imageUploaded: () => void;
}

export default function ImageUpload({
  evtId,
  imageUploaded,
}: ImageUploadProps) {
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'api::event.event');
    formData.append('refId', evtId);
    formData.append('field', 'image');
    console.log(JSON.stringify(formData));

    const res = await fetch(`${API_URL}/api/upload?populate=*`, {
      method: 'POST',
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement | null>) => {
    if (e.target?.files) {
      setImage(e.target?.files[0]);
    }
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
