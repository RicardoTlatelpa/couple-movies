import React, {Component} from 'react';
import axios from 'axios';
import './styles/MoviePage.css';
class MoviePage extends Component{    
    constructor(props){
        super(props);
        this.state = {
            movie_id: this.props.match.params.id,
            movieData: [],
            posterPath: ''
        }        
    }
    async componentDidMount(){
        const url = `https://api.themoviedb.org/3/movie/${this.state.movie_id}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`;
        let response = await axios.get(url);
        this.setState({
            posterPath: `http://image.tmdb.org/t/p/original/${response.data.backdrop_path}`,
            movieData: [response.data]
        })
        
    }
    render(){        
        console.log(this.state.movieData);
        const posterImage = {
            background: `url("${this.state.posterPath}") no-repeat center center 100% 100%`,
            width: 'auto',
            objectFit: 'cover'
        }
        return(
            <div>
            <div className = "poster-container" style = {posterImage}>

            </div>
            </div>
        )
    }
}


export default MoviePage;