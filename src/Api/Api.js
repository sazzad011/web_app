import { stringify } from 'query-string';
const BASE_URL = `https://api.quotable.io`;

async function paginatedRequest(path, { page = 1, resultsPerPage, ...params }) {
  const limit = Math.floor(resultsPerPage) || 1;
  const skip = (page - 1) * limit;
  const query = stringify({ limit, skip, ...params });
  const response = await fetch(`${BASE_URL}${path}?${query}`);
  const { count, totalCount, results, lastItemIndex } = await response.json();
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = lastItemIndex;
  const hasPreviousPage = page > 1;
  return {
    count,
    totalCount,
    page,
    hasNextPage,
    hasPreviousPage,
    totalPages,
    results,
  };
}

export const authors = async function authors(args = {}) {
  return paginatedRequest('/authors', args);
};
