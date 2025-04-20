import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './FighterDetails.css';
import { supabase } from '../client';

const FighterDetails = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fighter, setFighter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First try to find the fighter in props data (for initial load)
    if (data) {
      const foundFighter = data.find(fighter => fighter.id === id);
      if (foundFighter) {
        setFighter(foundFighter);
        setLoading(false);
        return;
      }
    }
    
    // If not found in props, fetch from Supabase
    const fetchFighter = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    
    fetchFighter();
  }, [id, data, navigate]);

  // Calculate fighter power level
  const calculatePowerLevel = (fighter) => {
    if (!fighter) return 0;
    return Math.round((fighter.strength * 1.2 + fighter.speed * 0.8 + fighter.magic * 1.0) / 3);
  };

  // Generate class-specific traits
  const getClassTraits = (fighterClass) => {
    switch (fighterClass) {
      case 'Warrior':
        return ['Brave', 'Strong', 'Direct'];
      case 'Rogue':
        return ['Cunning', 'Swift', 'Stealthy'];
      case 'Mage':
        return ['Wise', 'Mystical', 'Powerful'];
      case 'Guardian':
        return ['Defensive', 'Sturdy', 'Protective'];
      case 'Ranger':
        return ['Sharp-eyed', 'Agile', 'Nature-bonded'];
      case 'Monk':
        return ['Balanced', 'Disciplined', 'Spiritual'];
      default:
        return ['Resourceful', 'Adaptable', 'Skilled'];
    }
  };

  // Generate a special ability based on fighter stats and class
  const getSpecialAbility = (fighter) => {
    if (!fighter) return '';
    
    const { class: fighterClass, strength, speed, magic } = fighter;
    
    // Primary stat is the highest stat
    const primaryStat = Math.max(strength, speed, magic);
    
    if (primaryStat === strength) {
      switch (fighterClass) {
        case 'Warrior': return 'Crushing Blow: A devastating attack that breaks through armor';
        case 'Guardian': return 'Unbreakable Wall: Greatly reduces damage taken for a short time';
        default: return 'Power Strike: A powerful blow that deals increased damage';
      }
    } else if (primaryStat === speed) {
      switch (fighterClass) {
        case 'Rogue': return 'Shadow Strike: An attack from stealth that deals critical damage';
        case 'Ranger': return 'Rapid Shot: Fires multiple arrows in quick succession';
        default: return 'Swift Reflexes: Dodges incoming attacks with increased chance';
      }
    } else {
      switch (fighterClass) {
        case 'Mage': return 'Arcane Blast: A powerful burst of magical energy';
        case 'Monk': return 'Spirit Wave: Channels inner energy to heal and damage';
        default: return 'Mystic Aura: Enhances magical abilities for a short time';
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading fighter data...</div>;
  }

  if (!fighter) {
    return <div className="error">Fighter not found</div>;
  }

  const powerLevel = calculatePowerLevel(fighter);
  const traits = getClassTraits(fighter.class);
  const specialAbility = getSpecialAbility(fighter);

  return (
    <div className="fighter-details">
      <div className="details-header">
        <h1>{fighter.name}</h1>
        <div className="class-badge">{fighter.class}</div>
      </div>
      
      <div className="details-content">
        <div className="stats-section">
          <h2>Combat Stats</h2>
          
          <div className="detail-stat">
            <span className="stat-label">Strength</span>
            <div className="stat-bar">
              <div className="stat-fill strength" style={{ width: `${fighter.strength * 10}%` }}></div>
            </div>
            <span className="stat-value">{fighter.strength}</span>
          </div>
          
          <div className="detail-stat">
            <span className="stat-label">Speed</span>
            <div className="stat-bar">
              <div className="stat-fill speed" style={{ width: `${fighter.speed * 10}%` }}></div>
            </div>
            <span className="stat-value">{fighter.speed}</span>
          </div>
          
          <div className="detail-stat">
            <span className="stat-label">Magic</span>
            <div className="stat-bar">
              <div className="stat-fill magic" style={{ width: `${fighter.magic * 10}%` }}></div>
            </div>
            <span className="stat-value">{fighter.magic}</span>
          </div>
          
          <div className="power-badge">
            <div className="power-icon">⚔️</div>
            <div className="power-info">
              <span className="power-label">Power Level</span>
              <span className="power-value">{powerLevel}</span>
            </div>
          </div>
        </div>
        
        <div className="info-section">
          <div className="traits">
            <h2>Traits</h2>
            <ul className="traits-list">
              {traits.map((trait, index) => (
                <li key={index} className="trait-item">{trait}</li>
              ))}
            </ul>
          </div>
          
          <div className="special-ability">
            <h2>Special Ability</h2>
            <div className="ability-box">
              <span className="ability-name">{specialAbility.split(':')[0]}</span>
              <span className="ability-desc">{specialAbility.split(':')[1]}</span>
            </div>
          </div>
          
          <div className="description">
            <h2>Background</h2>
            <p>{fighter.description || "No background information available."}</p>
          </div>
        </div>
      </div>
      
      <div className="details-actions">
        <Link to={`/edit/${fighter.id}`} className="edit-button">Edit Fighter</Link>
        <Link to="/" className="back-button">Back to Team</Link>
      </div>
    </div>
  );
};

export default FighterDetails;