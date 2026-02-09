import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PLACEHOLDERS } from '../helpers/placeholders';
import '../styles/Poster.css';

function Poster({ id, imageUrl, title, class: className }) {
  const [imgError, setImgError] = useState(false);
  const src = imgError || !imageUrl ? PLACEHOLDERS.poster : imageUrl;

  return (
    <div className={`Poster ${className || ''}`}>
      <div className="card-inside">
        <Link to={`/movie/${id}`}>
          <img
            src={src}
            alt={title || ''}
            onError={() => setImgError(true)}
          />
          <div className="poster-overlay">
            <span>{title}</span>
          </div>
        </Link>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default Poster;