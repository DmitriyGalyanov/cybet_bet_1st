import { useFocusEffect } from '@react-navigation/core';
import React from 'react';

import {StyleSheet, View, Text, ScrollView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MatchTile } from '../components';
import { coloredHeadersTextStyle, mainBGColor, navigationHeaderBarHeight, windowHeight } from '../constants';
import { selectGameData, setCurrentlySelectedMatch, setSelectedOutcome } from '../redux/stateSlices';


export default function MatchesListScreen() {
	const matchesData = useSelector(selectGameData).matchesDataArray;

	const dispatch = useDispatch();

	useFocusEffect(
		React.useCallback(() => {
			dispatch(setSelectedOutcome({id: -1, name: ''}));
			dispatch(setCurrentlySelectedMatch(0));
		}, [])
	);

	return (
		<View style={styles.wrap}>
			<View style={styles.headerWrap}>
				<Text style={[coloredHeadersTextStyle, styles.headerText]}>
					ИГРЫ СЕГОДНЯ
				</Text>
			</View>
			<ScrollView
				style={{
					minHeight: windowHeight - navigationHeaderBarHeight - 32,//headerWrapHeight
				}}
				contentContainerStyle={styles.listContainerStyle}
			>
				{matchesData.map(match => {
					const {
						matchId,
						coefficients,
						firstTeamId,
						matchCurrentTime,
						secondTeamId} = match;
					return (
						<View style={styles.tileWrap} key={matchId}>
							<MatchTile
								matchId={matchId}
								firstTeamId={firstTeamId}
								matchCurrentTime={matchCurrentTime}
								secondTeamId={secondTeamId}
								coefficients={coefficients}
							/>
						</View>
						
					)
				})}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	wrap: {
		backgroundColor: mainBGColor,
		paddingBottom: 60,
	},

	headerWrap: {
		alignSelf: 'center',
		marginBottom: 12,
		height: 32,
	},
	headerText: {
		fontWeight: 'normal',
	},

	listContainerStyle: {
		minHeight: windowHeight - navigationHeaderBarHeight - 32,//headerWrapHeight
		backgroundColor: mainBGColor,
		alignItems: 'center',
		paddingBottom: 40,
	},
	tileWrap: {
		marginVertical: 12,
	},
});