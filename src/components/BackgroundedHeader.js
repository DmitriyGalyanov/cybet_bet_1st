import React from 'react';
import PropTypes from 'prop-types';

import {
	View, Text
} from 'react-native';
import { headersTextStyle, mainColor, windowWidth } from '../constants';


BackgroundedHeader.propTypes = {
	title: PropTypes.string.isRequired,
};
export default function BackgroundedHeader({title}) {

	return (
		<View
			style={{
				width: windowWidth,
				backgroundColor: mainColor,
				padding: 8,
			}}
		>
			<Text
				style={[headersTextStyle, {
					textAlign: 'center',
				}]}
			>
				{title}
			</Text>
		</View>
	)
}