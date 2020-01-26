import React, {Component} from 'react';
import '../styles/Landing.css';
import Searchbar from './Searchbar';
import axios from 'axios';
import { uuid } from 'uuidv4';
import Carousel from './Carousel/Carousel';
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
            
            <div className = "landing-decoration-container" style = {image}>
                <div className = "landing-search">
                    <h2>Search For a Movie:</h2>
                    <Searchbar/>
                </div>
            <div className = "top-rated-section">
            <h2>Top Rated</h2>           
            <Carousel array={this.state.topRated} />          
            </div>
            </div>
            <div className = "latest-movies-section">
                <h2>Latest</h2>
            <Carousel array = {this.state.latestMovies}/>
            </div>
            <div className = "now-playing-section">
                <h2>Now Playing</h2>
            <Carousel array = {this.state.nowPlaying}/>
            </div>
            <div className = "upcoming-section">
                <h2>Upcoming</h2>
            <Carousel array = {this.state.upcoming}/>
            </div>
                <footer>
                    <div className = "horizontal-line">
                    <p>Made with love</p>
                    <br/>
                    <span>Designed by Ricardo Tlatelpa</span>
                    </div>
                    <p>아름 사랑해</p>
                </footer>          
            </section>
        )
    }
}


export default Landing;