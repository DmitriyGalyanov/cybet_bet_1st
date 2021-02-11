import React from 'react';
import PropTypes from 'prop-types';

import {
	View,
	Image,
} from 'react-native';

import {teamImagesArray} from '../../assets/images';
import { roundedTeamImgBGColor, roundedTeamImgShadowColor } from '../constants';


TeamImg.propTypes = {
	teamId: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	rounded: PropTypes.bool,
};
/**
 * 
 * @param {{teamId: number}} props
 */
export default function TeamImg({teamId, width, height, rounded}) {

	return (
		<View
			style={{
				backgroundColor: rounded ? roundedTeamImgBGColor : null,
				width: width * 1.35,
				height: height * 1.35,
				borderRadius: (width * 1.35) / 2,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<View
				style={{
					width: width * 1.35,
					height: height * 1.35,
					borderRadius: (width * 1.35) / 2,
					justifyContent: 'center',
					alignItems: 'center',
					borderWidth: rounded ? 3 : 0,
					borderLeftColor: roundedTeamImgShadowColor,
					borderTopColor: roundedTeamImgShadowColor,
					borderBottomColor: 'transparent',
					borderRightColor: 'transparent',
				}}
			>
				<Image
					source={teamImagesArray[teamId]}
					style={{
						width: width,
						height: height,
					}}
				/>
			</View>
		</View>
	)
}