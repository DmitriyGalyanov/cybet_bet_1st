import React, { useEffect } from 'react';

import {
	MainGameScreen,
	PredictionsScreen,
	MatchesListScreen,
	MakeBetScreen,
	BetResultScreen,
} from '../gameScreens';
import {BottomModal, HeaderBar} from '../components';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import { useDispatch, useSelector } from 'react-redux';
import { createMatchesDataAction, selectGameData } from '../redux/stateSlices';

import { mainBGColor, mainColor, masterColor, navigationHeaderBarHeight } from '../constants';


const Stack = createStackNavigator();

export default function Game() {
	const {balance} = useSelector(selectGameData);

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
			<Stack.Navigator initialRouteName='MainGameScreen'
				screenOptions={{
					header: props => <HeaderBar {...props} />
				}}
			>
				<Stack.Screen name='MainGameScreen' component={MainGameScreen} />
				<Stack.Screen name='PredictionsScreen' component={PredictionsScreen} />

				<Stack.Screen name='MatchesListScreen' component={MatchesListScreen} />
				<Stack.Screen name='MakeBetScreen' component={MakeBetScreen} />
				<Stack.Screen name='BetResultScreen' component={BetResultScreen}
					options={{
						headerLeft: null
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
		<BottomModal />
		</>
	)
}