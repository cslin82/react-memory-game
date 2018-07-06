import React, { Component } from 'react';
import './App.css';


// all one file for now, split later
class Gamepiece extends React.Component {

  render() {
    return (
      <button className="gamepiece"
        onClick={() => this.props.onClick()}>
        {this.props.value}
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
      tags: Array(12).fill(null),
    }

  }

  handleClick(i) {
    alert('clicked ' + i)
  }

  renderGamepiece(i) {
    return (
      <Gamepiece value={i}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Memory Game</h1>
          <h2 className="Scoreboard">Scoreboard Current score: [current score] Top score: [top score]</h2>
        </header>
        <div className="Game">
        <p className="App-intro">Click on the game cards without repeating</p>
          Game board goes here
          {this.renderGamepiece(1)}
          {this.renderGamepiece(2)}
          {this.renderGamepiece(3)}
          {this.renderGamepiece(4)}
          {this.renderGamepiece(5)}
          {this.renderGamepiece(6)}
          
       </div>
      </div>
    );
  }
}

export default App;
