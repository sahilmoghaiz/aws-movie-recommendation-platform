import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import {
  getTrendingMovies,
  searchMovies,
} from "../services/tmdbService";
import SearchBar from "../components/SearchBar";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const [searchQuery, setSearchQuery] =
    useState("");

  const location = useLocation();

  async function fetchTrendingMovies() {
    setLoading(true);

    setSearchQuery("");

    const data =
      await getTrendingMovies();

    setMovies(data);

    setLoading(false);
  }

  async function handleSearch(query) {
    setLoading(true);

    setSearchQuery(query);

    const data =
      await searchMovies(query);

    setMovies(data);

    setLoading(false);
  }

  useEffect(() => {
    fetchTrendingMovies();
  }, [location.key]);

  return (
    <div style={{ padding: "20px" }}>
      <SearchBar
        onSearch={handleSearch}
      />

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <h1>
          {searchQuery
            ? `Results For "${searchQuery}"`
            : "Trending Movies"}
        </h1>

        {searchQuery && (
          <button
            onClick={
              fetchTrendingMovies
            }
            style={{
              backgroundColor:
                "#E50914",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Clear Search
          </button>
        )}
      </div>

      {loading && (
        <h2>
          🎬 Loading Movies...
        </h2>
      )}

      {!loading &&
        movies.length === 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            <h2>
              No movies found.
            </h2>

            <p>
              Try another search.
            </p>

            <button
              onClick={
                fetchTrendingMovies
              }
              style={{
                backgroundColor:
                  "#E50914",
                color: "white",
                border: "none",
                padding:
                  "12px 20px",
                borderRadius:
                  "8px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Back To Trending
            </button>
          </div>
        )}

      {!loading &&
        movies.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {movies.map(
              (movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={
                    movie.title
                  }
                  rating={
                    movie.vote_average
                  }
                  posterPath={
                    movie.poster_path
                  }
                />
              )
            )}
          </div>
        )}
    </div>
  );
}

export default Home;