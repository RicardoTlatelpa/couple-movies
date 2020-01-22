import React, {Component} from 'react';
import axios from 'axios';
import { findMatches } from './helpers/findMatches';
import './styles/Searchbar.css';
import { uuid } from 'uuidv4';
class Searchbar extends Component{

    constructor(props){
        super(props);
        this.state = {
            movieGenres: [],
            input: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    async componentDidMount(){
        let response = await axios.get('https://raw.githubusercontent.com/yegor-sytnyk/movies-list/master/db.json');
       this.setState({
           movieGenres: [...response.data.genres]
       }) 
    }
   
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value 
        })
        
    }
    
    render(){
        let matches = findMatches(this.state.input, this.state.movieGenres);
        let renderMatches = matches.map(x => (
            <li key = {uuid()}>{x}</li>
        ));
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
                <div className = {this.state.input.length > 0 ? 'searchbar-results' : 'noDisplay'}>
                    <ul >
                    {renderMatches.length === 0? <li>No results</li> : renderMatches}
                    
                    </ul>         
                </div>                
            </ul>
        )
    }
}
export default Searchbar;