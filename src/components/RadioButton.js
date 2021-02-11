import React from 'react';
import PropTypes from 'prop-types';

import {TouchableOpacity, View, Text} from 'react-native';

import { mainColor, secondaryTextStyle } from '../constants';


RadioButton.propTypes = {
	id: PropTypes.number.isRequired,
	onPress: PropTypes.func.isRequired,
	selected: PropTypes.bool,
	outcomeName: PropTypes.string.isRequired,
	coefficient: PropTypes.number.isRequired,
	disabled: PropTypes.bool,
};
/**
 * 
 * @param {{id: number, onPress: function, selected: bool, outcomeName: string, coefficient: number, disabled: boolean}} props
 */
export default function RadioButton({id, onPress, selected, outcomeName, coefficient, disabled}) {
	const handlePress = () => {
		onPress(id, outcomeName);
	};

	return (
		<TouchableOpacity onPress={handlePress} disabled={disabled}>
			<View
				style={{
					height: 36,
					width: 36,
					borderRadius: 18,
					borderWidth: 2,
					borderColor: mainColor,
					alignItems: 'center',
					justifyContent: 'center',
					alignSelf: 'center',
				}}
			>
				{selected && (
					<View
						style={{
							height: 27,
							width: 27,
							borderRadius: 14,
							backgroundColor: mainColor,
							alignSelf: 'center',
						}}
					/>
				)}
			</View>
			<Text
				style={[secondaryTextStyle, {
					textAlign: 'center',
					alignItems: 'center',
					marginTop: 4,
					alignSelf: 'center'
				}]}
			>
				{coefficient}
			</Text>
		</TouchableOpacity>
	)
}