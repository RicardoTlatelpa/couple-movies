import React, {Component} from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

class Navbar extends Component { 
    render(){
        return(
            <nav className = 'navbar-main'>
                <div className = "navbar-container">
                    <Link className = "navbar-links" to = "/">
                <h1 style = {{color: "yellow"}}>C0upLe-m0viES</h1>
                    </Link>
                <ul className =  'navbar-items'>
                    <li><Link className = "navbar-links" to = "/"><i className="fas fa-home"></i></Link></li>
                    <li><Link className = "navbar-links" to = "/rated/1">Top Rated</Link></li>
                    <li><Link className = "navbar-links" to = "/popular/1">Popular</Link></li>    
                    
                </ul>    
                </div>
                <div onClick = {this.props.toggle} className = "burger">
                    <div className = "line1"></div>
                    <div className = "line2"></div>
                    <div className = "line3"></div>
                </div>
            </nav>
        )
    }
}


export default Navbar;