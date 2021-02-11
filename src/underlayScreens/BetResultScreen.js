import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
	StyleSheet,
	View,
	Text,
	BackHandler,
} from 'react-native';
import {TeamImg, MainButton, BackgroundedHeader} from '../components';

import {useDispatch, useSelector} from 'react-redux';
import {removeMatch, selectGameData} from '../redux/stateSlices';
import { coloredHeadersTextStyle, mainBGColor, mainColor, resultsInRuArray, secondaryTextStyle, teamImgHeight, teamImgWidth, windowWidth } from '../constants';
import { useNavigation } from '@react-navigation/core';


BetResultScreen.propTypes = {
	route: PropTypes.shape({
		key: PropTypes.string,
		name: PropTypes.string,
		params: PropTypes.shape({
			gain: PropTypes.number.isRequired,
			resultId: PropTypes.number.isRequired,
		})
	}).isRequired,
};
export default function BetResultScreen ({route}) {
	const {gain, resultId} = route.params;

	const matchId = useSelector(selectGameData).currentlySelectedMatch;
	const {matchesDataArray} = useSelector(selectGameData);
	const selectedMatchIndex = matchesDataArray.findIndex(match => {
		return match.matchId === matchId;
	});
	const {
		firstTeamId,
		matchCurrentTime,
		secondTeamId,
		coefficients,
	// } = useSelector(selectGameData).matchesDataArray[matchId];
	} = matchesDataArray[selectedMatchIndex === -1 ? 0 : selectedMatchIndex];

	const {currentlySelectedMatch} = useSelector(selectGameData);
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const navigateToMatchesListScreen = () => {
		dispatch(removeMatch(currentlySelectedMatch));
		navigation.navigate('MatchesListScreen');
	};

	const result = resultsInRuArray[resultId];

	useEffect(() => { //prevent backing via hardware back button press
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => true,
		);

		return () => backHandler.remove();
	}, []);

	return (
		<View style={styles.wrap}>
			<View style={styles.topPart}>
				<View style={styles.headerWrap}>
					<Text style={[styles.headerText, coloredHeadersTextStyle]}>
						РЕЗУЛЬТАТ
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
							{result}
						</Text>
					</View>
					<TeamImg
						teamId={secondTeamId}
						width={teamImgWidth}
						height={teamImgHeight}
					/>
				</View>
			</View>
			
			<View style={styles.bottomPart}>
				<BackgroundedHeader title='ваш выигрыш' />
				<Text
					style={{
						fontSize: 42,
						color: mainColor,
						textAlign: 'center',
					}}
				>
					{gain > 0 ? `${gain}` : `-${gain * -1}`}
				</Text>
				<View style={styles.mainButtonWrap}>
					<MainButton
						title='Вернуться к списку матчей'
						onPress={navigateToMatchesListScreen}
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
	topPart: {

	},

	headerWrap: {
		alignSelf: 'center',
	},
	headerText: {

	},

	teamInfoWrap: {

	},

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
		flexWrap: 'wrap',
		maxWidth: windowWidth * 0.4,
	},

	radioButtonsGroupWrap: {

	},

	bottomPart: {

	},
	mainButtonWrap: {
		marginBottom: 28,
		marginTop: 40,
		alignSelf: 'center'
	},
});