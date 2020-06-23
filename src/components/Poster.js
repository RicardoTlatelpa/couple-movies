import React, {Component} from 'react';
import '../styles/Poster.css';


class Poster extends Component{
    render(){
        return(
            
            <div className = {`Poster ${this.props.class ? this.props.class : ''}`}>                                 
                <div className = "card-inside">                
                <a href = {`/movie/${this.props.id}`}>
                <img src = {this.props.imageUrl} alt = {this.props.id}/>     
                </a>                                      
                <p>{this.props.title}</p>
                </div>            
            </div>
            
        )
    }
}

export default Poster;