import React, { Component } from 'react';
import scrollTo from './scrollToAnimate';
import './Carousel.css';
import Poster from '../Poster';
const posterURL =`http://image.tmdb.org/t/p/`;
//pass props to state. array of movies
class Carousel extends Component {
    constructor(props){
        super(props);
        this.state = {
            slidesToScroll: 5
        }
        this.handleRightNav = this.handleRightNav.bind(this);
        this.handleLeftNav = this.handleLeftNav.bind(this);
        this.onResize = this.onResize.bind(this);
        this.checkNumOfSlidesToScroll = this.checkNumOfSlidesToScroll.bind(this);
    }
    onResize(){
        this.checkNumOfSlidesToScroll()
    }
    async componentDidMount(){
        this.checkNumOfSlidesToScroll()
        window.addEventListener('resize',this.onResize);       
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.onResize)
    }
    checkNumOfSlidesToScroll(){
        let numOfSlidesToScroll;
        if(window.innerWidth <= 800){
            numOfSlidesToScroll =2;
        }
        else{
            numOfSlidesToScroll = 5;
        }
        if(this.state.slidesToScroll !== numOfSlidesToScroll){
            this.setState({
                slidesToScroll: numOfSlidesToScroll
            })
        }
    }
    renderPosters(){
        return this.props.array.map(movie => (
            <Poster
            id = {movie.id}
            imageUrl = {`${posterURL}w500${movie.poster_path}`}
            title ={movie.title}
            />
        ))
    }
    handleLeftNav(e){
        const numOfSlidesToScroll = this.state.slidesToScroll;
        const widthOfSlide = 205;
        const { carouselViewport } = this.refs;
        const timeToMoveOneSlide = 200;
        const totalTimeToMove = Math.min((numOfSlidesToScroll * timeToMoveOneSlide),400);
        let newPos = carouselViewport.scrollLeft - (widthOfSlide * numOfSlidesToScroll);
        scrollTo(carouselViewport, newPos, totalTimeToMove, 'scrollLeft');
    }
    handleRightNav(e){
        const numOfSlidesToScroll = this.state.slidesToScroll;
        const widthOfSlide = 205;
        const { carouselViewport } = this.refs;
        const timeToMoveOneSlide = 200;
        const totalTimeToMove = Math.min((timeToMoveOneSlide * numOfSlidesToScroll),400);
        let newPos = carouselViewport.scrollLeft + (widthOfSlide * numOfSlidesToScroll);
        scrollTo(carouselViewport, newPos, totalTimeToMove, 'scrollLeft');
    }

    render(){
        
    return (
        <div className = "carousel-container">
            <div className = "carousel-button">
            <button 
            className = "carousel-nav carousel-left-nav"
            onClick = {this.handleLeftNav}
            >
            &#60;
            </button>
            </div>            
            <div className = "carousel-viewport" ref = "carouselViewport">
                {this.renderPosters()}
            </div>
            <div className = "carousel-button">
            <button 
            className = "carousel-nav carousel-right-nav"
            onClick = {this.handleRightNav}
            >
            &gt;
            </button>
            </div>
        </div>
    );
}
};

export default Carousel;