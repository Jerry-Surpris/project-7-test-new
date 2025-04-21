import React, { useState, useEffect } from 'react';
import FighterCard from '../components/FighterCard';
import { supabase } from '../client';
import './ViewTeam.css';

const ViewTeam = (props) => {
  const [fighters, setFighters] = useState([]);
  const [teamStats, setTeamStats] = useState({
    totalFighters: 0,
    avgStrength: 0,
    avgSpeed: 0,
    avgMagic: 0,
    teamPower: 0
  });

  useEffect(() => {
    // First set data from props (for initial render)
    if (props.data) {
      setFighters(props.data);
      calculateTeamStats(props.data);
    }

    // Then fetch data from Supabase
    const fetchFighters = async () => {
      const { data, error } = await supabase
        .from('Fighters')
        .select()
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching fighters:', error);
      } else if (data) {
        setFighters(data);
        calculateTeamStats(data);
      }
    };

    fetchFighters();
  }, [props]);

  const calculateTeamStats = (teamData) => {
    if (!teamData || teamData.length === 0) {
      setTeamStats({
        totalFighters: 0,
        avgStrength: 0,
        avgSpeed: 0,
        avgMagic: 0,
        teamPower: 0
      });
      return;
    }

    const totalFighters = teamData.length;
    let totalStr = 0, totalSpd = 0, totalMag = 0;

    teamData.forEach(fighter => {
      totalStr += fighter.strength || 0;
      totalSpd += fighter.speed || 0;
      totalMag += fighter.magic || 0;
    });

    const avgStrength = Math.round(totalStr / totalFighters);
    const avgSpeed = Math.round(totalSpd / totalFighters);
    const avgMagic = Math.round(totalMag / totalFighters);
    
    // Calculate overall team power
    const teamPower = Math.round((avgStrength * 1.2 + avgSpeed * 0.8 + avgMagic * 1.0) / 3);

    setTeamStats({
      totalFighters,
      avgStrength,
      avgSpeed,
      avgMagic,
      teamPower
    });
  };

  const updateFighter = async (updatedFighter) => {
    try {
      const { error } = await supabase
        .from('Fighters')
        .update(updatedFighter)
        .eq('id', updatedFighter.id);

      if (error) {
        console.error('Error updating fighter:', error);
        alert('Failed to update fighter. Please try again.');
      } else {
        setFighters((prevFighters) =>
          prevFighters.map((fighter) =>
            fighter.id === updatedFighter.id ? updatedFighter : fighter
          )
        );
        calculateTeamStats([...fighters]);
      }
    } catch (error) {
      console.error('Exception:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      {fighters && fighters.length > 0 ? (
        <>
          <div className="team-stats">
            <h2>Team Stats</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-title">Fighters</span>
                <span className="stat-value">{teamStats.totalFighters}</span>
              </div>
              <div className="stat-box">
                <span className="stat-title">Avg STR</span>
                <span className="stat-value">{teamStats.avgStrength}</span>
              </div>
              <div className="stat-box">
                <span className="stat-title">Avg SPD</span>
                <span className="stat-value">{teamStats.avgSpeed}</span>
              </div>
              <div className="stat-box">
                <span className="stat-title">Avg MAG</span>
                <span className="stat-value">{teamStats.avgMagic}</span>
              </div>
              <div className="stat-box power">
                <span className="stat-title">Team Power</span>
                <span className="stat-value">{teamStats.teamPower}</span>
              </div>
            </div>
          </div>

          <div className="ViewTeam">
            {fighters.map((fighter) => (
              <FighterCard
                key={fighter.id}
                id={fighter.id}
                name={fighter.name}
                class={fighter.class}
                strength={fighter.strength}
                speed={fighter.speed}
                magic={fighter.magic}
                description={fighter.description}
                updateFighter={updateFighter}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <h2>No Fighters Yet 😞</h2>
          <p>Create your first fighter to start building your team!</p>
        </div>
      )}
    </div>
  );
};

export default ViewTeam;