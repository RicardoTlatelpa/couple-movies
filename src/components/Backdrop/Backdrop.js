import React, { Component } from 'react';
import './Backdrop.css';


class Backdrop extends Component{
    render(){
        return(
            <div onClick = {this.props.toggleView} className = "Backdrop-container">

            </div>
        )
    }
}
export default Backdrop;