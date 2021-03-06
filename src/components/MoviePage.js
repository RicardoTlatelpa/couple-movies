import {decimal} from '../helpers/decimalCount';
import {date} from '../helpers/dateShifter';
import React, {Component} from 'react';
import axios from 'axios';
import '../styles/MoviePage.css';
import Carousel from '../components/Carousel/Carousel';
import { uuid } from 'uuidv4'
import Trailers from './Trailers/Trailers';
import { Link } from 'react-router-dom';
const baseURL = `http://image.tmdb.org/t/p/`;

class MoviePage extends Component{    
    constructor(props){
        super(props);
        this.state = {
            movie_id: this.props.match.params.id,
            movieData: [],
            rating: '',
            trailerData: [],
            similarData: [],
            posterPath: '',
            castData: [],
            movie_title: '',
            width: 0,
            height: 0,
            resize: false,
            moviePage: false
        }        
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleMoviePage = this.handleMoviePage.bind(this);
    }
    async componentDidMount(){
        this.props.toggleHeader(false);
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);    
        const castURL = `https://api.themoviedb.org/3/movie/${this.state.movie_id}/credits?api_key=${process.env.REACT_APP_MOVIE_KEY}`
        const url = `https://api.themoviedb.org/3/movie/${this.state.movie_id}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`;
        const similar = `https://api.themoviedb.org/3/movie/${this.state.movie_id}/similar?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`
        const trailer =  `https://api.themoviedb.org/3/movie/${this.state.movie_id}/videos?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`
        let response = await axios.get(url);
        let secondr = await axios.get(castURL); 
        let thirdr = await axios.get(similar);
        let trailerResponse = await axios.get(trailer);
        
        
        this.setState({
            movie_title: response.data.title,
            posterPath: `http://image.tmdb.org/t/p/original/${response.data.backdrop_path}`,
            movieData: [response.data],
            castData: [...secondr.data.cast.slice(0,5)],
            similarData: [...thirdr.data.results],
            rating: response.data.vote_average,
            trailerData: [...trailerResponse.data.results]   
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

      handleMoviePage(){
          this.setState((state) => ({
              moviePage: !state.moviePage
          }))
      }

    render(){    
        let trailerPage;
        this.state.moviePage ? trailerPage = (
            <div className = "absolute-trailerPage">
                <center>
                <div className = "poster-trailers">
                           
                           
                           <Trailers trailers = {this.state.trailerData} exit = {this.handleMoviePage}/>
                           
                       </div>
                </center>
            </div>
        ) : trailerPage = null;
        
        let hasSimilar;
        this.state.similarData.length > 1 ? hasSimilar = (
            <section className = "similar-section">
                <center>
            <h2>You may also like these:</h2>
                </center>
                <Carousel 
                array = {this.state.similarData}
                posters = {true}/>                        
            
        </section>
        ):
        hasSimilar = (
            <div>
                <center>
                <h2>Nothing Similar Sorry.</h2>
                </center>
            </div>
        )
        const posterImage = {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${this.state.posterPath}")`,
            backgroundSize: `cover`,
            backgroundRepeat: 'no-repeat',   
            backgroundPosition: 'center center'         
        }
        return(
            <div>
                {trailerPage}
            <div className = "poster-container" style = {posterImage}>
            <Link to = "/">           
            <i id = 'poster-arrow-left' style = {{color: "white"}} className="fas fa-arrow-left"></i>
            </Link>
                <div className = "poster-name">
                    <h1>{this.state.movie_title}</h1>                
                    <span>Rating: {this.state.rating}</span>
                </div>                
            </div>
            <section className = "poster-info-container">
                <center>
                    <button onClick = {this.handleMoviePage} id = "trailer-button">
                        Trailers
                    </button>
                </center>
            {this.state.movieData.map(movie =>(
                                <div key = {uuid()} className = "poster-info">   
                                <div className = "poster-poster">                
                                <img src = {movie.poster_path === null ? 'https://upload.wikimedia.org/wikipedia/en/f/f9/No-image-available.jpg':`${baseURL}w342/${movie.poster_path}`} alt = {movie.id}/> 
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
                                    <div key = {uuid()} className = "cast-member">
                                    <div className = "cast-member-image">
                                        <img className = "actor-image" src = {`${baseURL}w342/${member.profile_path}`} alt ={member.id}/>
                                    </div>
                                    <div className = "cast-member-overview">                                        
                                        <p><strong>{member.name}</strong></p>
                                        <p>{member.character}</p>
                                    </div>
                                    </div>
                               ))}                               
                            </div>
                           
                       </div>
            </section>
          {hasSimilar}
            </div>
        )
    }
}


export default MoviePage;