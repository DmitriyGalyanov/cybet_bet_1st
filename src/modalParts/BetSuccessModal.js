import React from 'react';

import { StyleSheet, View, Text, Image} from 'react-native';
import { TeamImg } from '../components';

import { useSelector } from 'react-redux';
import { selectGameData } from  '../redux/stateSlices';

import {
	masterColor,
	teamImgInModalHeight,
	teamImgInModalWidth,
	windowHeight,
	windowWidth,
	bottomNavBarHeight,
	confettiWidth,
	confettiHeight,
} from '../constants';
import {confetti} from '../../assets/images';


export default function BetSuccessModal() {
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
			<Text style={[styles.text, styles.headerText]}>
				Вы победили!
			</Text>
			<View
				style={{
					flexDirection: 'row',
				}}
			>
				<TeamImg
					teamId={selectedOutcome.name === 'firstTeamWin' ? firstTeamId : secondTeamId}
					width={teamImgInModalWidth}
					height={teamImgInModalHeight}
				/>
				{selectedOutcome.name === 'tie' && (
					<TeamImg
						teamId={firstTeamId}
						width={teamImgInModalWidth}
						height={teamImgInModalHeight}
					/>
				)}
			</View>
			<Text style={[styles.text, styles.footerText]}>
				{selectedOutcome.name === 'tie' ? 'Ничья' : 'Победа!'}
			</Text>

			<View style={styles.decorWrap}>
				<Image
					source={confetti}
					width={confettiWidth}
					height={confettiHeight}
					style={{
						width: confettiWidth,
						height: confettiHeight,
						transform: [{rotateY: '180 deg'}]
					}}
				/>
				<Image
					source={confetti}
					width={confettiWidth}
					height={confettiHeight}
					style={{
						width: confettiWidth,
						height: confettiHeight,
					}}
				/>
			</View>
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
	},
	headerText: {
		color: '#FFC967',
	},
	footerText: {
		color: '#63D378',
	},

	decorWrap: {
		position: 'absolute',
		width: windowWidth,
		height: windowHeight / 2,
		alignItems: 'center',
		paddingHorizontal: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});