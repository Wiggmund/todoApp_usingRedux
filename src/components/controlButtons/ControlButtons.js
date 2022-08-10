import {useDispatch} from 'react-redux';
import { CustomButton } from '../customButton/CustomButton';
import { basicButtonStyles } from '../../utils/commonStyles';

export function ControlButtons(props) {
	const {
		buttonProps
	} = props;
	
	const dispatch = useDispatch();
	const handleClick = (e) => {
		dispatch(buttonProps.action());
	};
	return (
		<CustomButton 
			key={buttonProps.text}
			text={buttonProps.text}
			style={basicButtonStyles.styles}
			hoverStyle={basicButtonStyles.hoverStyles}
			onClick={handleClick}/>
	);
}