import { Link } from "react-router-dom";
import { useState } from "react";


function MovieCard({ id, title, rating, posterPath }) {

  const [message, setMessage] =
    useState("");

  const imageUrl =
    `https://image.tmdb.org/t/p/w500${posterPath}`;

 function handleAddToWatchlist(event) {
  event.preventDefault();


  const movie = {
    id,
    title,
    rating,
    posterPath,
    watched: false,
  };

 const existingWatchlist =
  JSON.parse(
    localStorage.getItem("watchlist")
  ) || [];

const alreadyExists =
  existingWatchlist.some(
    (savedMovie) => savedMovie.id === movie.id
  );

if (alreadyExists) {
  setMessage(
    "⚠️ Movie Already In Watchlist"
  );

  setTimeout(() => {
    setMessage("");
  }, 3000);

  return;
}

existingWatchlist.push(movie);

  localStorage.setItem(
    "watchlist",
    JSON.stringify(existingWatchlist)
  );

  setMessage(
  "✅ Movie Added To Watchlist"
);

setTimeout(() => {
  setMessage("");
}, 3000);
}
  return (
  <>
    {message && (
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "#28a745",
          color: "white",
          padding: "12px 18px",
          borderRadius: "8px",
          zIndex: 1000,
        }}
      >
        {message}
      </div>
    )}

    <Link
      to={`/movie/${id}`}
      style={{
        textDecoration: "none",
        color: "white",
      }}
    >
      <div
        style={{
          width: "200px",
          backgroundColor: "#222",
          padding: "10px",
          borderRadius: "10px",
          margin: "20px",
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: "100%",
            borderRadius: "8px",
          }}
        />

        <h3>{title}</h3>

        <p>
          Rating: {rating.toFixed(1)}
        </p>

        <button
          onClick={handleAddToWatchlist}
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>
    </Link>
  </>
);
}

export default MovieCard;