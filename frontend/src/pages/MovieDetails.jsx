import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import {
  getMovieDetails,
  getTVDetails,
  getMovieVideos,
  getTVVideos,
} from "../services/tmdbService";

function MovieDetails() {
  const { id } = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const [movie, setMovie] =
    useState(null);

  const [trailerKey, setTrailerKey] =
    useState("");

  const [showTrailer, setShowTrailer] =
    useState(false);

  useEffect(() => {
    async function fetchDetails() {
      let data;

      if (
        location.pathname.startsWith(
          "/tv"
        )
      ) {
        data =
          await getTVDetails(id);
      } else {
        data =
          await getMovieDetails(id);
      }

      setMovie(data);

      let videos;

      if (
        location.pathname.startsWith(
          "/tv"
        )
      ) {
        videos =
          await getTVVideos(id);
      } else {
        videos =
          await getMovieVideos(id);
      }

      const trailer =
        videos.find(
          (video) =>
            video.site ===
              "YouTube" &&
            video.type ===
              "Trailer" &&
            video.official
        ) ||
        videos.find(
          (video) =>
            video.site ===
              "YouTube" &&
            video.type ===
              "Trailer"
        ) ||
        videos.find(
          (video) =>
            video.site ===
              "YouTube" &&
            video.type ===
              "Teaser"
        );

      if (trailer) {
        setTrailerKey(
          trailer.key
        );
      }
    }

    fetchDetails();
  }, [id, location.pathname]);

  if (!movie) {
    return <h1>Loading...</h1>;
  }

  const title =
    movie.title || movie.name;

  const imageUrl =
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const backdropUrl =
    movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : imageUrl;

  const genres =
    movie.genres
      ?.map(
        (genre) =>
          genre.name
      )
      .join(", ") ||
    "Not Available";

  const runtime =
    movie.runtime ||
    movie
      .episode_run_time?.[0] ||
    "N/A";

  const releaseDate =
    movie.release_date ||
    movie.first_air_date ||
    "N/A";

  return (
    <div>
      <div
        style={{
          height: "400px",
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize:
            "cover",
          backgroundPosition:
            "center",
          position:
            "relative",
        }}
      >
        <div
          style={{
            position:
              "absolute",
            inset: 0,
            background:
              "rgba(0,0,0,0.6)",
          }}
        />

        <button
          onClick={() =>
            navigate(-1)
          }
          style={{
            position:
              "absolute",
            top: "20px",
            left: "20px",
            background:
              "none",
            border: "none",
            color: "white",
            fontSize:
              "18px",
            cursor:
              "pointer",
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
          marginTop:
            "-100px",
          position:
            "relative",
          zIndex: 2,
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: "300px",
            borderRadius:
              "12px",
          }}
        />

        <div
          style={{
            marginTop: "70px",
          }}
        >
          <h1>{title}</h1>

          <h3>
            ⭐{" "}
            {movie.vote_average?.toFixed(
              1
            )}
          </h3>

          {trailerKey && (
            <button
              onClick={() =>
                setShowTrailer(
                  !showTrailer
                )
              }
              style={{
                backgroundColor:
                  "#E50914",
                color:
                  "white",
                border:
                  "none",
                padding:
                  "10px 15px",
                borderRadius:
                  "8px",
                cursor:
                  "pointer",
                marginBottom:
                  "15px",
              }}
            >
              ▶ Watch Trailer
            </button>
          )}

          <p>
            🎭 Genres: {genres}
          </p>

          <p>
            ⏱ Runtime:{" "}
            {runtime} min
          </p>

          <p>
            🌐 Language:{" "}
            {movie.original_language?.toUpperCase() ||
              "N/A"}
          </p>

          <p>
            📅 Release Date:{" "}
            {releaseDate}
          </p>

          <p
            style={{
              maxWidth:
                "700px",
              lineHeight:
                "1.7",
              marginTop:
                "20px",
            }}
          >
            {movie.overview}
          </p>

          {showTrailer &&
            trailerKey && (
              <div
                style={{
                  marginTop:
                    "25px",
                }}
              >
                <iframe
                  width="700"
                  height="400"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    border:
                      "none",
                    borderRadius:
                      "10px",
                  }}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;