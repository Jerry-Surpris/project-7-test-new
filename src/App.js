// Jerry Surpris
// Z23568981
import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ViewTeam from './pages/ViewTeam';
import CreateFighter from './pages/CreateFighter';
import EditFighter from './pages/EditFighter';
import FighterDetails from './pages/FighterDetails';

const App = () => {
  
  const defaultDescr = 'This fighter is ready for battle. Customize their stats to make them a formidable ally on your quest.';

  // Sample data to start with before connecting to Supabase
  const fighters = [
    {
      'id': '1', 
      'name': 'Shadow Blade', 
      'class': 'Assassin',
      'strength': 6,
      'speed': 9, 
      'magic': 4,
      'description': defaultDescr
    },
    {
      'id': '2', 
      'name': 'Iron Shield', 
      'class': 'Guardian',
      'strength': 8,
      'speed': 4, 
      'magic': 3,
      'description': defaultDescr
    },
    {
      'id': '3', 
      'name': 'Mystic Seer', 
      'class': 'Mage',
      'strength': 3,
      'speed': 5, 
      'magic': 10,
      'description': defaultDescr
    },
  ];
 
  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ViewTeam data={fighters} />
    },
    {
      path: "/fighter/:id",
      element: <FighterDetails data={fighters} />
    },
    {
      path: "/edit/:id",
      element: <EditFighter data={fighters} />
    },
    {
      path: "/new",
      element: <CreateFighter />
    }
  ]);

  return ( 
    <div className="App">
      <div className="header">
        <h1>⚔️ Fantasy Fighters</h1>
        <Link to="/"><button className="headerBtn">View My Team 👥</button></Link>
        <Link to="/new"><button className="headerBtn">Add New Fighter 🔥</button></Link>
      </div>
      {element}
    </div>
  );
}

export default App;