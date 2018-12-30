import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor() {
	  super()
	  this.state = {
      board_size : 5, // 3-6 (let user choose 4 levels)
      board : [],
      click_count : 0,
    } 
    
  }
  
  createShuffledArray = (e) => {
    this.state.board = []
    // Creating an array with values (1 : board_size^2 -1)
    for(let i = 1; i < this.state.board_size * this.state.board_size; ++i) {
      this.state.board.push(i);
    }
    
    // shuffeling the array
    for(let i = this.state.board_size * this.state.board_size - 2; i > 0 ; --i) {
      let swaping_index = this.getRandomInt(0,i)
      if (swaping_index === i) {
        continue
      } 
      else {
        let temp = this.state.board[i];
        this.state.board[i] = this.state.board[swaping_index];
        this.state.board[swaping_index] = temp;
      }
    }

    // pushing 0 which indicates the empty slot at the end
    this.state.board.push(0)
  }

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onClickHandler = (e) => {
    this.state.click_count++;
  }

  render_row  = (row_num) =>  {
    let row_buttons = []
    for (let j = 0; j < this.state.board_size; j++) {
      let arr_index = row_num * this.state.board_size + j;
      let arr_val = this.state.board[arr_index] != 0 ? this.state.board[arr_index] : "";
      row_buttons.push(<button className='square-button' onClick={this.onClickHandler}> {arr_val} </button>)
    }
    return (
      <div className='row'>
        {row_buttons}
      </div>
    )
  }

  render_board = (row_num) =>  {
    let rows = []
    for (let j = 0; j < this.state.board_size; j++) {
      rows.push(this.render_row(j))
    }
    return (
      <div className='board'>
        {rows}
      </div>
    )
  }

  render() {
    this.createShuffledArray(); // Assuming user will be able to solve the puzzle for any shuffeling (probably he does, i'm not )
    return (
      <div className='container'>
        {this.render_board()}
      </div>
    );
  }
}







export default App;
