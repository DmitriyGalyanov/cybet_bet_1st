import React from 'react';

import {View, Text, Image} from 'react-native';

import { accentColor, masterColor, navigationHeaderBarHeight, navigationHeaderBarImgHeight, navigationHeaderBarImgWidth, windowWidth } from '../constants';


export default function HeaderBar(props) {
	const {name, params} = props.scene.route;

	console.log(name, params)

	const descWord = params ? params.descWord : 'спорт';
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
					{`Прогнозы на ${descWord}`}
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