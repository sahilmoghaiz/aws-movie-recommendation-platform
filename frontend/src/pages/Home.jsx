import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import {
  getTrendingMovies,
  getTrendingTVShows,
  searchMovies,
  searchTVShows,
} from "../services/tmdbService";
import SearchBar from "../components/SearchBar";

function Home() {
  const [movies, setMovies] =
    useState([]);

  const [tvShows, setTVShows] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("all");

  const location = useLocation();

  async function fetchTrendingContent() {
    setLoading(true);

    setSearchQuery("");

    const movieData =
      await getTrendingMovies();

    const tvData =
      await getTrendingTVShows();

    setMovies(movieData);
    setTVShows(tvData);

    setLoading(false);
  }

  async function handleSearch(query) {
    setLoading(true);

    setSearchQuery(query);

    if (activeTab === "movies") {
      const movieData =
        await searchMovies(query);

      setMovies(movieData);
    }

    else if (
      activeTab === "tv"
    ) {
      const tvData =
        await searchTVShows(query);

      setTVShows(tvData);
    }

    else {
      const movieData =
        await searchMovies(query);

      const tvData =
        await searchTVShows(query);

      setMovies(movieData);
      setTVShows(tvData);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchTrendingContent();
  }, [location.key]);

  return (
    <div style={{ padding: "20px" }}>
      <SearchBar
        onSearch={handleSearch}
      />

     <div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
  }}
>
  <button
    onClick={() =>
      setActiveTab("all")
    }
    style={{
      backgroundColor:
        activeTab === "all"
          ? "#E50914"
          : "#222",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "0.3s",
    }}
  >
    🔥 All ({movies.length + tvShows.length})
  </button>

  <button
    onClick={() =>
      setActiveTab("movies")
    }
    style={{
      backgroundColor:
        activeTab === "movies"
          ? "#E50914"
          : "#222",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "0.3s",
    }}
  >
    🎬 Movies ({movies.length})
  </button>

  <button
    onClick={() =>
      setActiveTab("tv")
    }
    style={{
      backgroundColor:
        activeTab === "tv"
          ? "#E50914"
          : "#222",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "0.3s",
    }}
  >
    📺 TV Shows ({tvShows.length})
  </button>
</div>

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
            : "Trending Content"}
        </h1>

        {searchQuery && (
          <button
            onClick={
              fetchTrendingContent
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
          🎬 Loading...
        </h2>
      )}

      {!loading &&
        movies.length === 0 &&
        tvShows.length === 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            <h2>
              No results found.
            </h2>

            <button
              onClick={
                fetchTrendingContent
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
        activeTab === "all" && (
          <>
            <h2>
              🎬 Trending Movies
            </h2>

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
                    mediaType="movie"
                  />
                )
              )}
            </div>

            <h2>
              📺 Trending TV Shows
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {tvShows.map(
                (show) => (
                  <MovieCard
                    key={show.id}
                    id={show.id}
                    name={
                      show.name
                    }
                    rating={
                      show.vote_average
                    }
                    posterPath={
                      show.poster_path
                    }
                    mediaType="tv"
                  />
                )
              )}
            </div>
          </>
        )}

      {!loading &&
        activeTab ===
          "movies" && (
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
                  mediaType="movie"
                />
              )
            )}
          </div>
        )}

      {!loading &&
        activeTab ===
          "tv" && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {tvShows.map(
              (show) => (
                <MovieCard
                  key={show.id}
                  id={show.id}
                  name={
                    show.name
                  }
                  rating={
                    show.vote_average
                  }
                  posterPath={
                    show.poster_path
                  }
                  mediaType="tv"
                />
              )
            )}
          </div>
        )}
    </div>
  );
}

export default Home;