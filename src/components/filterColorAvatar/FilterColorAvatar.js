import { useState } from 'react';
import './FilterColorAvatar.css';

export function FilterColorAvatar(props) {
	const {
		color, 
		styles = {},
		onClick
	} = props;

	const computedStyles = {
		backgroundColor: color,
		...styles,
		outline: color === 'white' ? '2px solid black' : 'none'
	};

	
	const [hover, setHover] = useState(false);
	let {hoverStyles} = props;
	const doApplyHoverStyles = !!hoverStyles;
	if (doApplyHoverStyles) {
		hoverStyles = {
			...computedStyles,
			...hoverStyles
		};
	}

	const handleMouseEnter = () => {
		if (doApplyHoverStyles) {
			setHover(true);
		}
	};
	const handleMouseLeave = () => {
		if (doApplyHoverStyles) {
			setHover(false);
		}
	};
	const handleClick = (e) => {
		if (onClick) {
			onClick(e, color);
		}
	}

	return (
		<div
			className='filterColorAvatar'
			style={hover? hoverStyles : computedStyles}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}></div>
	);
}