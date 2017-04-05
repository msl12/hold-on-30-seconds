import React from 'react';
import './Header.css';

function Header(props) {
	return (
		<div className="header">
			<div className="run-time">
				{props.seconds}:{props.milliseconds}0
			</div>
		</div>
    );
}

export default Header;