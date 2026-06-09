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

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : imageUrl;

  const genres =
    movie.genres
      ?.map((genre) => genre.name)
      .join(", ") || "Not Available";

  return (
    <div>
      <div
        style={{
          height: "400px",
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "rgba(0,0,0,0.6)",
          }}
        />

        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          ← Back
        </button>
      </div>

      <div
        style={{
          padding: "30px",
          display: "flex",
          gap: "30px",
          marginTop: "-100px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <img
          src={imageUrl}
          alt={movie.title}
          style={{
            width: "300px",
            borderRadius: "12px",
          }}
        />

        <div
  style={{
    marginTop: "70px",
  }}
>
  <h1>{movie.title}</h1>

          <h3>
            ⭐ {movie.vote_average.toFixed(1)}
          </h3>

          <p>
            🎭 Genres: {genres}
          </p>

          <p>
            ⏱ Runtime: {movie.runtime || "N/A"} min
          </p>

          <p>
            🌐 Language:{" "}
            {movie.original_language?.toUpperCase() || "N/A"}
          </p>

          <p>
            📅 Release Date:{" "}
            {movie.release_date}
          </p>

          <p
            style={{
              maxWidth: "700px",
              lineHeight: "1.7",
              marginTop: "20px",
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