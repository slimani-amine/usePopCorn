import { useEffect, useState } from "react";
const KEY = "88799256";
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
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
    // handleCloseMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);
  return { movies, isLoading, error };
}
