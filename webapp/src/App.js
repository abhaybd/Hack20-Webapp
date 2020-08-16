import React from 'react';
import './App.css';
import Map from "./Map";

let currentLocation = {lat: 47.655548, lng: -122.303200};

const App = () => (
  <Map center={currentLocation}/>
);

export default App;
