import React, {Component} from 'react';
import Carousel from '../Carousel/Carousel';


class Trailers extends Component {
    render(){
        return(
            <div className = "Trailer-container">
                <Carousel array = {this.props.trailers} posters = {false}/>

            </div>
        )
    }
}

export default Trailers;