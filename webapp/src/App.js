import React from 'react';
import './App.css';
import Map from "./Map";

import { Home } from './Home';
import { About } from './About';
import { NoMatch } from './NoMatch';


import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './NavigationBar';
import Sidebar from './Sidebar';
const uw = { lat: 47.655548, lng: -122.303200 };

function App() {
  return (
    <div>
      <Map center={uw} />
      <React.Fragment>
        <Router>
          <NavigationBar />
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;