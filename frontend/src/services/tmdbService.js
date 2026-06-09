const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL =
  "https://api.themoviedb.org/3";

export async function getTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
}

export async function getTrendingTVShows() {
  const response = await fetch(
    `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
}

export async function getMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data;
}

export async function getTVDetails(id) {
  const response = await fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data;
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  const data = await response.json();

  return data.results;
}

export async function searchTVShows(query) {
  const response = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`
  );

  const data = await response.json();

  return data.results;
}

export async function getMovieVideos(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
}

export async function getTVVideos(id) {
  const response = await fetch(
    `${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
}