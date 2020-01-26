import React, {Component} from 'react';
import Searchbar from '../Searchbar';
import './Sidenav.css';
class Sidenav extends Component{
    render(){
        let drawerClasses = 'Sidenav-container';
        if(this.props.show){
            drawerClasses = 'Sidenav-container open';
        }
        return(
            <div className = {drawerClasses}>
                <Searchbar/>
                <a className = "Sidenav-item" href = "/">Home</a>
                <a className = "Sidenav-item" href = "/rated/1">Top Rated</a>
                <a className = "Sidenav-item" href = "/popular/1">Popular</a>
            </div>
        )
    }
}

export default Sidenav;