import React from 'react';

import {
	PredictionsStackMainScreen,
	PredictionsScreen,
} from '../predictionsStackScreens';
import {BottomModal, HeaderBar} from '../components';

import {createStackNavigator} from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function PredictionsStackScreen() {

	return (
		<>
			<Stack.Navigator initialRouteName='PredictionsStackMainScreen'
				screenOptions={{
					header: props => <HeaderBar {...props} />
				}}
			>
				<Stack.Screen name='PredictionsStackMainScreen' component={PredictionsStackMainScreen} />
				<Stack.Screen name='PredictionsScreen' component={PredictionsScreen} />
			</Stack.Navigator>
		<BottomModal />
		</>
	)
}