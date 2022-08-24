import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Search.module.css';

export default function Search() {
  const [term, setTerm] = useState<string>('');

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('');
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTerm(e.target.value)
          }
          placeholder="Search Events"
        />
      </form>
    </div>
  );
}
