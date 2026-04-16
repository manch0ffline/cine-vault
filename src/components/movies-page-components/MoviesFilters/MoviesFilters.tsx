import {
  filterAndSortMovies,
  getAllCategories,
} from "@/src/lib/movies-mock";
import { CatalogInterest, DropdownOption, SortOption } from "@/src/types";
import React, { useEffect, useMemo, useState } from "react";
import { StyledDropdown } from "../../StyledDropdown/StyledDropdown";

type Props = {
  movies: CatalogInterest[];
  setPreparedMovies: React.Dispatch<React.SetStateAction<CatalogInterest[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

function MoviesFilters({ movies, setPreparedMovies, setPage }: Props) {
  const allCategories = useMemo(() => getAllCategories(movies), [movies]);
  const categoryOptions = useMemo<DropdownOption<string>[]>(
    () => [
      { value: "All", label: "All" },
      ...allCategories.map((genreName) => ({
        value: genreName,
        label: genreName,
      })),
    ],
    [allCategories],
  );
  const sortOptions = useMemo<DropdownOption<SortOption>[]>(
    () => [
      { value: "name-asc", label: "Name: A-Z" },
      { value: "name-desc", label: "Name: Z-A" },
    ],
    [],
  );

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState<SortOption>("name-asc");

  useEffect(() => {
    setPreparedMovies(
      filterAndSortMovies(movies, {
        search,
        genre,
        sort,
      }),
    );
  }, [movies, search, genre, sort, setPreparedMovies]);

  const onSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const onGenreChange = (value: string) => {
    setGenre(value);
    setPage(1);
  };

  const onSortChange = (value: SortOption) => {
    setSort(value);
    setPage(1);
  };

  return (
    <div
      className="movies-page__controls"
      role="region"
      aria-label="Movie controls"
    >
      <label className="movies-page__field">
        <span>Search</span>
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Title, director or keyword"
        />
      </label>

      <StyledDropdown
        label="Category"
        value={genre}
        options={categoryOptions}
        onChange={onGenreChange}
      />

      <StyledDropdown
        label="Sort"
        value={sort}
        options={sortOptions}
        onChange={onSortChange}
      />
    </div>
  );
}

export default MoviesFilters;
