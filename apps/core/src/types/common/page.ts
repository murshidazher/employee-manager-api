export interface PageInfo {
  count: number;
  totalCount: number;
  startCursor: string | null;
  endCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface Edge<T> {
  node: T;
  cursor: string | null;
}

export interface Page<T> {
  edges: Array<Edge<T>>;
  pageInfo: PageInfo;
}
