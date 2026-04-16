import { ApiInterest, CatalogInterest, InterestsApiResponse, SortOption } from "../types";

interface FilterOptions {
  search: string;
  genre: string;
  sort: SortOption;
}


export const DEFAULT_PAGE_SIZE = 6;
export const INTERESTS_API_URL =  `${process.env.NEXT_PUBLIC_IMDB_API_URL}/interests`;


function normalizeInterest(
  interest: ApiInterest,
  category: string,
): CatalogInterest {
  return {
    id: interest.id,
    name: interest.name,
    primaryImage: interest.primaryImage,
    description: interest.description,
    isSubgenre: interest.isSubgenre,
    similarInterests: Array.isArray(interest.similarInterests)
      ? interest.similarInterests
      : [],
    category,
  };
}

export function flattenCategories(
  response: InterestsApiResponse,
): CatalogInterest[] {
  return response.categories.flatMap((categoryItem) =>
    categoryItem.interests.map((interest) =>
      normalizeInterest(interest, categoryItem.category),
    ),
  );
}

export async function fetchInterests(): Promise<CatalogInterest[]> {
  const response = await fetch(INTERESTS_API_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch interests");
  }

  const data = (await response.json()) as InterestsApiResponse;

  if (!data?.categories || !Array.isArray(data.categories)) {
    return [];
  }

  return flattenCategories(data);
}

export function getAllCategories(movies: CatalogInterest[]): string[] {
  return Array.from(new Set(movies.map((movie) => movie.category))).sort(
    (a, b) => a.localeCompare(b),
  );
}

export function filterAndSortMovies(
  movies: CatalogInterest[],
  options: FilterOptions,
): CatalogInterest[] {
  const search = options.search.trim().toLowerCase();

  const filtered = movies.filter((movie) => {
    const matchesGenre =
      options.genre === "All" || movie.category === options.genre;
    const haystack =
      `${movie.name} ${movie.description} ${movie.category}`.toLowerCase();
    const matchesSearch = !search || haystack.includes(search);

    return matchesGenre && matchesSearch;
  });

  return [...filtered].sort((left, right) => {
    if (options.sort === "name-desc") {
      return right.name.localeCompare(left.name);
    }

    return left.name.localeCompare(right.name);
  });
}

export function paginateMovies<T>(
  movies: T[],
  page: number,
  pageSize: number,
): T[] {
  const startIndex = (page - 1) * pageSize;
  return movies.slice(startIndex, startIndex + pageSize);
}

export async function getMovieById(
  movieId: string,
): Promise<CatalogInterest | null> {
  const movies = await fetchInterests();
  return movies.find((movie) => movie.id === movieId) ?? null;
}
