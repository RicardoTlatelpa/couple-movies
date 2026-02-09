import React from 'react';
import './MoviePageLoading.css';

function MoviePageLoading({ fadeOut }) {
  return (
    <div className={`movie-page-loading${fadeOut ? ' fade-out' : ''}`}>
      <div className="movie-page-loading__content">
        <div className="movie-page-loading__reel">
          <div className="reel-hole"></div>
          <div className="reel-spokes"></div>
        </div>
        <div className="movie-page-loading__film">
          <div className="film-strip"></div>
        </div>
        <p className="movie-page-loading__text">Loading</p>
        <div className="movie-page-loading__dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default MoviePageLoading;
