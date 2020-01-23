import React, {Component} from 'react';
import './styles/Landing.css';
import Searchbar from './Searchbar';
import axios from 'axios';
import { uuid } from 'uuidv4';

const postURL = `http://image.tmdb.org/t/p/`;


class Landing extends Component{
    constructor(props){
        super(props);
        this.state = {
            latestMovies: [],
            topRated: [],
            nowPlaying: [],
            upcoming: []
        }
        this.handleScroll = this.handleScroll.bind(this);
    }
     componentDidMount(){    
        axios.all([
            axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`),
            axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`),
            axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`),
            axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`)
        ])
        .then(axios.spread((rated,latest,now,upcoming) => {
            this.setState({
                latestMovies: [...latest.data.results],
                topRated: [...rated.data.results],
                nowPlaying: [...now.data.results],
                upcoming: [...upcoming.data.results]
            })
        }))
    }

        handleScroll(e){
            let element = e.target;
            console.log(element.scrollTop);
        }

    render(){
         let backgroundpic = `${postURL}/original/p3TCqUDoVsrIm8fHK9KOTfWnDjZ.jpg`;
         const image= {
            background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${backgroundpic})`,
            width:'auto',
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover'
        };
        return(
            <section className = "Landing-section">             
                <div className = "Landing-container" style = {image}>   
                
                <h1>Search for a movie:</h1>
                <br/>
                <Searchbar/>                
                </div>                
                <br/>                
                <section className = "display-section">
                <div className = "landing-movies-container">
                    <br/>
                    <h1>Popular</h1>
                    <div className = "card-container">
                    <div className = "cards" >
                        {this.state.latestMovies.map(movie => (
                            <div key = {uuid()} className = "card"> 
                            <a href = {`/movie/${movie.id}`}><div className = "card-img">
                                <img src = {`${postURL}/w185${movie.poster_path}`} alt = {movie.poster_path}/>
                                </div></a>
                                <div className = "card-movie-title">
                                    <h1>{movie.title}</h1>
                                    </div>
                            </div>
                        ))}
                    </div>                                                      
                    </div>
                </div>
                </section>
                <section className = "top-movies-container spaced">
                    <div className = "container">
                    <br/>
                    <h1>Top Rated</h1>
                <div className = "card-container">            
                    <div className = "cards" >
                        {this.state.topRated.map(movie => (
                            <div key = {uuid()} className = "card"> 
                            <a href = {`/movie/${movie.id}`}><div className = "card-img">
                                <img src = {`${postURL}/w185${movie.poster_path}`} alt = {movie.poster_path}/>
                                </div></a>
                                <div className = "card-movie-title">
                                    <h1>{movie.title}</h1>
                                    </div>
                            </div>
                        ))}
                    </div>                                                          
                    </div>
                    </div>
                </section>
                <section className = "now-movies-container spaced">
                    <div className = "container">
                    <br/>
                    <h1>Now Playing</h1>
                <div className = "card-container">                    
                    <div className = "cards" >
                        {this.state.nowPlaying.map(movie => (
                            <div key = {uuid()} className = "card"> 
                            <a href = {`/movie/${movie.id}`}><div className = "card-img">
                                <img src = {`${postURL}/w185${movie.poster_path}`} alt = {movie.poster_path}/>
                                </div></a>
                                <div className = "card-movie-title">
                                    <h1>{movie.title}</h1>
                                    </div>
                            </div>
                        ))}
                    </div>                                                          
                    </div>
                    </div>
                </section>            
                <section className = "upcoming-movies-container spaced">
                    <div className = "container">
                    <br/>
                    <h1>Upcoming Titles</h1>
                <div className = "card-container">                    
                    <div className = "cards" >
                        {this.state.upcoming.map(movie => (
                            <div key = {uuid()} className = "card"> 
                            <a href = {`/movie/${movie.id}`}><div className = "card-img">
                                <img src = {`${postURL}/w185${movie.poster_path}`} alt = {movie.poster_path}/>
                                </div></a>
                                <div className = "card-movie-title">
                                    <h1>{movie.title}</h1>
                                    </div>
                            </div>
                        ))}
                    </div>                                                          
                    </div>
                    </div>
                </section>      
                <footer>
                    <p>Made with love</p>
                    <p>아름 사랑해</p>
                </footer>          
            </section>
        )
    }
}


export default Landing;