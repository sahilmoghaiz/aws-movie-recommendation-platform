import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/tmdbService";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const data = await getMovieDetails(id);
      setMovie(data);
    }

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <h1>Loading...</h1>;
  }

  const imageUrl =
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
  <div
    style={{
      padding: "30px",
    }}
  >
    <button
      onClick={() => navigate(-1)}
      style={{
        background: "none",
        border: "none",
        color: "#E50914",
        fontSize: "20px",
        cursor: "pointer",
        marginBottom: "20px",
      }}
    >
      ← Back to Movies
    </button>

    <div
      style={{
        display: "flex",
        gap: "30px",
        alignItems: "flex-start",
      }}
    >
      <img
        src={imageUrl}
        alt={movie.title}
        style={{
          width: "300px",
          borderRadius: "10px",
        }}
      />

      <div>
        <h1>{movie.title}</h1>

        <h3>
          ⭐ {movie.vote_average.toFixed(1)}
        </h3>

        <p>
          Release Date: {movie.release_date}
        </p>

        <p
          style={{
            maxWidth: "700px",
            lineHeight: "1.6",
          }}
        >
          {movie.overview}
        </p>
      </div>
    </div>
  </div>
);
}

export default MovieDetails;