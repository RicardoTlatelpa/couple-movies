import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from '../Searchbar';
import './Sidenav.css';

function Sidenav({ show, onClose }) {
  return (
    <div className={`Sidenav-container ${show ? 'open' : ''}`}>
      <Searchbar onSearchSubmit={onClose} />
      <Link className="Sidenav-item" to="/">Home</Link>
      <Link className="Sidenav-item" to="/rated/1">Top Rated</Link>
      <Link className="Sidenav-item" to="/popular/1">Popular</Link>
    </div>
  );
}

export default Sidenav;