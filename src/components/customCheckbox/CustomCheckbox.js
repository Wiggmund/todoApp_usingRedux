import './CustomCheckbox.css';

export function CustomCheckbox(props) {
	const {
		height = 25,
		width = 25,
		borderRadius = '5px',
		checkmarkSrc = './checkmark.png',
		onChange,
		checked
	} = props;

	return (
		<label>
			<div className='customCheckbox'>
				<input 
					className='customCheckbox__hiddenCheckbox'
					type="checkbox" 
					onChange={onChange}
					checked={checked}/>
				<div 
					className='customCheckbox__checkbox'
					style={{height, width, borderRadius}}>
					<img 
						className='checkmark' 
						src={checkmarkSrc} 
						alt="checkmark" />
				</div>
			</div>
		</label>
	);
}