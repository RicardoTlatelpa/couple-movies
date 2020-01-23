import React, {Component} from 'react';
import axios from 'axios';
import { findMatches } from './helpers/findMatches';
import './styles/Searchbar.css';
import { uuid } from 'uuidv4';
class Searchbar extends Component{

    constructor(props){
        super(props);
        this.state = {
            input: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value 
        })
        
    }
    
    render(){
        return(
            <ul className = "Searchbar-container">
                
                <input 
                autoComplete = "off"
                onChange = {this.handleChange} 
                name = "input" value = {this.state.input} 
                className = "searchbar-input" 
                placeholder = "Type something..." 
                type = "text"/>
                <i className="fas fa-search fa-xs"></i>
                
            </ul>
        )
    }
}
export default Searchbar;