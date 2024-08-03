import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightStatus from './components/FlightStatus';
import FlightStatusList from './components/FlightStatusList'; 
import Login from './components/Login'; 
import Signup from './components/Signup'; 
import './styles.css';

function App() {
  const [flights, setFlights] = useState([]);
  const [authToken, setAuthToken] = useState(null);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Flight Status Dashboard</h1>
        </header>
        <Routes>
          <Route path="/" element={<FlightStatus setFlights={setFlights} />} />
          <Route path="/statuses" element={<FlightStatusList flights={flights} />} />
          <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
