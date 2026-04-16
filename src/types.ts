// #region Dropdown Types
export type DropdownOption<T extends string> = {
  value: T;
  label: string;
};
// #endregion Dropdown Types

// #region Movies Catalog Types
export type SortOption = "name-asc" | "name-desc";

export interface InterestImage {
  url: string;
  width: number;
  height: number;
  type: string;
}

export interface ApiInterest {
  id: string;
  name: string;
  primaryImage: InterestImage | null;
  description: string;
  isSubgenre: boolean;
  similarInterests: unknown[];
}

export interface ApiCategory {
  category: string;
  interests: ApiInterest[];
}

export interface InterestsApiResponse {
  categories: ApiCategory[];
}

export interface CatalogInterest extends ApiInterest {
  category: string;
}
// #endregion Movies Catalog Types