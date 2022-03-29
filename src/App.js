import React from 'react';
import Menu from './components/Menu';
import Authors from './components/pages/Authors';
import FavoriteAuthors from './components/pages/FavoriteAuthors';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route path='/authors' element={<Authors />} />
          <Route path='/favoriteAuthors' element={<FavoriteAuthors />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
