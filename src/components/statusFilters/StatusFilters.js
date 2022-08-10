import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { CustomCheckbox } from '../customCheckbox/CustomCheckbox';
import { statusFilterChanged } from '../../redux/slices/filtersSlice';
import { capitalize } from '../../utils/utils';
import { selectFilterStatus } from '../../redux/slices/filtersSlice';

export function StatusFilter(props) {
	const currentFilterStatus = useSelector(selectFilterStatus);
	const {filter} = props;
	const dispatch = useDispatch();
	const handleChange = (e) => {
		dispatch(statusFilterChanged(filter));
	}
	return (
		<>
			<CustomCheckbox
				onChange={handleChange}
				checked={currentFilterStatus === filter}/>
			<span>{capitalize(filter)}</span>
		</>
	);
}