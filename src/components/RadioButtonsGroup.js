import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {View} from 'react-native';
import RadioButton from './RadioButton';

import {useDispatch} from 'react-redux';
import { setSelectedOutcome } from '../redux/stateSlices';


RadioButtonsGroup.propTypes = {
	buttons: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		coefficient: PropTypes.number,
	})).isRequired,
	selectedButton: PropTypes.number,
	disabled: PropTypes.bool,
};
/**
 * 
 * @param {{buttons: [...{id: number, name: string, coefficient: number}], selectedButton: ?number, disabled: boolean}} props
 */
export default function RadioButtonsGroup({buttons, selectedButton, disabled}) {
	const dispatch = useDispatch();

	const [selectedButtonId, setSelectedButtonId] = useState(selectedButton ?? -1);

	const handleButtonPress = (id, outcomeName) => {
		setSelectedButtonId(id);
		// dispatch(setSelectedOutcome(outcomeName));
		dispatch(setSelectedOutcome({id: id, name: outcomeName}));
	};


	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-around',
			}}
		>
			{buttons.map(button => {
				const {id, outcomeName, coefficient} = button;
				return (
					<RadioButton key={id}
						id={id}
						onPress={handleButtonPress}
						selected={selectedButtonId === id}
						outcomeName={outcomeName}
						coefficient={coefficient}
						disabled={disabled}
					/>
				)
			})}
		</View>
	)
}