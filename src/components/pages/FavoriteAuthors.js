import React from 'react';
import { useLocation } from 'react-router-dom';
import LisItemComponent from '../LisItemComponent';
import ListItemContextProvider from '../../contexts/ListItemContext';

const FavoriteAuthors = () => {
  const location = useLocation();
  return (
    <ListItemContextProvider>
      <LisItemComponent location={location.pathname} />;
    </ListItemContextProvider>
  );
};
export default FavoriteAuthors;
