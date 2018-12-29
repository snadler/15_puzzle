import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {

  constructor() {
	  super()
	  this.state = {
			board_size : 3,
    }
    
    
	}

  onClickHandler = (e) => {
  }

  render_row  = (row_num) =>  {
    let row_burrons = []
    for (let j = 0; j < this.state.board_size; j++) {
      row_burrons.push(<button className='square-button' onClick={this.onClickHandler}> {row_num} </button>)
    }
    return (
      <div className='row'>
        {row_burrons}
      </div>
    )
  }

  render_board = (row_num) =>  {
    let rows = []
    for (let j = 0; j < this.state.board_size; j++) {
      rows.push(this.render_row(j+1))
    }
    return (
      <div className='board'>
        {rows}
      </div>
    )
  }

  render() {
    return (
      <div className='container'>
        {this.render_board()}
      </div>
    );
  }
}







export default App;
