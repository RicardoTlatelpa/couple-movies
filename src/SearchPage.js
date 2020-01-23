import React, { Component } from 'react';
import axios from 'axios';
import Poster from './Poster';
import './styles/SearchPage.css';
const postURL = `http://image.tmdb.org/t/p/`;

class SearchPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchData: []
        }    
    }
    async componentDidMount(){
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${this.props.match.params.search}&page=1&include_adult=false`;
        let response = await axios.get(url);
        this.setState({
            searchData:[...response.data.results]
        });
    }
    render(){        
        return(
            <section className = "Searchpage-section">
                <h1>Results:</h1>
                <div className = "results-container">
                    {this.state.searchData.map(result => (
                        <Poster title = {result.title} id = {result.id} imageUrl = {`${postURL}w500/${result.poster_path}`}/>
                    ))}
                </div>
            </section>
        )
    }
}

export default SearchPage;