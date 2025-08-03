'use client';

import { useRef } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const action = async (formData: FormData) => {
    const query = formData.get('query')?.toString().trim() || '';

    if (!query) {
      toast.error('Please enter a search query');
      return;
    }

    onSearch(query);
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} action={action} className={styles.form}>
      <input
        type="text"
        name="query"
        placeholder="Search movies..."
        className={styles.input}
        aria-label="Search movies"
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}