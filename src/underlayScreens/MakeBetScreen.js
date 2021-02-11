import React from 'react';
import PropTypes from 'prop-types';

import {
	StyleSheet,
	View,
	Text,
} from 'react-native';
import {TeamImg, MainButton, RadioButtonsGroup, BackgroundedHeader} from '../components';

import {useDispatch, useSelector} from 'react-redux';
import {changeBalance, selectGameData} from '../redux/stateSlices';
import { betAmount, coloredHeadersTextStyle, mainBGColor, mainColor, secondaryTextStyle, teamImgHeight, teamImgWidth } from '../constants';
import { useNavigation } from '@react-navigation/core';
import { getRandomIntInclusive } from '../helpers';


MakeBetScreen.propTypes = {
	route: PropTypes.shape({
		key: PropTypes.string,
		name: PropTypes.string,
		params: PropTypes.shape({
			matchId: PropTypes.number.isRequired,
		})
	}).isRequired,
};
export default function MakeBetScreen ({route}) {
	const {matchId} = route.params;

	const {matchesDataArray} = useSelector(selectGameData);
	const selectedMatchIndex = matchesDataArray.findIndex(match => {
		return match.matchId === matchId;
	});
	const {
		firstTeamId,
		matchCurrentTime,
		secondTeamId,
		coefficients,
	} = matchesDataArray[selectedMatchIndex];

	const {selectedOutcome} = useSelector(selectGameData);
	const {id: selectedButton} = useSelector(selectGameData).selectedOutcome;
	const estimatedGain = selectedButton !== -1 ? (betAmount * coefficients[selectedButton]?.coefficient).toFixed(0) : null;

	const dispatch = useDispatch();
	const navigation = useNavigation();
	const navigateToBetResultScreen = () => {
		const winningBetId = getRandomIntInclusive(0, coefficients.length - 1);
		let gain = +estimatedGain;
		if (winningBetId === selectedButton) {
			dispatch(changeBalance(gain));
		} else {
			gain = -betAmount;
			dispatch(changeBalance(gain));
		};

		navigation.navigate('BetResultScreen', {
			gain: gain,
			resultId: winningBetId,
		});
	};

	return (
		<View style={styles.wrap}>
			<View style={styles.topPart}>
				<View style={styles.headerWrap}>
					<Text style={[styles.headerText, coloredHeadersTextStyle]}>
						СДЕЛАЙТЕ СВОЙ ВЫБОР
					</Text>
				</View>

				<View style={styles.middlePartWrap}>
					<TeamImg
						teamId={firstTeamId}
						width={teamImgWidth}
						height={teamImgHeight}
					/>
					<View>
						<Text style={[styles.middlePartText, coloredHeadersTextStyle]}>
							ЧАСЫ
						</Text>
						<Text style={[styles.middlePartText, coloredHeadersTextStyle]}>
							{matchCurrentTime}
						</Text>
					</View>
					<TeamImg
						teamId={secondTeamId}
						width={teamImgWidth}
						height={teamImgHeight}
					/>
				</View>
				<View
					style={{
						alignItems: 'center'
					}}
				>
					<Text style={secondaryTextStyle}>
						НИЧЬЯ
					</Text>
				</View>
				<View style={styles.radioButtonsGroupWrap}>
					<RadioButtonsGroup
						buttons={coefficients}
					/>
				</View>
			</View>
			
			<View style={styles.bottomPart}>
				<BackgroundedHeader title='сумма ставки' />
				<Text
					style={{
						fontSize: 42,
						color: mainColor,
						textAlign: 'center',
					}}
				>
					{betAmount}
				</Text>
				{estimatedGain && (
					<>
						<BackgroundedHeader title='прогнозируемый выигрыш' />
						<Text
							style={{
								fontSize: 42,
								color: mainColor,
								textAlign: 'center',
							}}
						>
							{estimatedGain}
						</Text>
					</>
				)}

				<View style={styles.mainButtonWrap}>
					<MainButton
						title='Сделать ставку'
						onPress={navigateToBetResultScreen}
						disabled={selectedOutcome.id === -1}
					/>
				</View>
			</View>
		</View>
	)
}

export const styles = StyleSheet.create({
	wrap: {
		backgroundColor: mainBGColor,
		flex: 1,
		justifyContent: 'space-between',
	},
	topPart: {},

	headerWrap: {
		alignSelf: 'center',
	},
	headerText: {},

	teamInfoWrap: {},

	middlePartWrap: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginVertical: 12,
	},
	currentTimeTextWrap: {
		textAlign: 'center',
	},
	middlePartText: {
		textAlign: 'center',
	},

	radioButtonsGroupWrap: {},

	bottomPart: {},
	mainButtonWrap: {
		marginBottom: 28,
		marginTop: 40,
		alignSelf: 'center'
	},
});