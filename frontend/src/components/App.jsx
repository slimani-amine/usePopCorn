import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Main from "./Main";

const KEY = "88799256";
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
  };
  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };
  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    const callBack = (e) => {
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    };
    document.addEventListener("keydown", callBack);
    return function () {
      document.removeEventListener("keydown", callBack);
    };
  }, [handleCloseMovie]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("something went wrong with fetching movies");
        }
        const data = await res.json();
        if (data.response === "False") {
          throw new Error("Movie don't found");
        }
        setMovies(data.Search || []);
      } catch (error) {
        if (error.message !== "AbortError") {
          setError(error.message);
          setError("");
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    handleCloseMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar movies={movies} query={query} setQuery={setQuery} />
      <Main
        movies={movies}
        handleAddWatched={handleAddWatched}
        watched={watched}
        isLoading={isLoading}
        error={error}
        selectedId={selectedId}
        handleSelectMovie={handleSelectMovie}
        onCloseMovie={handleCloseMovie}
        onDeleteMovie={handleDeleteWatched}
      />
    </>
  );
}
