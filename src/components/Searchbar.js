import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Searchbar.css';

class Searchbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            input: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value 
        })
    }
    handleSearchClick(e) {
        const query = this.state.input.trim();
        if (!query) {
            e.preventDefault();
            return;
        }
        if (this.props.onSearchSubmit) this.props.onSearchSubmit();
    }
    render(){
        const query = this.state.input.trim();
        const searchUrl = `/movie/search/${query}`;
        return(
            <div className="Searchbar-container">
                <div className="searchbar-input-wrapper">
                    <i className="fas fa-search"></i>
                    <input
                        autoComplete="off"
                        onChange={this.handleChange}
                        name="input"
                        value={this.state.input}
                        className="searchbar-input"
                        placeholder="Search"
                        type="text"
                    />
                </div>
                <Link
                    className="search-btn"
                    to={query ? searchUrl : '#'}
                    onClick={this.handleSearchClick}
                >
                   Search
                </Link>
            </div>
        )
    }
}
export default Searchbar;