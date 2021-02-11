import React from 'react';

import {ScrollView, View} from 'react-native';
import {HeaderNavList, HeaderDateNav, PredictionsSection} from '../components';
import { routesList } from '../constants';


export default function MainGameScreen() {
	
	return (
		<ScrollView>
			<HeaderNavList />
			<HeaderDateNav />
			{routesList.map(item => {
				const {routeName, imgSource, descWord} = item;
				if (routeName === 'all') return null;
				return (
					<View key={routeName}>
						<PredictionsSection
							routeName={routeName}
							imgSource={imgSource}
							descWord={descWord}
						/>
					</View>
				)
			})}
		</ScrollView>
	)
}