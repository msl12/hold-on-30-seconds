import React from 'react';
import './Header.css';

function Header(props) {
	return (
		<div className="header">
			<div className="run-time">
				{props.runTime} seconds
			</div>
		</div>
    );
}

export default Header;