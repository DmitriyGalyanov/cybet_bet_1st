import React from 'react';

import {
	MainGameScreen,
	PredictionsScreen,
} from '../gameScreens';
import {BottomModal, HeaderBar} from '../components';

import {createStackNavigator} from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function PredictionsStackScreen() {

	return (
		<>
			<Stack.Navigator initialRouteName='MainGameScreen'
				screenOptions={{
					header: props => <HeaderBar {...props} />
				}}
			>
				<Stack.Screen name='MainGameScreen' component={MainGameScreen} />
				<Stack.Screen name='PredictionsScreen' component={PredictionsScreen} />
			</Stack.Navigator>
		<BottomModal />
		</>
	)
}