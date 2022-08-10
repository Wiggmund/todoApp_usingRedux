import './ColorTooltip.css';
import { FilterColorAvatar } from '../filterColorAvatar/FilterColorAvatar';
import { availableColors } from '../../redux/slices/filtersSlice';

const styles = {
	height: '3em',
	width: '3em',
	cursor: 'pointer'
};

const hoverStyles = {
	outlineOffset: '5px',
	outline:' 2px solid rgba(211, 39, 191, 0.5)'
};

export function ColorTooltip(props) {
	const {
		onCloseColorTooltip,
		onChangeTodoColor
	} = props;
	return (
		<div className='colorTooltip'>
			<img
				src={'./x.png'}
				alt="cancelMark"
				className='todo__icon'
				onClick={onCloseColorTooltip}/>
			{availableColors.map((color) => 
				<FilterColorAvatar 
					key={color}
					color={color}
					hoverStyles={hoverStyles}
					styles={styles} 
					onClick={onChangeTodoColor}/>
			)}
			<FilterColorAvatar 
				key={'white'}
				color={'white'}
				hoverStyles={hoverStyles}
				styles={{
					...styles,
					outline:' 2px solid black'
				}} 
				onClick={onChangeTodoColor}/>
		</div>
	);
}