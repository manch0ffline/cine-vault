import Link from "next/link";
import { notFound } from "next/navigation";
import { getMovieById } from "../../../../lib/movies-mock";
import type { Metadata } from "next";

interface MovieDetailsPageProps {
  params: Promise<{ movieId: string }>;
}

export async function generateMetadata({
  params,
}: MovieDetailsPageProps): Promise<Metadata> {
  const { movieId } = await params;
  const movie = await getMovieById(movieId);

  if (!movie) {
    return {
      title: "Movie not found",
      description: "The requested movie could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: movie.name,
    description: movie.description || `Details and metadata for ${movie.name}.`,
    openGraph: {
      title: movie.name,
      description:
        movie.description || `Details and metadata for ${movie.name}.`,
      images: [movie.primaryImage?.url || "/images/Inception.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: movie.name,
      description:
        movie.description || `Details and metadata for ${movie.name}.`,
      images: [movie.primaryImage?.url || "/images/Inception.png"],
    },
  };
}

async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const { movieId } = await params;
  const movie = await getMovieById(movieId);

  if (!movie) {
    notFound();
  }

  return (
    <article className="movie-details">
      <Link href="/movies" className="movie-details__back-link">
        Back to movies
      </Link>

      <div className="movie-details__layout">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={movie.primaryImage?.url || "/images/Inception.png"}
          alt={movie.name}
          className="movie-details__poster"
        />

        <div className="movie-details__content">
          <p className="movie-details__eyebrow">Interest details</p>
          <h2>{movie.name}</h2>

          <div className="movie-details__chips">
            <span>{movie.category}</span>
            <span>{movie.isSubgenre ? "Subgenre" : "Primary"}</span>
            <span>Similar: {movie.similarInterests.length}</span>
          </div>

          <p className="movie-details__genres"></p>
          <p className="movie-details__description">
            {movie.description || "No description available."}
          </p>

          <dl className="movie-details__meta">
            <div>
              <dt>Image Size</dt>
              <dd>
                {movie.primaryImage
                  ? `${movie.primaryImage.width} x ${movie.primaryImage.height}`
                  : "N/A"}
              </dd>
            </div>
            <div>
              <dt>ID</dt>
              <dd>{movie.id}</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}

export default MovieDetailsPage;
