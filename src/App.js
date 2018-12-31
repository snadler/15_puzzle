import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor() {
	  super()
	  this.state = {
      board_size : 4, // 3-6 (let user choose 4 levels)
      board : [],
      click_count : 0,
      is_cheating : false, // set a hidden button to choose whether to use a true shuffeling or the nasty one
      pieces: 0,
    }
    
    this.state.pieces = Math.pow(this.state.board_size, 2) - 1;
    // this.nastyShuffleBoard(); // In that case we might not have a solution (look in https://en.wikipedia.org/wiki/15_puzzle#Solvability)
    this.shuffleBoard();
  }

  setOrderedBoard = (e) => {
    this.state.board = []
    // Creating an array with values (1 : board_size^2 -1)
    for(let i = 1; i < this.state.board_size * this.state.board_size; ++i) {
      this.state.board.push(i);
    }

    this.state.board.push(0)
  }
  
  nastyShuffleBoard = (e) => {

    this.setOrderedBoard()
    
    // shuffeling the array
    for(let i = this.state.board_size * this.state.board_size - 2; i > 0 ; --i) {
      let swaping_index = this.getRandomInt(0,i)
      if (swaping_index === i) {
        continue
      } 
      else {
        this.swapSquares(i, swaping_index)
      }
    }
  }

  shuffleBoard = (e) => {
    this.setOrderedBoard()
    let right_bottom_corner_idx =this.state.pieces;
    let white_square_index = right_bottom_corner_idx
    
    let cnt = 0;
    this.validShuffleStep(white_square_index, -1, cnt);
  }

  validShuffleStep = (white_square_index, last_index, cnt) => {
    if (white_square_index ===  this.state.pieces && cnt > Math.pow(10, this.state.board_size - 1)/2) {
      return;
    }
    let neighbors = this.getNeighbors(white_square_index);
    let neighbors_cnt = neighbors.length;
    let random_neighbor = -1;
    do {
      random_neighbor = this.getRandomInt(0,neighbors_cnt-1);
    }
    while (neighbors[random_neighbor] == last_index);
    this.swapSquares(white_square_index, neighbors[random_neighbor]);
    this.setState({board: this.state.board});

    setTimeout(() => this.validShuffleStep(neighbors[random_neighbor], white_square_index ,++cnt)  , 500/Math.sqrt(Math.pow(1.3,cnt)));
  }



  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  swapSquares = (i,j) => {
    let temp = this.state.board[i];
    this.state.board[i] = this.state.board[j];
    this.state.board[j] = temp;
  }

  moveSquare = (index) => {
    // Finding where the empty square is:
    let empty_square_index = this.findEmptySquare();

    if (this.areNeighbors(index, empty_square_index)) {
      this.swapSquares(index, empty_square_index);
      this.setState({board: this.state.board})
    }
    else {
      alert("Tipeshhhh!!!");
    }

    if (this.isFinished()) {
      alert("Boom!!!")
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

  // gets array with all nrighbors (square we can move to) for index i
  getNeighbors = (i) => {
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

    return neighbors
  }

  // Checking whether or not two indexes are neighbors in board
  areNeighbors = (i,j) => {
    // Gather i neighbors
    let neighbors = this.getNeighbors(i);
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
