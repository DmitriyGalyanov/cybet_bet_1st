import React from 'react';
import PropTypes from 'prop-types';

import {TouchableOpacity, View, Image, Text} from 'react-native';
import { headerNavListItemHeight, headerNavListItemImgHeight, headerNavListItemImgWidth, headerNavListItemWidth } from '../constants';
import { useNavigation } from '@react-navigation/native';


HeaderNavListItem.propTypes = {
	routeName: PropTypes.string.isRequired,
	imgSource: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
};
/**
 * @param {{routeName: string, imgSource: number, title: string,}} props
 */
export default function HeaderNavListItem ({routeName, imgSource, title, }) {
	const navigation = useNavigation();
	const handlePress = () => {
		navigation.navigate(routeName)
	};

	return (
		<TouchableOpacity onPress={handlePress}
			style={{
				backgroundColor: 'white',
				elevation: 4,
				margin: 2,
				width: headerNavListItemWidth,
				height: headerNavListItemHeight,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Image
					source={imgSource}
					style={{
						width: headerNavListItemImgWidth,
						height: headerNavListItemImgHeight,
					}}
					width={headerNavListItemImgWidth}
					height={headerNavListItemImgHeight}
				/>
				<Text>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	)
}