import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Sidenav.css';
class Sidenav extends Component{
    render(){
        return(
            <div className = "Sidenav-container">
                <Link className = "Sidenav-item" to = "/">Home</Link>
                <Link className = "Sidenav-item" to = "/">Top Rated</Link>
                <Link className = "Sidenav-item" to = "/">Popular</Link>
            </div>
        )
    }
}

export default Sidenav;