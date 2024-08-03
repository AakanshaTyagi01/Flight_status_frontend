import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles.css';

const FlightStatus = ({ setFlights }) => {
  const [departureLocation, setDepartureLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [dateOfBooking, setDateOfBooking] = useState(new Date());
  const [flightNumber, setFlightNumber] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [airportOptions, setAirportOptions] = useState([]);
  const [flightStatus, setFlightStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirports = async () => {
      setAirportOptions([
        { code: 'DEL', name: 'Delhi' },
        { code: 'BLR', name: 'Bangalore' },
        // Add more airports as needed
      ]);
    };

    fetchAirports();
  }, []);

  const fetchFlightStatus = async () => {
    try {
      setError(null);
      const response = await axios.post('http://localhost:8080/api/flightstatus/check', {
        departure: departureLocation,
        arrival: arrivalLocation,
        date: dateOfBooking.toISOString().split('T')[0],
        flightNumber,
        bookingId,
      });
      setFlightStatus(response.data);
      setFlights(prevFlights => [...prevFlights, response.data]);
    } catch (error) {
      setError('Error fetching flight status. Please try again.');
      console.error('Error fetching flight status:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchFlightStatus();
  };

  const handleDateChange = (date) => {
    setDateOfBooking(date);
  };

  return (
    <div className="container">
      <h1>Flight Status</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Departure Location:</label>
          <select
            value={departureLocation}
            onChange={(e) => setDepartureLocation(e.target.value)}
            required
          >
            <option value="">Select Departure Location</option>
            {airportOptions.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.name} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Arrival Location:</label>
          <select
            value={arrivalLocation}
            onChange={(e) => setArrivalLocation(e.target.value)}
            required
          >
            <option value="">Select Arrival Location</option>
            {airportOptions.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.name} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date of Booking:</label>
          <DatePicker
            selected={dateOfBooking}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 4))}
            required
          />
        </div>

        <div className="form-group">
          <label>Flight Number:</label>
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Booking ID:</label>
          <input
            type="text"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
          />
        </div>

        <button type="submit">Check Status</button>
      </form>

      {error && <p className="error">{error}</p>}

      {flightStatus && (
        <div className="flight-status-info">
          <div>
            <p><strong>Flight Number:</strong> {flightStatus.flightNumber}</p>
            <p><strong>Status:</strong> {flightStatus.status}</p>
            <p><strong>Departure Time:</strong> {flightStatus.departureTime}</p>
            <p><strong>Source:</strong> {flightStatus.source}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightStatus;
