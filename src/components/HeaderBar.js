import React from 'react';

import {View, Text, Image} from 'react-native';

import {
	accentColor,
	masterColor,
	navigationHeaderBarHeight,
	navigationHeaderBarImgHeight,
	navigationHeaderBarImgWidth,
	windowWidth,
} from '../constants';


export default function HeaderBar({scene, title}) {
	const {params} = scene?.route;

	const descWord = params ? params.descWord : 'спорт';

	if (!title) title = `Прогнозы на ${descWord}`;

	const imgSource = params?.imgSource;

	return (
		<View
			style={{
				width: windowWidth,
				height: navigationHeaderBarHeight,
				backgroundColor: masterColor,
				elevation: 4,
				borderBottomEndRadius: 8,
				borderBottomStartRadius: 8,
				flexDirection: params ? 'row' : 'column',
				justifyContent: params ? 'flex-start' : 'center',
				alignItems: params ? 'center' : 'flex-start',
				paddingLeft: 8,
				marginBottom: 8,
			}}
		>
			{params && (
				<Image
					source={imgSource}
					width={navigationHeaderBarImgWidth}
					height={navigationHeaderBarImgHeight}
					style={{
						width: navigationHeaderBarImgWidth,
						height: navigationHeaderBarImgHeight,
					}}
				/>
			)}
			<View
				style={{
					paddingLeft: 8,
				}}
			>
				<Text
					style={{
						fontWeight: 'bold',
						fontSize: 24,
					}}
				>
					{title}
				</Text>
				{params && (
					<View
						style={{
							backgroundColor: accentColor,
							maxHeight: 4,
							flex: 1,
						}}
					/>
				)}
			</View>
		</View>
	)
}