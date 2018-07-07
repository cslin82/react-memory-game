import React, { Component } from 'react';
import './App.css';

// all one file for now, split later
// make this functional later if possible
class Gamepiece extends Component {

  render() {
    return (
      <button className="gamepiece"
        onClick={() => this.props.onClick()}
      >
        thing {this.props.value} is {this.props.pieceStatus}
      </button>
    );
  }
}
// end Gamepiece

function GameStatus(props) {
  if (props.condition === 'win') {
    return <p>You win!</p>
  } else if (props.condition === 'lose') {
    return <p>You lose!</p>
  } else {
    return null;
  }
}

class App extends Component {
  constructor(props) {

    // double check whether this needs to be constructor(props) and super(props)
    super(props)

    this.state = {
      tags: Array(12).fill(false),
      pieceOrder: this.shuffledArr(12),
      score: 0,
      highScore: 0,
      resetOnNext: false,
      condition: ''
    }

  }

  handleClick(i) {
    if (this.state.resetOnNext) {
      this.resetGame();
    }

    // increment current score, track high score
    this.setState((prevState, props) => {

      if (this.state.tags[i]) {
        return {
          resetOnNext: true,
          condition: 'lose'
        }
      }

      let newState = { ...prevState }
      newState.tags[i] = !prevState.tags[i]; // or just set to true
      newState.score = prevState.score + 1;

      if (newState.score > prevState.highScore) {
        newState.highScore = newState.score;
      }

      if (newState.tags.every(x => x)) {
        newState.resetOnNext = true;
        newState.condition = 'win';
      }

      newState.pieceOrder = this.shuffledArr(12);

      return newState;
    }) // end setState

  }

  resetGame() {
    this.setState({
      tags: Array(12).fill(false),
      score: 0,
      pieceOrder: this.shuffledArr(12),
      resetOnNext: false,
      condition: ''
    })
  }

  renderGamepiece(i) {
    return (
      <li key={i}>
        <Gamepiece value={i}
          onClick={() => this.handleClick(i)}
          pieceStatus={this.state.tags[i].toString()}
        />
      </li>
    );
  }

  // shuffle functions from https://bost.ocks.org/mike/shuffle/compare.html
  shuffledArr(l) {
    let newArr = Array(l)
    newArr = [...newArr.keys()]
    let m = l, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = newArr[m];
      newArr[m] = newArr[i];
      newArr[i] = t;
    }
    return newArr;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Memory Game</h1>
          <h2 className="Scoreboard">Scoreboard Current score: {this.state.score} Top score: {this.state.highScore}</h2>
        </header>
        <div className="Game">
          <p className="App-intro">Click on the game cards without repeating</p>
          <p>Game board goes here (TODO: Prevent shuffle on game win?)</p>
          <GameStatus condition={this.state.condition}/>
          
          <ul>
            {this.state.pieceOrder.map((i) => this.renderGamepiece(i))}
          </ul>

        </div>
      </div>
    );
  }
}

export default App;
