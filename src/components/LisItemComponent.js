import React, { useState, useEffect } from 'react';
import PaginationControls from './Pagination';
import './ListItemComponent.css';
import { useListItemContext } from '../contexts/ListItemContext';

const ListItemComponent = (location) => {
  const {
    authors,
    pageInfo,
    updateAuthors,
    getFavAuthor,
    favAuthors,
    setFavAuthors,
  } = useListItemContext();
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  useEffect(() => {
    if (page) updateAuthors(page, resultsPerPage);
  }, [page, resultsPerPage]);

  const removeFavAuthorHandler = (index) => {
    const _favAuthors = [...favAuthors];
    _favAuthors.splice(index, 1);
    setFavAuthors(_favAuthors);
  };

  return (
    <>
      <PaginationControls
        {...pageInfo}
        page={page}
        limit={resultsPerPage}
        setPage={setPage}
        setResultsPerPage={setResultsPerPage}
      />

      <div className='authorList condensed'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Author's Name</th>
              <th>Bio</th>
              <th>Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {location.location === '/authors'
              ? authors.map((val, index) => (
                  <tr key={index}>
                    <td>{val.name}</td>
                    <td>{val.bio}</td>
                    <td>{val.link}</td>
                    <td>
                      <button
                        type='button'
                        onClick={() => getFavAuthor(val._id)}
                      >
                        Add Favorite
                      </button>
                    </td>
                  </tr>
                ))
              : location.location === '/favoriteAuthors'
              ? favAuthors.map((val, index) => (
                  <tr key={index}>
                    <td>{val.name}</td>
                    <td>{val.bio}</td>
                    <td>{val.link}</td>
                    <td>
                      <button
                        type='button'
                        onClick={() => removeFavAuthorHandler(index)}
                      >
                        Remove Favorite
                      </button>
                    </td>
                  </tr>
                ))
              : ''}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListItemComponent;
