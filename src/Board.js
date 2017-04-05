import React from 'react';
import './Board.css';

var MouseX = null, MouseY = null;
var HeroOffsetLeft = null, HeroOffsetTop = null;

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			heroX: 150,
			heroY: 150,
			enemy1X: -50,
			enemy1Y: -50,
			enemy2X: -50,
			enemy2Y: -50,
			enemy3X: -50,
			enemy3Y: 330
		};

		this.handleMouse = this.handleMouse.bind(this);
		this.heroMove = this.heroMove.bind(this);
		this.restart = this.restart.bind(this);
	}

	handleMouse(event) {
		if (!this.props.gameState) {
			this.props.startGame();

			this.launchAttack("enemy1");
			this.launchAttack("enemy2");
			this.launchAttack("enemy3");
		}

		var hero = document.getElementById("hero");

		MouseX = event.clientX;
		MouseY = event.clientY;
		HeroOffsetLeft = hero.offsetLeft;
		HeroOffsetTop = hero.offsetTop;

		document.onmousemove = this.heroMove;
		document.onmouseup = this.stopMove;
	}

	heroMove(event) {
        var x = event.clientX - MouseX + HeroOffsetLeft;
        var y = event.clientY - MouseY + HeroOffsetTop;

        this.setState({
        	heroX: x,
        	heroY: y
        });

        if (x < 0 || x > 290 || y < 0 || y > 290) {
        	this.stopMove();
			this.props.loseGame();
			this.restart();
        }
	}

	restart() {
		this.setState({
			heroX: 150,
			heroY: 150,
			enemy1X: -50,
			enemy1Y: -50,
			enemy2X: -50,
			enemy2Y: -50,
			enemy3X: -50,
			enemy3Y: 330
		});

		var enemy1 = document.getElementById("enemy1");
		var enemy2 = document.getElementById("enemy2");
		var enemy3 = document.getElementById("enemy3");
		clearInterval(enemy1.timer);
		clearInterval(enemy2.timer);
		clearInterval(enemy3.timer);
	}

	stopMove() {
		document.onmousemove = null;  
		document.onmouseup = null;
	}

	launchAttack(enemy_id) {
		var enemy = document.getElementById(enemy_id);
		var x = this.state[enemy_id + "X"], y = this.state[enemy_id + "Y"], directionX = 1, directionY = 1, speed = 3;
		var acceleration = 1;
		enemy.timer = setInterval(() => {
            x += speed * directionX;
            y += speed * directionY;

            // every 8 seconds faster.
            ++acceleration;
            if (acceleration % 267 === 0) {
            	speed += 2;
            }

            if (x > (400 - enemy.offsetWidth) || x < -50) {
            	directionX = -directionX;
            }
            if (y > (400 - enemy.offsetHeight) || y < -50) {
            	directionY = -directionY;
            }

            var states = {};
            states[enemy_id + "X"] = x;
            states[enemy_id + "Y"] = y;
            this.setState(states);

            this.crashCheck(enemy);
        }, 30);
	}

	crashCheck(enemy) {
		var hero = document.getElementById("hero");
		var enemyDiv = {
			left: enemy.offsetLeft,
			right: enemy.offsetLeft + enemy.offsetWidth,
			top: enemy.offsetTop,
			bottom: enemy.offsetTop + enemy.offsetHeight
		};
		var heroDiv = {
			left: hero.offsetLeft,
			right: hero.offsetLeft + 60,
			top: hero.offsetTop,
			bottom: hero.offsetTop + 60
		};

		if (enemyDiv.right > heroDiv.left && enemyDiv.left < heroDiv.right && enemyDiv.top < heroDiv.bottom && enemyDiv.bottom > heroDiv.top) {
			this.stopMove();
			this.props.loseGame();
			this.restart();
		}
	}

	render() {
		var heroStyle = {
			left: this.state.heroX,
			top: this.state.heroY
		};
		var enemy1Style = {
			left: this.state.enemy1X,
			top: this.state.enemy1Y
		};
		var enemy2Style = {
			right: this.state.enemy2X,
			top: this.state.enemy2Y
		};
		var enemy3Style = {
			left: this.state.enemy3X,
			top: this.state.enemy3Y
		};

		return (
			<div className="board">
				<div className="play-field">
					<div id="enemy1" className="enemy" style={enemy1Style}></div>
					<div id="enemy2" className="enemy" style={enemy2Style}></div>
					<div id="enemy3" className="enemy" style={enemy3Style}></div>
					<div id="hero" style={heroStyle} onMouseDown={this.handleMouse}></div>
				</div>
			</div>
    	);
    }
}

export default Board;