import React, { useState } from 'react';
import './FighterCard.css';
import { Link } from 'react-router-dom';
import editIcon from './edit-icon.png'; // You'll need to add this image to your project

const FighterCard = (props) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(!selected);
  };

  // Calculate fighter power level based on stats
  const powerLevel = Math.round((props.strength * 1.2 + props.speed * 0.8 + props.magic * 1.0) / 3);

  return (
    <div className={`FighterCard ${selected ? 'selected' : ''}`} onClick={handleSelect}>
      <Link to={`/edit/${props.id}`}>
        <img className="editButton" alt="edit button" src={editIcon} />
      </Link>
      
      <Link to={`/fighter/${props.id}`} className="fighterLink">
        <h2 className="name">{props.name}</h2>
      </Link>
      
      <h3 className="class">{props.class}</h3>
      
      <div className="stats">
        <div className="stat">
          <span className="stat-label">STR</span>
          <div className="stat-bar">
            <div className="stat-fill strength" style={{ width: `${props.strength * 10}%` }}></div>
          </div>
          <span className="stat-value">{props.strength}</span>
        </div>
        
        <div className="stat">
          <span className="stat-label">SPD</span>
          <div className="stat-bar">
            <div className="stat-fill speed" style={{ width: `${props.speed * 10}%` }}></div>
          </div>
          <span className="stat-value">{props.speed}</span>
        </div>
        
        <div className="stat">
          <span className="stat-label">MAG</span>
          <div className="stat-bar">
            <div className="stat-fill magic" style={{ width: `${props.magic * 10}%` }}></div>
          </div>
          <span className="stat-value">{props.magic}</span>
        </div>
      </div>
      
      <p className="description">{props.description}</p>
      
      <div className="powerLevel">
        <span>Power Level: {powerLevel}</span>
      </div>
    </div>
  );
};

export default FighterCard;