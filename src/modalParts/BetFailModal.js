import React from 'react';

import { StyleSheet, View, Text} from 'react-native';
import { TeamImg } from '../components';

import { useSelector } from 'react-redux';
import { selectGameData } from  '../redux/stateSlices';

import {
	masterColor,
	teamImgInModalHeight,
	teamImgInModalWidth,
	bottomNavBarHeight,
} from '../constants';


export default function BetFailModal() {
	const {
		currentlySelectedMatch: matchId,
		matchesDataArray: matchesData,
		selectedOutcome,
	} = useSelector(selectGameData);

	if (matchId === -1) return null;

	const selectedMatchIndex = matchesData.findIndex(match => {
		return match.matchId === matchId;
	});

	const {
		firstTeamId,
		secondTeamId,
	} = matchesData[selectedMatchIndex === -1 ? 0 : selectedMatchIndex];

	return (
		<View style={styles.wrap}>
			<Text style={styles.text}>
				Вы проиграли!
			</Text>
			<View
				style={{
					flexDirection: 'row',
				}}
			>
				<TeamImg
					teamId={selectedOutcome.name === 'firstTeamWin' ? secondTeamId : firstTeamId}
					width={teamImgInModalWidth}
					height={teamImgInModalHeight}
				/>
				{selectedOutcome.name === 'tie' && (
					<TeamImg
						teamId={secondTeamId}
						width={teamImgInModalWidth}
						height={teamImgInModalHeight}
					/>
				)}
			</View>
			<Text style={styles.text}>
				{selectedOutcome.name === 'tie' ? 'Ничья' : 'Победа!'}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		backgroundColor: masterColor,
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingTop: 40,
		paddingBottom: bottomNavBarHeight + 40,
	},

	text: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#F34B4B',
	},
});