import React, { useEffect } from 'react';

import {
	PredictionsStackScreen,
	MatchHistoryStackScreen,
} from '../navStackScreens';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {NavigationContainer} from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { useDispatch, useSelector } from 'react-redux';
import { createMatchesDataAction, selectGameData } from '../redux/stateSlices';


const Tab = createMaterialBottomTabNavigator();

export default function Game() {

	const dispatch = useDispatch();
	const createMatches = () => {
		dispatch(createMatchesDataAction());
	};

	const {matchesDataArray} = useSelector(selectGameData);

	useEffect(() => {
		createMatches();
	}, []);
	useEffect(() => {
		if (matchesDataArray.length === 1) {
			createMatches();
		};
	}, [matchesDataArray]);

	return (
		<>
		<NavigationContainer>
			<Tab.Navigator initialRouteName='PredictionsStackScreen'>
				<Tab.Screen name='PredictionsStackScreen' component={PredictionsStackScreen}
					options={{
						title: 'Прогнозы',
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name='home' color={color} size={26} />
						)
					}}
				/>
				<Tab.Screen name='MatchHistoryStackScreen' component={MatchHistoryStackScreen}
					options={{
						title: 'История',
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name='bookmark' color={color} size={26} />
						)
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
		</>
	)
}