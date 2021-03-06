import React, {Component} from 'react';
import '../styles/Searchbar.css';



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
                placeholder = "Search" 
                type = "text"/>
                <i className="fas fa-search fa-xs"></i>
                
               <a className = "search-btn" href = {`/movie/search/${this.state.input}`}>
                   Search
               </a>
               
                
            </ul>
        )
    }
}
export default Searchbar;