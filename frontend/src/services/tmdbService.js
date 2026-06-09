const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL =
  "https://api.themoviedb.org/3";

export async function
getTrendingMovies(
  page = 1
) {
  const response =
    await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
    );

  const data =
    await response.json();

  return data.results;
}

export async function
getTrendingTVShows(
  page = 1
) {
  const response =
    await fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`
    );

  const data =
    await response.json();

  return data.results;
}

export async function
getMovieDetails(id) {
  const response =
    await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );

  const data =
    await response.json();

  return data;
}

export async function
getTVDetails(id) {
  const response =
    await fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}`
    );

  const data =
    await response.json();

  return data;
}

export async function
searchMovies(
  query,
  page = 1
) {
  const response =
    await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );

  const data =
    await response.json();

  return data.results;
}

export async function
searchTVShows(
  query,
  page = 1
) {
  const response =
    await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&page=${page}`
    );

  const data =
    await response.json();

  return data.results;
}

export async function
getMovieVideos(id) {
  const response =
    await fetch(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
    );

  const data =
    await response.json();

  return data.results;
}

export async function
getTVVideos(id) {
  const response =
    await fetch(
      `${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`
    );

  const data =
    await response.json();

  return data.results;
}

export async function
getMoviesByGenre(
  genreId,
  page = 1
) {
  const response =
    await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
    );

  const data =
    await response.json();

  return data.results;
}

export async function
getTVShowsByGenre(
  genreId,
  page = 1
) {
  const response =
    await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
    );

  const data =
    await response.json();

  return data.results;
}