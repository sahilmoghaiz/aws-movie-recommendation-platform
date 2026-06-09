import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const savedMovies =
      JSON.parse(
        localStorage.getItem("watchlist")
      ) || [];

    setWatchlist(savedMovies);
  }, [navigate]);

  function handleRemove(movieId) {
    const updatedWatchlist =
      watchlist.filter(
        (movie) => movie.id !== movieId
      );

    setWatchlist(updatedWatchlist);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(updatedWatchlist)
    );
  }

  function handleMarkWatched(movieId) {
    const updatedWatchlist =
      watchlist.map((movie) =>
        movie.id === movieId
          ? { ...movie, watched: true }
          : movie
      );

    setWatchlist(updatedWatchlist);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(updatedWatchlist)
    );
  }

  function handleMoveBack(movieId) {
    const updatedWatchlist =
      watchlist.map((movie) =>
        movie.id === movieId
          ? { ...movie, watched: false }
          : movie
      );

    setWatchlist(updatedWatchlist);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(updatedWatchlist)
    );
  }

  const toWatchMovies =
    watchlist.filter(
      (movie) => !movie.watched
    );

  const watchedMovies =
    watchlist.filter(
      (movie) => movie.watched
    );

  if (watchlist.length === 0) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h1>🎬 My Watchlist</h1>

        <h3>No movies added yet.</h3>

        <p>
          Start building your movie collection.
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#E50914",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Browse Movies
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Watchlist</h1>

      <h2>To Watch</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {toWatchMovies.map((movie) => (
          <div
            key={movie.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <MovieCard
              id={movie.id}
              title={movie.title}
              rating={movie.rating}
              posterPath={movie.posterPath}
            />

            <button
              onClick={() =>
                handleMarkWatched(movie.id)
              }
              style={{
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "-10px",
                marginBottom: "5px",
              }}
            >
              Mark Watched
            </button>

            <button
              onClick={() =>
                handleRemove(movie.id)
              }
              style={{
                backgroundColor: "#E50914",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>
        Watched Movies
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {watchedMovies.map((movie) => (
          <div
            key={movie.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <MovieCard
              id={movie.id}
              title={movie.title}
              rating={movie.rating}
              posterPath={movie.posterPath}
            />

            <button
              onClick={() =>
                handleMoveBack(movie.id)
              }
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "-10px",
                marginBottom: "5px",
              }}
            >
              Move Back
            </button>

            <button
              onClick={() =>
                handleRemove(movie.id)
              }
              style={{
                backgroundColor: "#E50914",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;