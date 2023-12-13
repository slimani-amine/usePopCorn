import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import { useMovies } from "../helpers/useMovies";
import { useLocalStorageState } from "../helpers/useLocalStorageState";
import { useKey } from "../helpers/useKey";

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorageState([], "watcheMovies");

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

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  useKey("Escape", handleCloseMovie);

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
