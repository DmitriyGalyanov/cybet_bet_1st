import React from 'react';
import PropTypes from 'prop-types';

import {
	TouchableOpacity,
	View,
	Text,
} from 'react-native';

import {
	mainButtonsTextStyle,
	mainColor,
} from '../constants';


MainButton.propTypes = {
	title: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};
/**
 * 
 * @param {{title: string, onPress: function, disabled}} props
 */
export default function MainButton({title, onPress, disabled}) {

	return (
		<TouchableOpacity onPress={onPress} disabled={disabled}>
			<View
				style={{
					borderWidth: 2,
					borderColor: disabled ? 'gray' : mainColor,
					borderRadius: 14,
					paddingVertical: 6,
					paddingHorizontal: 14,
					alignSelf: 'flex-start',
				}}
			>
				<Text style={[mainButtonsTextStyle, {color: disabled ? 'gray' : mainColor}]}>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	)
}