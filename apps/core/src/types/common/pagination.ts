export interface Pagination {
  first?: number;
  after?: string | null;
  last?: number;
  before?: string | null;
  skip?: number;
}
