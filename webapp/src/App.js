import React from 'react';
import './App.css';
import Map from "./Map";

const uw = {lat: 47.655548, lng: -122.303200};

const App = () => (
  <Map center={uw}/>
);

export default App;
