import React from 'react';
import './Card.css';

const FighterCard = ({ name, stats, image }) => {
  return (
    <div className="card">
      <img src={image} alt={`${name}`} className="card-image" />
      <div className="card-content">
        <h2>{name}</h2>
        <p>{stats}</p>
      </div>
    </div>
  );
};

export default FighterCard;