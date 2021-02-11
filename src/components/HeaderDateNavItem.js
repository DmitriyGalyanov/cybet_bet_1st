import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

import {TouchableOpacity, View, Animated} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { selectGameData, setSelectedDate } from '../redux/stateSlices';

import { accentColor, grayedTextColor, headerDateNavItemWidth, mainTextColor } from '../constants';
import { animateValue } from '../helpers';


HeaderDateNavItem.propTypes = {
	dateName: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};
/**
 * @param {{dateName: string, title: string}} props
 */
export default function HeaderDateNavItem ({dateName, title}) {

	const {selectedDate} = useSelector(selectGameData);

	const isActive = selectedDate === dateName;

	const decorMaxHeight = 4;
	const animDuration = 200;

	const textColor = useRef(new Animated.Value(isActive ? 1 : 0));
	const decorVisibleHeight = useRef(new Animated.Value(isActive ? decorMaxHeight : 0));

	const dispatch = useDispatch();
	const handlePress = () => {
		dispatch(setSelectedDate(dateName));
	};

	useEffect(() => {
		if (isActive) {
			animateValue(
				textColor,
				1,
				animDuration,
			);
			animateValue(
				decorVisibleHeight,
				decorMaxHeight,
				animDuration
			);
		} else {
			animateValue(
				textColor,
				0,
				animDuration,
			);
			animateValue(
				decorVisibleHeight,
				0,
				animDuration
			);
		};
	}, [isActive]);

	return (
		<TouchableOpacity onPress={handlePress}
			style={{
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Animated.Text
				style={{
					color: textColor.current.interpolate({
						inputRange: [0, 1],
						outputRange: [grayedTextColor, mainTextColor]
					}),
					fontWeight: 'bold',
					fontSize: 16,
				}}
			>
				{title}
			</Animated.Text>
			<View
				style={{
					width: headerDateNavItemWidth,
					paddingHorizontal: 8,
					height: decorMaxHeight,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Animated.View
					style={{
						width: headerDateNavItemWidth - 16,
						height: decorVisibleHeight.current,
						backgroundColor: accentColor,
						borderRadius: 2,
					}}
				/>
			</View>
		</TouchableOpacity>
	)
}