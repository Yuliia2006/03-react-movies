import styles from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void; // ← додай це
}

export default function MovieGrid({ movies, onMovieClick }: MovieGridProps) {
  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={styles.card}
          onClick={() => onMovieClick(movie)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onMovieClick(movie)}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image'
            }
            alt={movie.title}
            className={styles.poster}
          />
          <h3 className={styles.title}>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
}
