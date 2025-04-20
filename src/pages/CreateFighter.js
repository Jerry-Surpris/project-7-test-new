import React, { useState } from 'react';
import './CreateFighter.css';
import { supabase } from '../client';

const CreateFighter = () => {
  const [fighter, setFighter] = useState({
    name: "",
    class: "Warrior", // Default class
    strength: 5,
    speed: 5,
    magic: 5,
    description: ""
  });
  
  const classes = ["Warrior", "Rogue", "Mage", "Guardian", "Ranger", "Monk"];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFighter((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleStatChange = (stat, value) => {
    // Ensure stat is between 1 and 10
    const newValue = Math.max(1, Math.min(10, value));
    
    setFighter((prev) => {
      return {
        ...prev,
        [stat]: newValue
      };
    });
  };

  const handleClassSelect = (selectedClass) => {
    let newStats = { ...fighter, class: selectedClass };
    
    // Adjust stats based on class selection
    switch (selectedClass) {
      case "Warrior":
        newStats = { ...newStats, strength: 8, speed: 5, magic: 3 };
        break;
      case "Rogue":
        newStats = { ...newStats, strength: 5, speed: 8, magic: 3 };
        break;
      case "Mage":
        newStats = { ...newStats, strength: 3, speed: 4, magic: 9 };
        break;
      case "Guardian":
        newStats = { ...newStats, strength: 9, speed: 3, magic: 4 };
        break;
      case "Ranger":
        newStats = { ...newStats, strength: 6, speed: 7, magic: 4 };
        break;
      case "Monk":
        newStats = { ...newStats, strength: 7, speed: 6, magic: 6 };
        break;
      default:
        // Keep current stats
        break;
    }
    
    setFighter(newStats);
  };

  const createFighter = async (event) => {
    event.preventDefault();
    
    // Default description if empty
    let finalFighter = { ...fighter };
    if (!finalFighter.description.trim()) {
      finalFighter.description = `A mighty ${finalFighter.class.toLowerCase()} ready for battle.`;
    }
    
    try {
      const { data, error } = await supabase
        .from('Fighters')
        .insert([finalFighter])
        .select();
        
      if (error) {
        console.error('Error creating fighter:', error);
        alert('Failed to create fighter. Please try again.');
      } else {
        window.location = "/";
      }
    } catch (error) {
      console.error('Exception:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Fighter</h2>
      <form onSubmit={createFighter}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={fighter.name} 
            onChange={handleChange}
            placeholder="Enter fighter name" 
            required
          />
        </div>
        
        <div className="form-group">
          <label>Class</label>
          <div className="class-selector">
            {classes.map((classOption) => (
              <div 
                key={classOption}
                className={`class-option ${fighter.class === classOption ? 'selected' : ''}`}
                onClick={() => handleClassSelect(classOption)}
              >
                {classOption}
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label>Strength</label>
          <div className="stat-adjuster">
            <button 
              type="button" 
              onClick={() => handleStatChange('strength', fighter.strength - 1)}
              disabled={fighter.strength <= 1}
            >-</button>
            <div className="stat-meter">
              <div className="stat-value">{fighter.strength}</div>
              <div className="stat-bar">
                <div 
                  className="stat-fill strength" 
                  style={{ width: `${fighter.strength * 10}%` }}
                ></div>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => handleStatChange('strength', fighter.strength + 1)}
              disabled={fighter.strength >= 10}
            >+</button>
          </div>
        </div>
        
        <div className="form-group">
          <label>Speed</label>
          <div className="stat-adjuster">
            <button 
              type="button" 
              onClick={() => handleStatChange('speed', fighter.speed - 1)}
              disabled={fighter.speed <= 1}
            >-</button>
            <div className="stat-meter">
              <div className="stat-value">{fighter.speed}</div>
              <div className="stat-bar">
                <div 
                  className="stat-fill speed" 
                  style={{ width: `${fighter.speed * 10}%` }}
                ></div>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => handleStatChange('speed', fighter.speed + 1)}
              disabled={fighter.speed >= 10}
            >+</button>
          </div>
        </div>
        
        <div className="form-group">
          <label>Magic</label>
          <div className="stat-adjuster">
            <button 
              type="button" 
              onClick={() => handleStatChange('magic', fighter.magic - 1)}
              disabled={fighter.magic <= 1}
            >-</button>
            <div className="stat-meter">
              <div className="stat-value">{fighter.magic}</div>
              <div className="stat-bar">
                <div 
                  className="stat-fill magic" 
                  style={{ width: `${fighter.magic * 10}%` }}
                ></div>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => handleStatChange('magic', fighter.magic + 1)}
              disabled={fighter.magic >= 10}
            >+</button>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={fighter.description}
            onChange={handleChange}
            placeholder="Describe your fighter's background and abilities..."
          ></textarea>
        </div>
        
        <div className="form-actions">
          <input type="submit" value="Create Fighter" />
        </div>
      </form>
    </div>
  );
};

export default CreateFighter;