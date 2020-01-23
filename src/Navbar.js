import React, {Component} from 'react';
import './styles/Navbar.css';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            appear: false
        }
        this.handleNavbar = this.handleNavbar.bind(this);
    }
    handleNavbar(){
        this.setState({
            appear: !this.state.appear
        });
    }
    render(){
        console.log(this.state.appear);
        return(
            <nav className = 'navbar-main'>
                <div className = "navbar-container">
                    <Link className = "navbar-links" to = "/">
                <h1 style = {{color: "yellow"}}>C0upLe-m0viES</h1>
                    </Link>
                <ul className = {this.state.appear ? 'navbar-items open' : 'navbar-items'}>
                    <li><Link className = "navbar-links" to = "/"><i className="fas fa-home"></i></Link></li>
                    <li><Link className = "navbar-links" to = "/rated">Top Rated</Link></li>
                    <li><Link className = "navbar-links" to = "/popular">Popular</Link></li>                                    
                </ul>    
                </div>
                <div onClick = {this.handleNavbar} className = "burger">
                    <div className = "line1"></div>
                    <div className = "line2"></div>
                    <div className = "line3"></div>
                </div>
            </nav>
        )
    }
}


export default Navbar;