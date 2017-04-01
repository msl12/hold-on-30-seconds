import React from 'react';
import Header from './Header';
import Board from './Board';
import './Game.css';

var TimeTick = null;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runTime: 0,
      gameState: 0
    };

    this.startGame = this.startGame.bind(this);
    this.watchCount = this.watchCount.bind(this);
    this.loseGame = this.loseGame.bind(this);
  }

  watchCount() {
    this.setState((prevState) => {
      return {
        runTime: prevState.runTime + 1
      };
    });
  }

  startGame() {
    TimeTick = setInterval(this.watchCount, 1000);

    this.setState({
      gameState: 1
    });
  }

  loseGame() {
    alert("man, you had held on for " + this.state.runTime + "s.");
    clearInterval(TimeTick);
    this.setState({
      gameState: 0,
      runTime: 0
    });
  }

  render() {
    return (
      <div className="container">
        <Header runTime={this.state.runTime} />
        <Board
          startGame={this.startGame}
          gameState={this.state.gameState}
          loseGame={this.loseGame} />
      </div>
    );
  }
}

export default Game;