import React, { Component } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { scrolled: false };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    this.setState({ scrolled: window.scrollY > 50 });
  }

  render() {
    const navClass = this.state.scrolled
      ? "navbar-main scrolled"
      : "navbar-main";
    return (
      <nav className={navClass}>
        <div className="navbar-container">
          <Link className="navbar-links" to="/">
            <h1>Couple-Movies</h1>
          </Link>
          <ul className="navbar-items">
            <li>
              <Link className="navbar-links" to="/">
                <i className="fas fa-home"></i>Home
              </Link>
            </li>
            <li>
              <Link className="navbar-links" to="/rated/1">
                Top Rated
              </Link>
            </li>
            <li>
              <Link className="navbar-links" to="/popular/1">
                Popular
              </Link>
            </li>
          </ul>
          <div onClick={this.props.toggle} className="burger">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
