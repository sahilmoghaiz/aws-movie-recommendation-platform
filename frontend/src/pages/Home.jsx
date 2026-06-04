import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import {
  getTrendingMovies,
  searchMovies,
} from "../services/tmdbService";
import SearchBar from "../components/SearchBar";

function Home() {
  const [movies, setMovies] = useState([]);
  async function handleSearch(query) {
  const data = await searchMovies(query);

  setMovies(data);
}

  //stores movie data useState
  useEffect(() => {
    async function fetchMovies() {
      const data = await getTrendingMovies();
      setMovies(data);
    }

    fetchMovies();
  }, []);

 return (
  <div style={{ padding: "20px" }}>
    <SearchBar onSearch={handleSearch} />

    <h1>Trending Movies</h1>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
        {movies.map((movie) => (
          <MovieCard
  key={movie.id}        
  id={movie.id}
  title={movie.title}
  rating={movie.vote_average}
  posterPath={movie.poster_path}
/>
        ))}
      </div>
    </div>
  );
}

export default Home;