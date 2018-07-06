import React, { Component } from 'react';
import './App.css';


// all one file for now, split later
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




class App extends Component {
  constructor(props) {

    // double check whether this needs to be constructor(props) and super(props)
    super(props)

    this.state = {
      tags: Array(12).fill(false),
      pieceorder: this.shuffledArr(12),
      score: 0,
      highScore: 0
    }

  }

  handleClick(i) {
    if (this.state.tags[i]) {
      alert('miss');
      this.resetGame();
    } else {
      // increment current score, track high score
      this.setState((prevState, props) => {
        let newTags = [...prevState.tags];
        newTags[i] = !newTags[i]; // or just set to true

        let newScore = prevState.score + 1;
        let newHighScore = prevState.highScore;
        if (newScore > prevState.highScore) {
          newHighScore = newScore;
        }

        if (newTags.every(x => x)) {
          alert('win');
          // this.resetGame(); // throws warning
        }

        // ES6-ify this later
        return {
          tags: newTags,
          score: newScore,
          highScore: newHighScore,
          pieceorder: this.shuffledArr(12)
        };
      }) // end setState
    }
  }

  resetGame() {
    this.setState({
      tags: Array(12).fill(false),
      score: 0,
      pieceorder: this.shuffledArr(12)
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
          Game board goes here (TODO: Prevent shuffle on game win?)
          <ul>
            {this.state.pieceorder.map((i) => this.renderGamepiece(i))}
          </ul>

        </div>
      </div>
    );
  }
}

export default App;
