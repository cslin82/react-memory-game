import React, { Component } from 'react';
import './App.css';


// all one file for now, split later
class Gamepiece extends React.Component {

  render() {
    return (
      <button className="gamepiece"
        onClick={() => this.props.onClick()}>
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
      score: 0,
      highScore: 0
    }

  }

  handleClick(i) {
    this.setState(((prevState, props) => {
      let newTags = [...prevState.tags];
      newTags[i] = !newTags[i];
      console.log('newtags:', newTags);
      console.log('props:', props);
      let newScore = prevState.score + 1;
      let newHighScore = prevState.highScore;
      if (newScore > prevState.highScore) {
        newHighScore = newScore;
      }

      return { 
        tags: newTags,
        score: newScore,
        highScore: newHighScore
       };
    }))
  }

  renderGamepiece(i) {
    return (
      <Gamepiece value={i}
        onClick={() => this.handleClick(i)}
        pieceStatus={this.state.tags[i].toString()}
      />
    );
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
          Game board goes here
          <ul>
            {this.renderGamepiece(0)}
            {this.renderGamepiece(1)}
            {this.renderGamepiece(2)}
            {this.renderGamepiece(3)}
            {this.renderGamepiece(4)}
            {this.renderGamepiece(5)}
            {this.renderGamepiece(6)}
            {this.state.tags.toString()}
          </ul>

        </div>
      </div>
    );
  }
}

export default App;
