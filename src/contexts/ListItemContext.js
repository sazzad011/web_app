import React, { useContext, useState, useEffect } from 'react';
import * as api from '../Api/Api';

const ListItemContext = React.createContext();

export function useListItemContext() {
  return useContext(ListItemContext);
}
const getLocalItems = () => {
  let list = localStorage.getItem('favAuthorList');
  if (list) {
    return JSON.parse(localStorage.getItem('favAuthorList'));
  }
};

export default function ListItemContextProvider({ children }) {
  const [authors, setAuthors] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [favAuthors, setFavAuthors] = useState(getLocalItems());

  const updateAuthors = async (page = 1, resultsPerPage = 5) => {
    const { results, ...pageInfo } = await api.authors({
      page,
      resultsPerPage,
    });
    setAuthors(results);
    setPageInfo(pageInfo);
  };

  const getFavAuthor = (id) => {
    let _favAuthorList = [...favAuthors];
    _favAuthorList.push(authors.find((x) => x._id === id));
    setFavAuthors(_favAuthorList);
  };
  useEffect(() => {
    localStorage.setItem('favAuthorList', JSON.stringify(favAuthors));
  }, [favAuthors]);

  const value = {
    authors,
    pageInfo,
    updateAuthors,
    getFavAuthor,
    favAuthors,
    setFavAuthors,
  };
  return (
    <ListItemContext.Provider value={value}>
      {children}
    </ListItemContext.Provider>
  );
}
