import React, {Component} from 'react';
import './Pagination.css';


class Pagination extends Component{
    render(){
        return(
            <div className = "pagination-container">
                  <ol>
                      <li>1</li>
                      <li>2</li>
                  </ol>      
            </div>
        )
    }
}


export default Pagination;