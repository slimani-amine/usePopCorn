import React, { useState } from "react";
import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";

export default function Main({
  movies,
  watched,
  isLoading,
  error,
  selectedId,
  handleSelectMovie,
  onCloseMovie,
  handleAddWatched,
  onDeleteMovie
}) {
  return (
    <main className="main">
      <ListBox
        movies={movies}
        isLoading={isLoading}
        error={error}
        handleSelectMovie={handleSelectMovie}
      />
      <WatchedBox
        watched={watched}
        selectedId={selectedId}
        onCloseMovie={onCloseMovie}
        handleAddWatched={handleAddWatched}
        onDeleteMovie={onDeleteMovie}
      />
    </main>
  );
}
