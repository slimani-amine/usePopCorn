import React, { useState } from "react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function ListBox({ movies, isLoading, error ,handleSelectMovie}) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <MovieList movies={movies} isLoading={isLoading} error={error} handleSelectMovie={handleSelectMovie}/>
      )}
    </div>
  );
}
function MovieList({ movies, isLoading, error ,handleSelectMovie}) {
  return (
    <ul className="list">
      {isLoading && <Loader />}
      {!isLoading &&
        !error &&
        movies?.map((movie) => <Movie movie={movie} key={movie.imdbID} handleSelectMovie={handleSelectMovie} />)}
      {error && <ErrorMessage message={error} />}
    </ul>
  );
}
function Movie({ movie ,handleSelectMovie }) {
  return (
    <li onClick={()=>handleSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
