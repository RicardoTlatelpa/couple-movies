import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing';
import MoviePage from './components/MoviePage';
import SearchPage from './components/SearchPage';
import Sidenav from './components/Sidebar/Sidenav';
import Backdrop from './components/Backdrop/Backdrop';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sideNavOpen: false
    }
    this.sideNavToggleHandler = this.sideNavToggleHandler.bind(this);
  }
  sideNavToggleHandler(){
    this.setState((prevState) =>{
      return  {sideNavOpen: !prevState.sideNavOpen};
    });
  }
  render(){
    
    let back;
    if(this.state.sideNavOpen){      
      back = <Backdrop toggleView = {this.sideNavToggleHandler}/>
    }
  return (
    <React.Fragment>
      <Navbar toggle = {this.sideNavToggleHandler}/>
      <Sidenav show = {this.state.sideNavOpen}/>
      {back}
      <Switch>
      <Route exact path = "/" component = {Landing}/>
      <Route exact path = "/movie/:id" render = {(routeProps) =>( <MoviePage {...routeProps}/>)}/>
      <Route exact path = "/movie/search/:search" render = {(routeProps) => (<SearchPage {...routeProps}/>)}/>
      </Switch>

    </React.Fragment>
  );
}
}

export default App;
