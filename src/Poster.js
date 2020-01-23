import React, {Component} from 'react';
import './styles/Poster.css';
import { Link } from 'react-router-dom';

class Poster extends Component{
    render(){
        return(
            
            <div className = "Poster">                                 
                <div className = "card-inside">                
                <a href = {`/movie/${this.props.id}`}>
                <img src = {this.props.imageUrl}/>     
                </a>                                      
                <p>{this.props.title}</p>
                </div>            
            </div>
            
        )
    }
}

export default Poster;