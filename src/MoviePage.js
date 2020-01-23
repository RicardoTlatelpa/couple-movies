import {decimal} from './helpers/decimalCount';
import {date} from './helpers/dateShifter';
import React, {Component} from 'react';
import axios from 'axios';
import './styles/MoviePage.css';
import Poster from './Poster';
const baseURL = `http://image.tmdb.org/t/p/`;

class MoviePage extends Component{    
    constructor(props){
        super(props);
        this.state = {
            movie_id: this.props.match.params.id,
            movieData: [],
            rating: '',
            similarData: [],
            posterPath: '',
            castData: [],
            movie_title: '',
            width: 0,
            height: 0,
            resize: false
        }        
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    async componentDidMount(){
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);    
        const castURL = `https://api.themoviedb.org/3/movie/${this.state.movie_id}/credits?api_key=${process.env.REACT_APP_MOVIE_KEY}`
        const url = `https://api.themoviedb.org/3/movie/${this.state.movie_id}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`;
        const similar = `https://api.themoviedb.org/3/movie/${this.state.movie_id}/similar?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`
        let response = await axios.get(url);
        let secondr = await axios.get(castURL); 
        let thirdr = await axios.get(similar);
        this.setState({
            movie_title: response.data.title,
            posterPath: `http://image.tmdb.org/t/p/original/${response.data.backdrop_path}`,
            movieData: [response.data],
            castData: [...secondr.data.cast.slice(0,5)],
            similarData: [...thirdr.data.results],
            rating: response.data.vote_average   
        })        
    }
      updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});  
        if(this.state.width <= 1840){
            this.setState({
                resize: !this.state.resize
            })
        }
      }
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
    render(){                
        console.log(this.state);
        const posterImage = {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${this.state.posterPath}")`,
            backgroundSize: `cover`,
            backgroundRepeat: 'no-repeat',   
            backgroundPosition: this.state.resize ? `0% 0%` : 'center center'         
        }
        return(
            <div>
            <div className = "poster-container" style = {posterImage}>
                
                <div className = "poster-name">
                    <h1>{this.state.movie_title}</h1>                
                    <span>Rating: {this.state.rating}</span>
                </div>                
            </div>
            <section className = "poster-info-container">
            {this.state.movieData.map(movie =>(
                                <div className = "poster-info">   
                                <div className = "poster-poster">                
                                <img src = {`${baseURL}original/${movie.poster_path}`}/> 
                                </div>                                                    
                                <div className = "information">
                               <p><span>Overview:</span><br/>{movie.overview}</p>
                               <p><span>Revenue:</span> <br/>${decimal(movie.revenue)}</p>
                               <p><span>Date Released:</span><br/> {date(movie.release_date)}</p>                                               
                               </div>                   
                           </div>
                       ) )}
                       <div className = "poster-cast">
                            <h1>Cast</h1>
                            <hr/>
                            <div className = "cast-container">
                               {this.state.castData.map(member => (
                                    <div className = "cast-member">
                                    <div className = "cast-member-image">
                                        <img className = "actor-image" src = {`${baseURL}w500/${member.profile_path}`}/>
                                    </div>
                                    <div className = "cast-member-overview">                                        
                                        <p><strong>{member.name}</strong></p>
                                        <p>{member.character}</p>
                                    </div>
                                    </div>
                               ))}                               
                            </div>
                            <p><a id = "cast-full" href = "#">View full cast</a></p>
                       </div>
            </section>
                <section className = "similar-section">
                    <h2>You may also like these:</h2>
                    <div className = "similar-container">
                        {this.state.similarData.map(movie => (
                            <Poster imageUrl = {`${baseURL}w500${movie.poster_path}`} title = {movie.title} id = {movie.id}/>
                        ))}

                        
                    </div>
                </section>
            </div>
        )
    }
}


export default MoviePage;