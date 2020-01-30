import React, {Component} from 'react';
import Carousel from '../Carousel/Carousel';


class Trailers extends Component {
    render(){
        return(
            <div className = "Trailer-container">
                <center><h1>Trailers</h1></center>
                <Carousel array = {this.props.trailers} posters = {false}/>

            </div>
        )
    }
}

export default Trailers;