import React from 'react';
import Header from './Header';
import Board from './Board';
import './Game.css';

var TimeTick = null;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      milliseconds: 0,
      gameState: 0
    };

    this.startGame = this.startGame.bind(this);
    this.watchCount = this.watchCount.bind(this);
    this.loseGame = this.loseGame.bind(this);
  }

  watchCount() {
    var milliseconds = this.state.milliseconds;
    var seconds = this.state.seconds;

    ++milliseconds;
    if (milliseconds % 10 === 0) {
      ++seconds;
      milliseconds = 0;
    }

    this.setState({
      seconds: seconds,
      milliseconds: milliseconds
    });
  }

  startGame() {
    TimeTick = setInterval(this.watchCount, 100);

    this.setState({
      gameState: 1
    });
  }

  loseGame() {
    alert("man, you had held on for " + this.state.seconds + "." + this.state.milliseconds + "s.");
    clearInterval(TimeTick);
    this.setState({
      gameState: 0,
      seconds: 0,
      milliseconds: 0
    });
  }

  render() {
    return (
      <div className="container">
        <Header
          seconds={this.state.seconds}
          milliseconds={this.state.milliseconds} />
        <Board
          startGame={this.startGame}
          gameState={this.state.gameState}
          loseGame={this.loseGame} />
      </div>
    );
  }
}

export default Game;