import axios from 'axios';
import type { Movie } from '../types/movie';

interface MoviesResponse {
  results: Movie[];
}

const API_URL = 'https://api.themoviedb.org/3/search/movie';

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<MoviesResponse>(API_URL, {
    params: { query },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  return response.data.results;
}