import axios from 'axios';
import type { Movie } from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<SearchMoviesResponse>(API_URL, {
    params: { query },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return response.data.results;
}