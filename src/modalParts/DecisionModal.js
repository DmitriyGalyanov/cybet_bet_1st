import React from 'react';

import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { TeamImg} from '../components';

import { useDispatch, useSelector } from 'react-redux';
import {
	selectGameData,
	setBetFailModalVisible,
	setBetSuccessModalVisible,
	setDecisionModalVisible,
	setSelectedOutcome,
	setWinningOutcomeId,
} from '../redux/stateSlices';

import {
	mainTextColor,
	masterColor,
	teamImgInModalHeight,
	teamImgInModalWidth,
	windowHeight,
	windowWidth,
} from '../constants';
import { getRandomIntInclusive } from '../helpers';


export default function DecisionModal() {
	const dispatch = useDispatch();

	const {
		currentlySelectedMatch: matchId,
		matchesDataArray: matchesData,
	} = useSelector(selectGameData);

	if (matchId === -1) return null;

	const selectedMatchIndex = matchesData.findIndex(match => {
		return match.matchId === matchId;
	});

	const {
		firstTeamId,
		secondTeamId,
		coefficients,
	} = matchesData[selectedMatchIndex === -1 ? 0 : selectedMatchIndex];

	const handleButtonPress = (id, outcomeName) => {
		dispatch(setSelectedOutcome({id: id, name: outcomeName}));

		const winningOutcomeId = getRandomIntInclusive(0, coefficients.length - 1);
		dispatch(setWinningOutcomeId(winningOutcomeId));
		dispatch(setDecisionModalVisible(false));

		if (winningOutcomeId === id) {
			dispatch(setBetSuccessModalVisible(true));
		} else {
			dispatch(setBetFailModalVisible(true));
		};
	};

	return (
		<View style={styles.wrap}>
			<View style={styles.topPart}>
				<View style={styles.team}>
					<TeamImg
						teamId={firstTeamId}
						width={teamImgInModalWidth}
						height={teamImgInModalHeight}
					/>
					<TouchableOpacity
						onPress={() => handleButtonPress(0, 'firstTeamWin')}
						style={[styles.button, styles.winButton]}
					>
						<Text style={styles.text}>
							Победа
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.divider}/>

				<View style={styles.team}>
					<TeamImg
						teamId={secondTeamId}
						width={teamImgInModalWidth}
						height={teamImgInModalHeight}
					/>
					<TouchableOpacity
						onPress={() => handleButtonPress(2, 'secondTeamWin')}
						style={[styles.button, styles.winButton]}
					>
						<Text style={styles.text}>
							Победа
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.bottomPart}>
				<TouchableOpacity
					onPress={() => handleButtonPress(1, 'tie')}
					style={[styles.button, styles.tieButton]}
				>
					<Text style={styles.text}>
						Ничья
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		backgroundColor: masterColor,
		paddingVertical: 12,
	},

	topPart: {
		flexDirection: 'row',
		height: (windowHeight / 2) * 0.55,

	},
	team: {
		justifyContent: 'space-around',
		width: windowWidth / 2 - 0.5,
		alignItems: 'center',
	},
	divider: {
		width: 1,
		flex: 1,
		backgroundColor: mainTextColor,
	},

	button: {
		paddingVertical: 4,
		paddingHorizontal: 18,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 12,
		elevation: 6,
		minWidth: 140,
	},
	winButton: {
		backgroundColor: '#63D378',
	},
	tieButton: {
		backgroundColor: '#F34B4B',
		alignSelf: 'center',
		marginTop: 24,
	},
	text: {
		fontSize: 24,
		color: masterColor,
		fontWeight: 'bold',
	},
});