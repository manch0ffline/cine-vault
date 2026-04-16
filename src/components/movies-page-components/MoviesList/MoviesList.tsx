import { CatalogInterest } from "@/src/types";
import Link from "next/link";

function MoviesList({ currentSlice }: { currentSlice: CatalogInterest[] }) {
  return (
    <div className="movies-page__grid">
      {currentSlice.map((movie) => (
        <Link
          key={movie.id}
          href={`/movies/${movie.id}`}
          className="movie-card"
        >
          <div className="movie-card__poster-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={movie.primaryImage?.url || "/images/Inception.png"}
              alt={movie.name}
              className="movie-card__poster"
            />
            <span className="movie-card__rating">
              {movie.isSubgenre ? "Sub" : "Main"}
            </span>
          </div>

          <div className="movie-card__content">
            <h3>{movie.name}</h3>
            <p className="movie-card__meta">{movie.category}</p>
            <p className="movie-card__description">
              {movie.description || "No description available."}
            </p>
            <p className="movie-card__genres">
              Similar interests: {movie.similarInterests.length}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MoviesList;
