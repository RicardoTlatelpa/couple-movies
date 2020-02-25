import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing';
import MoviePage from './components/MoviePage';
import SearchPage from './components/SearchPage';
import Sidenav from './components/Sidebar/Sidenav';
import Backdrop from './components/Backdrop/Backdrop';
import TopRatedPage from './TopRatedPage';
import Popularpage from './Popularpage';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sideNavOpen: false,
      header: true
    }
    this.toggleHeader = this.toggleHeader.bind(this);
    this.sideNavToggleHandler = this.sideNavToggleHandler.bind(this);
  }
  toggleHeader(bool){
    this.setState({
      header: bool
    });
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
      {this.state.header ? <div>
        <Navbar toggle = {this.sideNavToggleHandler}/>
      <Sidenav show = {this.state.sideNavOpen}/>
      </div> : null}
      
      
      
      {back}
      <Switch>
      
      <Route exact path = "/" render = {(routeProps) => (<Landing {...routeProps} toggleHeader = {this.toggleHeader}/>)}/>
      <Route exact path = "/movie/:id" render = {(routeProps) =>( <MoviePage {...routeProps} toggleHeader = {this.toggleHeader}  />)}/>
      <Route exact path = "/movie/search/:search" render = {(routeProps) => (<SearchPage {...routeProps} toggleHeader = {this.toggleHeader}/>)}/>
      <Route exact path = "/rated/:number" render = {(routeProps) => (<TopRatedPage {...routeProps} toggleHeader = {this.toggleHeader}/>)}/>
      <Route exact path = "/popular/:number" render ={(routeProps) => (<Popularpage {...routeProps} toggleHeader = {this.toggleHeader}/>)}/>
      </Switch>

    </React.Fragment>
  );
}
}

export default App;
