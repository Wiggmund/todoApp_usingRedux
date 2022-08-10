import { useState } from 'react';

export function CustomButton(props) {
	const {
		style,
		text,
		onClick
	} = props;
	const hoverStyle = {
		...style,
		...props.hoverStyle
	};
	const [hover, setHover] = useState(false);

	const handleMouseEnter = () => setHover(true);
	const handleMouseLeave = () => setHover(false);
	return (
		<input
			type="button"
			value={text}
			style={hover ? hoverStyle : style}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={onClick}/>
	); 
}