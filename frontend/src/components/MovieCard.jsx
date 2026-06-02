function MovieCard() {
  return (
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
        src="https://via.placeholder.com/180x250"
        alt="Movie Poster"
      />

      <h3>Movie Title</h3>

      <p>Rating: 8.5</p>
    </div>
  );
}

export default MovieCard;