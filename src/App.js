import React from 'react';
import Navbar from './Navbar';
import { Switch, Route } from 'react-router-dom';
import Landing from './Landing';
import MoviePage from './MoviePage';
import SearchPage from './SearchPage';
function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Switch>
      <Route exact path = "/" component = {Landing}/>
      <Route exact path = "/movie/:id" render = {(routeProps) =>( <MoviePage {...routeProps}/>)}/>
      <Route exact path = "/movie/search/:search" render = {(routeProps) => (<SearchPage {...routeProps}/>)}/>
      </Switch>

    </React.Fragment>
  );
}

export default App;
