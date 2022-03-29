import React from 'react';
import { Pagination, Form } from 'react-bootstrap';
import range from 'lodash/range';
import floor from 'lodash/floor';

export default function PaginationControls({
  page = 1,
  resultsPerPage,
  totalPages,
  setPage,
  setResultsPerPage,
}) {
  const MaxPageButtons = Math.min(totalPages, 4);
  const hasNextPage = totalPages > page;
  const hasPrevPage = page > 1;
  const onClick = (pageNumber) => () => setPage(pageNumber);

  const numbers = [Math.max(page - floor(MaxPageButtons / 2), 1)];
  numbers[1] = Math.min(Math.min(numbers[0] + MaxPageButtons, totalPages) + 1);
  if (numbers[1] - numbers[0] < MaxPageButtons) {
    numbers[0] = Math.max(1, totalPages + 1 - MaxPageButtons);
  }

  const pageNumbers = range(...numbers).map((key) => (
    <Pagination.Item key={key} onClick={onClick(key)} active={key === page}>
      {key}
    </Pagination.Item>
  ));
  const lastPageNumber = numbers[1] < totalPages && (
    <>
      <Pagination.Ellipsis />
      <Pagination.Item key={totalPages} onClick={onClick(totalPages)}>
        {totalPages}
      </Pagination.Item>
    </>
  );
  function c(event) {
    setResultsPerPage(event.target.value);
  }
  return (
    <div className='paginationContainer'>
      <Pagination>
        <Pagination.First onClick={onClick(1)} />
        <Pagination.Prev disabled={!hasPrevPage} onClick={onClick(page - 1)} />
        {pageNumbers}
        {lastPageNumber}
        <Pagination.Next disabled={!hasNextPage} onClick={onClick(page + 1)} />
        <Pagination.Last onClick={onClick(totalPages)} />
      </Pagination>
      <Form.Select
        className='select'
        size='sm'
        aria-label='Results Per Page'
        onChange={c}
      >
        <option>Results Per Page</option>
        <option value='5'>5 Per Page</option>
        <option value='25'>25 Per Page</option>
        <option value='50'>50 Per Page</option>
        <option value='100'>100 Per Page</option>
        <option value='150'>150 Per Page</option>
      </Form.Select>
    </div>
  );
}
