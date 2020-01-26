import React, {Component} from 'react';
import axios from 'axios';
import Poster from './components/Poster';
const baseURL = `http://image.tmdb.org/t/p/`;

class Popularpage extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    async componentDidMount(){
        let response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${this.props.match.params.number}`);
        this.setState({
            data: [...response.data.results]
        })
    }
    render(){
        return(
            <div className = "popularpage-container">
                <center>
                <h1>Popular</h1>
                </center>
                {this.state.data.map(movie => (
                    <Poster title = {movie.title} imageUrl = {`${baseURL}w500/${movie.poster_path}`} id = {movie.id}/>
                ))}
                <div className = "pagination-container">
                    <ul className = "pagination-links">
                        <a className = "pagination-link" href = "/popular/1">1</a>
                        <a className = "pagination-link" href = "/popular/2">2</a>
                        <a className = "pagination-link" href = "/popular/3">3</a>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Popularpage;