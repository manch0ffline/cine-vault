"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_PAGE_SIZE,
  fetchInterests,
  paginateMovies,
} from "@/src/lib/movies-mock";
import MoviesFilters from "@/src/components/movies-page-components/MoviesFilters/MoviesFilters";
import MoviesPagination from "@/src/components/movies-page-components/MoviesPagination/MoviesPagination";
import MoviesList from "@/src/components/movies-page-components/MoviesList/MoviesList";
import Loader from "@/src/components/loader/Loader";
import { CatalogInterest } from "@/src/types";

function MoviePage() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<CatalogInterest[]>([]);
  const [preparedMovies, setPreparedMovies] = useState<CatalogInterest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchInterests();
      setMovies(data);
    } catch (err) {
      setMovies([]);
      setError(
        err instanceof Error ? err.message : "Failed to load interests.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page])

  const totalPages = Math.max(
    1,
    Math.ceil(preparedMovies.length / DEFAULT_PAGE_SIZE),
  );

  const currentPage = Math.min(page, totalPages);
  const currentSlice = paginateMovies(
    preparedMovies,
    currentPage,
    DEFAULT_PAGE_SIZE,
  );

  return (
    <section className="movies-page">
      <div className="movies-page__hero">
        <p className="movies-page__label">Authorized catalog</p>
        <h2>Find your next movie in seconds</h2>
        <p>Browse interests from the API response grouped by category.</p>
      </div>

      {isLoading && <Loader variant="dots" size="small" fullScreen />}

      {!isLoading && error && (
        <div className="movies-page__empty d-flex flex-column align-items-start gap-2 mt-3">
          <p className="m-0">Could not load movies: {error}</p>
          <button
            type="button"
            className="btn secondary p10-20"
            onClick={() => void loadMovies()}
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <MoviesFilters
            movies={movies}
            setPreparedMovies={setPreparedMovies}
            setPage={setPage}
          />

          <div className="movies-page__summary" aria-live="polite">
            <p>
              Showing <strong>{currentSlice.length}</strong> of{" "}
              <strong>{preparedMovies.length}</strong> movies
            </p>
            <p>
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </p>
          </div>

          <MoviesList currentSlice={currentSlice} />

          {preparedMovies.length === 0 && (
            <div className="movies-page__empty">
              No interests found. Try another search or category.
            </div>
          )}

          <MoviesPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setPage={setPage}
          />
        </>
      )}
    </section>
  );
}

export default MoviePage;
