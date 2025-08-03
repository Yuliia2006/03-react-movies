import { useEffect, useState } from 'react';
import { searchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import type { Movie } from '../../types/movie';
import styles from './App.module.css';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!query) return;

    async function fetchData() {
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    }

    fetchData();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <MovieGrid movies={movies} onMovieClick={openModal} />
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
}