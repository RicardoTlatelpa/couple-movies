import React, {Component} from 'react';
import './styles/Navbar.css';


class Navbar extends Component {
    render(){
        return(
            <nav className = "navbar-main">
                <div className = "navbar-container">
                <h1 style = {{color: "yellow"}}>C0upLe-m0viES</h1>
                <ul className = "navbar-items">
                    <li><i className="fas fa-home"></i></li>
                    <li>Genres</li>
                    <li>Popular</li>                    
                </ul>    
                </div>
                <div className = "burger">
                    <div className = "line1"></div>
                    <div className = "line2"></div>
                    <div className = "line3"></div>
                </div>
            </nav>
        )
    }
}


export default Navbar;