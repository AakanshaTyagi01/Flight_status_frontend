import React from 'react';

const FlightStatusList = ({ flights }) => {
  return (
    <div className="flight-status-list">
      <h2>Flight Statuses</h2>
      <div className="flight-statuses">
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <div key={index} className="flight-status-item">
              <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
              <p><strong>Status:</strong> {flight.status}</p>
              <p><strong>Departure Time:</strong> {flight.departureTime}</p>
              <p><strong>Source:</strong> {flight.source}</p>
            </div>
          ))
        ) : (
          <p>No flight statuses available.</p>
        )}
      </div>
    </div>
  );
};

export default FlightStatusList;
