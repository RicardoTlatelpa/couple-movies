import React, {Component} from 'react';
import Carousel from '../Carousel/Carousel';
import './Trailers.css';

class Trailers extends Component {
    render(){
        
        return(
            
            <div className = "Trailer-container">                
                <div className = "trailers-title">    
                    
                    <h1 id = "main-title">Trailers</h1>
                    
                    <i onClick = {() => this.props.exit()}className="fas fa-times exitIcon"></i>
                </div>
                <div className = "trailer-trailers-container">
                <Carousel array = {this.props.trailers} posters = {false}/>
                </div>
            </div>
        )
    }
}

export default Trailers;