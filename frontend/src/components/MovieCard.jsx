import { Link } from "react-router-dom";
import { useState } from "react";


function MovieCard({
  id,
  title,
  name,
  rating,
  posterPath,
  mediaType = "movie",
}) {

  const [message, setMessage] =
    useState("");
  const displayTitle =
  title || name;

  const imageUrl =
    `https://image.tmdb.org/t/p/w500${posterPath}`;

 function handleAddToWatchlist(event) {
  event.preventDefault();


  const movie = {
  id,
  title: displayTitle,
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
  }, 1000);

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
}, 1000);
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
      to={`/${mediaType}/${id}`}
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
    transition: "0.3s",
  }}
  onMouseEnter={(e) =>
    (e.currentTarget.style.transform =
      "scale(1.05)")
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.transform =
      "scale(1)")
  }
>
        <img
          src={imageUrl}
          alt={displayTitle}
          style={{
            width: "100%",
            borderRadius: "8px",
          }}
        />

        <h3>{displayTitle}</h3>

        <p>
          Rating: {rating?.toFixed(1) || "N/A"}
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