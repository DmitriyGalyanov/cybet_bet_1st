import React from 'react';

import {MatchHistoryStackMainScreen} from '../MatchHistoryStackScreens';
import {HeaderBar} from '../components';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MatchHistoryStackScreen() {

	return (
		<Stack.Navigator initialRouteName='MatchHistoryStackMainScreen'
			screenOptions={{
				header: props => <HeaderBar {...props} title='История'/>
			}}
		>
			<Stack.Screen name='MatchHistoryStackMainScreen' component={MatchHistoryStackMainScreen} />
		</Stack.Navigator>
	)
}