import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor() {
	  super()
	  this.state = {
      board_size : 3, // 3-6 (let user choose 4 levels)
      board : [],
      click_count : 0,
    }
    this.nastyShuffleBoard(); // Assuming it's possible to solve the puzzle for any shuffeling (probably it is, i'm not sure, let user test that assumption :)  
    
  }
  
  nastyShuffleBoard = (e) => {
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

  shuffleBoard = (e) => {

  }

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  moveSquare = (index) => {
    // Finding where the empty square is:
    let empty_square_index = this.findEmptySquare();

    if (this.areNeighbors(index, empty_square_index)) {
      let temp = this.state.board[index];
      this.state.board[index] = this.state.board[empty_square_index];
      this.state.board[empty_square_index] = temp;
      this.setState({board: this.state.board})
    }
    else {
      console.log("Tipeshhhh");
    }

    if (this.isFinished()) {
      console.log("Boom!!!")
    }
  }
  
  findEmptySquare = (e) => {
    let empty_square_index = -1;
    let board_size = this.state.board_size;
    for (let i= 0; i < board_size * board_size; ++i) {
      if (this.state.board[i] === 0) {
        empty_square_index = i;
        break;
      }
    }
    
    return empty_square_index;
  }

  // Checking whether or not two indexes are neighbors in board
  areNeighbors = (i,j) => {
    // Gather i neighbors
    let neighbors = []
    let row = Math.floor(i / this.state.board_size)
    let col = i % this.state.board_size
    if (row > 0) {
      neighbors.push(i-this.state.board_size)
    }
    if (row < this.state.board_size - 1) {
      neighbors.push(i + this.state.board_size)
    }
    if (col > 0) {
      neighbors.push(i-1)
    }
    if (col < this.state.board_size - 1) {
      neighbors.push(i + 1)
    }

    return neighbors.includes(j)
  }

  isFinished = (e) => {
    let board_size = this.state.board_size; 
    for (let i= 0; i < board_size * board_size - 1; ++i) {
      if (this.state.board[i] != i+1) {
        return false
      }
    }

    return true
  }

  onClickHandler = (arr_index) => {
    this.state.click_count++;
    console.log(arr_index)
    this.moveSquare(arr_index)
  }

  render_row  = (row_num) =>  {
    let row_buttons = []
    for (let j = 0; j < this.state.board_size; j++) {
      let arr_index = row_num * this.state.board_size + j;
      let arr_val = this.state.board[arr_index] != 0 ? this.state.board[arr_index] : "";
      row_buttons.push(<button className='square-button' onClick={() => this.onClickHandler(arr_index)}> {arr_val} </button>)
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
    return (
      <div className='container'>
        {this.render_board()}
      </div>
    );
  }
}







export default App;
