import MovieCard from "../components/MovieCard";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Trending Movies</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}

export default Home;