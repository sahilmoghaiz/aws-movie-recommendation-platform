import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSearch() {
    if (onSearch) {
      onSearch(query);
    }
  }

  return (
    <div
      style={{
        marginBottom: "20px",
        width: "75%",
        position: "relative",
      }}
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(event) =>
          setQuery(event.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#222",
          color: "#FFFFFF",
          fontWeight: "bold",
          outline: "none",
        }}
      />

      <button
        onClick={handleSearch}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          background: "none",
          cursor: "pointer",
          fontSize: "20px",
        }}
      >
        🔍
      </button>
    </div>
  );
}

export default SearchBar;