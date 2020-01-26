import React, {Component} from 'react';
import axios from 'axios';
import Poster from './components/Poster';
import './styles/TopRatedPage.css';

const baseURL = `http://image.tmdb.org/t/p/`;
class TopRatedPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],  
        }
    }
    async componentDidMount(){
        let response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${this.props.match.params.number}`);
        this.setState({
            data: [...response.data.results]
        });
    }
    render(){
        return(
            <div className = "topratedpage-container">
                <center>
                <h1>Top Rated</h1>
                </center>
                {this.state.data.map(movie => (
                    <Poster title = {movie.title} imageUrl = {`${baseURL}w500/${movie.poster_path}`} id = {movie.id}/>
                ))}
                <div className = "pagination-container">
                    <ul className = "pagination-links">
                        <a className = "pagination-link" href = "/rated/1">1</a>
                        <a className = "pagination-link" href = "/rated/2">2</a>
                        <a className = "pagination-link" href = "/rated/3">3</a>
                    </ul>
                </div>
            </div>
        )
    }
}

export default TopRatedPage;