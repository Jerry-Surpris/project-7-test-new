import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditFighter.css';
import { supabase } from '../client';

const EditFighter = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [fighter, setFighter] = useState({
    id: null,
    name: "",
    class: "Warrior",
    strength: 5,
    speed: 5,
    magic: 5,
    description: ""
  });

  const classes = ["Warrior", "Rogue", "Mage", "Guardian", "Ranger", "Monk"];

  useEffect(() => {
    // First try to find the fighter in props data (for initial load)
    if (data) {
      const foundFighter = data.find(fighter => fighter.id === id);
      if (foundFighter) {
        setFighter(foundFighter);
        return;
      }
    }
    
    // If not found in props, fetch from Supabase
    const fetchFighter = async () => {
      const { data, error } = await supabase
        .from('Fighters')
        .select()
        .eq('id', id)
        .single();
        
      if (error) {
        console.error('Error fetching fighter:', error);
        alert('Fighter not found');
        navigate('/');
      } else if (data) {
        setFighter(data);
      }
    };
    
    fetchFighter();
  }, [id, data, navigate]);

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
    setFighter((prev) => {
      return {
        ...prev,
        class: selectedClass
      };
    });
  };

  const updateFighter = async (event) => {
    event.preventDefault();
    
    try {
      const { error } = await supabase
        .from('Fighters')
        .update({
          name: fighter.name,
          class: fighter.class,
          strength: fighter.strength,
          speed: fighter.speed,
          magic: fighter.magic,
          description: fighter.description
        })
        .eq('id', id);
        
      if (error) {
        console.error('Error updating fighter:', error);
        alert('Failed to update fighter. Please try again.');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Exception:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const deleteFighter = async (event) => {
    event.preventDefault();
    
    if (window.confirm('Are you sure you want to delete this fighter?')) {
      try {
        const { error } = await supabase
          .from('Fighters')
          .delete()
          .eq('id', id);
          
        if (error) {
          console.error('Error deleting fighter:', error);
          alert('Failed to delete fighter. Please try again.');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Exception:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Fighter</h2>
      <form onSubmit={updateFighter}>
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
          <label htmlFor="description">Description</label>
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
          <input type="submit" value="Update Fighter" />
          <button type="button" className="delete-button" onClick={deleteFighter}>
            Delete Fighter
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFighter;