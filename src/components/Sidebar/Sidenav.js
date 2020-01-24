import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Sidenav.css';
class Sidenav extends Component{
    render(){
        let drawerClasses = 'Sidenav-container';
        if(this.props.show){
            drawerClasses = 'Sidenav-container open';
        }
        return(
            <div className = {drawerClasses}>
                <a className = "Sidenav-item" href = "/">Home</a>
                <a className = "Sidenav-item" href = "/rated">Top Rated</a>
                <a className = "Sidenav-item" href = "/popular">Popular</a>
            </div>
        )
    }
}

export default Sidenav;