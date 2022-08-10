import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { CustomCheckbox } from '../customCheckbox/CustomCheckbox';
import { FilterColorAvatar } from '../filterColorAvatar/FilterColorAvatar';
import { capitalize } from '../../utils/utils';
import { colorFilterChanged, selectFilterColors } from '../../redux/slices/filtersSlice';
import { basicColorAvatarStyles } from '../../utils/commonStyles';

export function ColorFilters(props) {
	const {color = 'none'} = props;
	const colors = useSelector(selectFilterColors);
	const dispatch = useDispatch()
	const handleChange = (e) => {
		const isChecked = e.target.checked;
		const changeType = isChecked ? 'added' : 'removed';
		dispatch(colorFilterChanged(color, changeType));
	};
	return (
		<>
			<CustomCheckbox
				onChange={handleChange}
				checked={colors.includes(color)} />
			<span>{capitalize(color)}</span>
			<FilterColorAvatar
				color={color}
				styles={basicColorAvatarStyles.styles} />
		</>
	);
}