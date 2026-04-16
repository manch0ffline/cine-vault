import React, { useMemo } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

function MoviesPagination({ currentPage, totalPages, setPage }: Props) {
  const visiblePages = useMemo(() => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    let start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + 2);

    if (end - start < 2) {
      start = Math.max(1, end - 2);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [currentPage, totalPages]);

  return (
    <div className="movies-page__pagination">
      <button
        type="button"
        onClick={() => setPage(1)}
        disabled={currentPage <= 1}
      >
        First
      </button>

      <button
        type="button"
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        disabled={currentPage <= 1}
      >
        Previous
      </button>

      <div className="movies-page__page-list" aria-label="Pagination pages">
        {visiblePages.map((pageNum) => (
          <button
            type="button"
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={pageNum === currentPage ? "is-active" : ""}
            aria-current={pageNum === currentPage ? "page" : undefined}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>

      <button
        type="button"
        onClick={() => setPage(totalPages)}
        disabled={currentPage >= totalPages}
      >
        Last
      </button>
    </div>
  );
}

export default MoviesPagination;
