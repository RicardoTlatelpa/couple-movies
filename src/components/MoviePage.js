import { decimal } from '../helpers/decimalCount';
import { date } from '../helpers/dateShifter';
import { formatRating } from '../helpers/formatRating';
import { getPosterUrl, getProfileUrl, getBackdropUrl, PLACEHOLDERS } from '../helpers/placeholders';
import React, { Component } from 'react';
import axios from 'axios';
import '../styles/MoviePage.css';
import Carousel from '../components/Carousel/Carousel';
import { uuid } from 'uuidv4';
import Trailers from './Trailers/Trailers';
import { Link } from 'react-router-dom';
import MoviePageLoading from './MoviePage/MoviePageLoading';

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
            moviePage: false,
            loading: true,
            loadingFadeOut: false,
        };
        this.contentRef = React.createRef();
        this.assetsCheckStarted = false;
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleMoviePage = this.handleMoviePage.bind(this);
    }
    componentDidMount(){
        window.scrollTo(0, 0);
        this.props.toggleHeader(false);
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.fetchMovieData(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState) {
        const newId = this.props.match.params.id;
        if (prevProps.match.params.id !== newId) {
            window.scrollTo(0, 0);
            this.assetsCheckStarted = false;
            this.setState({ movie_id: newId, loading: true, loadingFadeOut: false });
            this.fetchMovieData(newId);
            return;
        }
        if (this.state.movieData.length > 0 && this.state.loading && !this.assetsCheckStarted) {
            this.assetsCheckStarted = true;
            this.waitForAssetsAndPaint();
        }
    }

    async fetchMovieData(movieId) {
        const castURL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_MOVIE_KEY}`;
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`;
        const similar = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`;
        const trailer = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`;
        const [response, secondr, thirdr, trailerResponse] = await Promise.all([
            axios.get(url),
            axios.get(castURL),
            axios.get(similar),
            axios.get(trailer),
        ]);
        this.setState({
            movie_title: response.data.title,
            posterPath: getBackdropUrl(response.data.backdrop_path),
            movieData: [response.data],
            castData: [...secondr.data.cast.slice(0, 5)],
            similarData: [...thirdr.data.results],
            rating: response.data.vote_average,
            trailerData: [...trailerResponse.data.results],
        });
    }

    waitForAssetsAndPaint() {
        requestAnimationFrame(() => {
            const container = this.contentRef.current;
            if (!container) {
                this.finishLoading();
                return;
            }
            const images = container.querySelectorAll('img');
            const backdropUrl = this.state.posterPath;
            let pending = (backdropUrl ? 1 : 0) + images.length;
            let finished = false;
            if (pending === 0) {
                this.finishLoading();
                return;
            }
            const checkComplete = () => {
                pending--;
                if (pending <= 0 && !finished) {
                    finished = true;
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => this.finishLoading());
                    });
                }
            };
            if (backdropUrl) {
                const bgImg = new Image();
                bgImg.onload = checkComplete;
                bgImg.onerror = checkComplete;
                bgImg.src = backdropUrl;
            }
            images.forEach((img) => {
                if (img.complete) {
                    checkComplete();
                } else {
                    img.addEventListener('load', checkComplete);
                    img.addEventListener('error', checkComplete);
                }
            });
        });
    }

    finishLoading() {
        this.setState({ loadingFadeOut: true });
        setTimeout(() => this.setState({ loading: false }), 600);
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
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 50%, transparent 100%), url("${this.state.posterPath}")`,
            backgroundSize: `cover`,
            backgroundRepeat: 'no-repeat',   
            backgroundPosition: 'center center'         
        }
        return(
            <div ref={this.contentRef}>
                {this.state.loading && (
                    <MoviePageLoading fadeOut={this.state.loadingFadeOut} />
                )}
                {trailerPage}
            <div className = "poster-container" style = {posterImage}>
            <Link to = "/">           
            <i id = 'poster-arrow-left' style = {{color: "white"}} className="fas fa-arrow-left"></i>
            </Link>
                <div className = "poster-name">
                    <h1>{this.state.movie_title}</h1>                
                    <span>Rating: {formatRating(this.state.rating)}</span>
                </div>                
            </div>
            <section className = "poster-info-container">
                {this.state.trailerData.length > 0 && (
                <center>
                    <button onClick = {this.handleMoviePage} id = "trailer-button">
                        Trailers
                    </button>
                </center>
                )}
            {this.state.movieData.map(movie =>(
                                <div key = {uuid()} className = "poster-info">   
                                <div className = "poster-poster">                
                                <img src={getPosterUrl(movie.poster_path, 'w342')} alt={movie.title || movie.id} onError={(e) => { e.target.src = PLACEHOLDERS.poster; }} /> 
                                </div>                                                    
                                <div className = "information">
                               <p><span>Overview:</span><br/>{movie.overview}</p>
                               <p><span>Revenue:</span> <br/>${decimal(movie.revenue)}</p>
                               <p><span>Date Released:</span><br/> {date(movie.release_date)}</p>                                               
                               </div>                   
                           </div>
                       ) )}
                       <div className="poster-cast spotlight-section">
                            <div className="spotlight-header">
                                <span className="spotlight-badge">SPOTLIGHT</span>
                                <h1>Cast</h1>
                            </div>
                            <div className="cast-container">
                               {this.state.castData.map((member, index) => (
                                    <div key={uuid()} className="cast-member spotlight-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <div className="spotlight-beam">
                                            <div className="cast-member-image">
                                                <img className="actor-image" src={getProfileUrl(member.profile_path)} alt={member.name} onError={(e) => { e.target.src = PLACEHOLDERS.profile; }} />
                                            </div>
                                        </div>
                                        <div className="cast-member-overview">                                        
                                            <p className="cast-name"><strong>{member.name}</strong></p>
                                            <p className="cast-character">{member.character}</p>
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