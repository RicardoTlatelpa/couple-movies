import React, { Component } from "react";
import Loading from "./Loading/Loading";
import "../styles/Landing.css";
import Searchbar from "./Searchbar";
import axios from "axios";
import Carousel from "./Carousel/Carousel";
const postURL = `https://image.tmdb.org/t/p/`;

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestMovies: [],
      topRated: [],
      nowPlaying: [],
      upcoming: [],
      Loading: true,
      error: null,
    };
  }
  componentDidMount() {
    this.props.toggleHeader(true);
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`,
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`,
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`,
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`,
        ),
      ])
      .then(
        axios.spread((rated, latest, now, upcoming) => {
          this.setState({
            latestMovies: [...latest.data.results],
            topRated: [...rated.data.results],
            nowPlaying: [...now.data.results],
            upcoming: [...upcoming.data.results],
            Loading: false,
            error: null,
          });
        }),
      )
      .catch((err) => {
        const message =
          !process.env.REACT_APP_MOVIE_KEY ||
          process.env.REACT_APP_MOVIE_KEY === "your_tmdb_api_key_here"
            ? "API key not configured. Add REACT_APP_MOVIE_KEY to your .env file. See README for setup."
            : err.response?.status === 401
              ? "Invalid API key. Check your REACT_APP_MOVIE_KEY in .env"
              : err.message || "Failed to load movies";
        this.setState({ Loading: false, error: message });
      });
  }
  render() {
    const heroBackdrop = this.state.topRated[0]?.backdrop_path
      ? `${postURL}original${this.state.topRated[0].backdrop_path}`
      : `${postURL}original/p3TCqUDoVsrIm8fHK9KOTfWnDjZ.jpg`;
    const image = {
      background: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 50%, rgba(10,10,10,0.9) 100%), url(${heroBackdrop})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
    return (
      <section className="Landing-section">
        {this.state.Loading ? <Loading /> : null}
        {this.state.error ? (
          <div className="api-error-banner">
            <h3>API Error</h3>
            <p>{this.state.error}</p>
            <a
              href="https://www.themoviedb.org/settings/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get a free TMDB API key →
            </a>
          </div>
        ) : null}
        <div className="landing-decoration-container" style={image}>
          <div className="landing-search">
            <h2 id="search_landing_title">Search For a Movie:</h2>
            <Searchbar />
          </div>
        </div>
        <div className="latest-movies-section">
          <h2>Latest</h2>
          <Carousel array={this.state.latestMovies} posters={true} />
        </div>
        <div className="now-playing-section">
          <h2>Now Playing</h2>
          <Carousel array={this.state.nowPlaying} posters={true} />
        </div>
        <div className="upcoming-section">
          <h2>Upcoming</h2>
          <Carousel array={this.state.upcoming} posters={true} />
        </div>
        <footer>
          <div className="horizontal-line">
            <p>Made with love</p>
            <br />
            <span>Designed by Ricardo Tlatelpa</span>
          </div>
        </footer>
      </section>
    );
  }
}

export default Landing;
