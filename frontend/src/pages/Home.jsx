  import { useEffect, useState } from "react";
  import { useLocation } from "react-router-dom";
  import MovieCard from "../components/MovieCard";
  import SearchBar from "../components/SearchBar";

  import {
    getTrendingMovies,
    getTrendingTVShows,
    searchMovies,
    searchTVShows,
    getMoviesByGenre,
    getTVShowsByGenre,
  } from "../services/tmdbService";

  function Home() {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTVShows] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] =
      useState("");

    const [activeTab, setActiveTab] =
    useState(
      localStorage.getItem(
        "activeTab"
      ) || "all"
    );

    const [selectedGenre, setSelectedGenre] =
    useState(
      localStorage.getItem(
        "selectedGenre"
      ) || "All"
    );
    
    const [page, setPage] =
    useState(
      Number(
        localStorage.getItem(
          "page"
        )
      ) || 1
    );

    const location = useLocation();

    const genres = [
      "All",
      "Action",
      "Comedy",
      "Drama",
      "Horror",
      "Sci-Fi",
    ];

    const movieGenreMap = {
      Action: 28,
      Comedy: 35,
      Drama: 18,
      Horror: 27,
      "Sci-Fi": 878,
    };

    const tvGenreMap = {
      Action: 10759,
      Comedy: 35,
      Drama: 18,
      Horror: 9648,
      "Sci-Fi": 10765,
    };

    async function fetchTrendingContent() {
      setLoading(true);

      setSearchQuery("");
    // setSelectedGenre("All");

      try {
        const movieData =
    await getTrendingMovies(page);

  const tvData =
    await getTrendingTVShows(page);

        setMovies(movieData);
        setTVShows(tvData);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    async function handleSearch(query) {
      setLoading(true);

      setSearchQuery(query);

      try {
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
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    async function handleGenreSelect(
    genre
  ) {
  setSelectedGenre(genre);

    if (genre === "All") {
        fetchTrendingContent();
        return;
      }

      setLoading(true);

      try {
        if (activeTab === "movies") {
          const movieData =
            await getMoviesByGenre(
    movieGenreMap[genre],
    page
  );

          setMovies(movieData);
        }

        else if (
          activeTab === "tv"
        ) {
          const tvData =
            await getTVShowsByGenre(
    tvGenreMap[genre],
    page
  );

          setTVShows(tvData);
        }

        else {
          const movieData =
            await getMoviesByGenre(
    movieGenreMap[genre],
    page
  );

          const tvData =
            await getTVShowsByGenre(
    tvGenreMap[genre],
    page
  );

          setMovies(movieData);
          setTVShows(tvData);
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

  useEffect(() => {
    if (
      selectedGenre === "All"
    ) {
      fetchTrendingContent();
    }

    else {
      if (
        activeTab === "movies"
      ) {
        getMoviesByGenre(
          movieGenreMap[
            selectedGenre
          ],
          page
        ).then(setMovies);
      }

      else if (
        activeTab === "tv"
      ) {
        getTVShowsByGenre(
          tvGenreMap[
            selectedGenre
          ],
          page
        ).then(setTVShows);
      }

      else {
        Promise.all([
          getMoviesByGenre(
            movieGenreMap[
              selectedGenre
            ],
            page
          ),
          getTVShowsByGenre(
            tvGenreMap[
              selectedGenre
            ],
            page
          ),
        ]).then(
          ([movieData, tvData]) => {
            setMovies(movieData);
            setTVShows(tvData);
          }
        );
      }
    }
  }, []);

  useEffect(() => {
    async function loadPage() {
      if (
        selectedGenre === "All"
      ) {
        fetchTrendingContent();
      }

      else {
        setLoading(true);

        if (
          activeTab === "movies"
        ) {
          const movieData =
            await getMoviesByGenre(
              movieGenreMap[
                selectedGenre
              ],
              page
            );

          setMovies(movieData);
        }

        else if (
          activeTab === "tv"
        ) {
          const tvData =
            await getTVShowsByGenre(
              tvGenreMap[
                selectedGenre
              ],
              page
            );

          setTVShows(tvData);
        }

        else {
          const movieData =
            await getMoviesByGenre(
              movieGenreMap[
                selectedGenre
              ],
              page
            );

          const tvData =
            await getTVShowsByGenre(
              tvGenreMap[
                selectedGenre
              ],
              page
            );

          setMovies(movieData);
          setTVShows(tvData);
        }

        setLoading(false);
      }
    }

    loadPage();
  }, [page]);

  useEffect(() => {
    localStorage.setItem(
      "activeTab",
      activeTab
    );

    localStorage.setItem(
      "selectedGenre",
      selectedGenre
    );

    localStorage.setItem(
      "page",
      page
    );
  }, [
    activeTab,
    selectedGenre,
    page,
  ]);

  return (
      <div style={{ padding: "20px" }}>
        <SearchBar
          onSearch={handleSearch}
        />

        {/* Tabs */}

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
            }}
          >
            🔥 All (
            {movies.length +
              tvShows.length}
            )
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
            }}
          >
            🎬 Movies (
            {movies.length})
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
            }}
          >
            📺 TV Shows (
            {tvShows.length})
          </button>
        </div>

        {/* Genres */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() =>
                handleGenreSelect(
                  genre
                )
              }
              style={{
                backgroundColor:
                  selectedGenre ===
                  genre
                    ? "#E50914"
                    : "#222",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {genre}
            </button>
          ))}
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
    title={movie.title}
    rating={movie.vote_average}
    posterPath={movie.poster_path}
    releaseDate={movie.release_date}
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
    name={show.name}
    rating={show.vote_average}
    posterPath={show.poster_path}
    releaseDate={show.first_air_date}
    mediaType="tv"
  />
                  )
                )}
              </div>
            </>
          )}

        {!loading &&
          activeTab === "movies" && (
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
          activeTab === "tv" && (
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
          <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      marginTop: "40px",
      marginBottom: "30px",
    }}
  >
    <button
      disabled={page === 1}
      onClick={() =>
        setPage(page - 1)
      }
      style={{
        padding: "10px 20px",
        borderRadius: "8px",
        border: "none",
        cursor:
          page === 1
            ? "not-allowed"
            : "pointer",
      }}
    >
      ⬅ Previous
    </button>

    <h3>
      Page {page}
    </h3>

    <button
      onClick={() =>
        setPage(page + 1)
      }
      style={{
        padding: "10px 20px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Next ➡
    </button>
  </div>
      </div>
    );
  }

  export default Home;