import React from 'react';
import PropTypes from 'prop-types';

import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
} from 'react-native';
import TeamImg from './TeamImg';

import {
	matchTileBGColor,
	teamImgInTileHeight,
	teamImgInTileWidth,
	grayedTextColor,
	mainTextColor,
	masterColor,
	accentColor,
	matchTileMaxWidth,
} from '../constants';

import { useDispatch } from 'react-redux';
import { setCurrentlySelectedMatch, setDecisionModalVisible, setModalVisible } from '../redux/stateSlices';


MatchTile.propTypes = {
	matchId: PropTypes.number.isRequired,
	firstTeamId: PropTypes.number.isRequired,
	matchStartDate: PropTypes.string.isRequired,
	matchStartTime: PropTypes.string.isRequired,
	secondTeamId: PropTypes.number.isRequired,
	coefficients: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		outcomeName: PropTypes.string,
		coefficient: PropTypes.number,
	})).isRequired,
	discipline: PropTypes.string.isRequired,
	isHistory: PropTypes.bool,
	selectedOutcome: PropTypes.number,
	winningOutcomeId: PropTypes.number,
};
/**
 * @param {{
 * matchId: number,
 * firstTeamId: number,
 * matchStartDate: string,
 * matchStartTime: string,
 * secondTeamId: number,
 * coefficients: [...{
 * 	id: number,
 * 	outcomeName: string,
 * 	coefficient: number
 * }],
 * discipline: string,
 * isHistory: ?boolean,
 * selectedOutcome: ?number,
 * winningOutcomeId: ?number,
 * }} props
 */
export default function MatchTile({
	matchId,
	firstTeamId,
	matchStartDate,
	matchStartTime,
	secondTeamId,
	coefficients,
	discipline,
	isHistory,
	selectedOutcome,
	winningOutcomeId,
}) {
	const dispatch = useDispatch();

	const callModal = () => {
		if (isHistory) return;
		dispatch(setCurrentlySelectedMatch(matchId));
		dispatch(setModalVisible(true));
		dispatch(setDecisionModalVisible(true));
	};

	return (
		<TouchableOpacity onPress={callModal}
			style={{
				backgroundColor: matchTileBGColor,
				elevation: 3,
				margin: 3,
				borderRadius: 10,
				alignItems: 'center',
			}}
		>
			<View style={styles.decor} />
			<View style={styles.wrap}>
				<View style={styles.topPart}>
					<TeamImg
						teamId={firstTeamId}
						width={teamImgInTileWidth}
						height={teamImgInTileHeight}
					/>
					<View style={styles.date}>
						<Text style={styles.dateText}>
							{matchStartDate}
						</Text>
					</View>
					<TeamImg
						teamId={secondTeamId}
						width={teamImgInTileWidth}
						height={teamImgInTileHeight}
					/>
				</View>

				<View style={styles.coefficientsWrap}>
					{coefficients.map(coef => {
						const {id, outcomeName, coefficient} = coef;
						let bgColor = '#3A4453';
						if (id === winningOutcomeId) {
							bgColor = 'green';
						}
						if (selectedOutcome === id && id !== winningOutcomeId) {
							console.log('red')
							bgColor = 'red';
						};
						
						return (
							<View outcomeId key={id}
								style={[
									styles.coef,
									{
										backgroundColor: bgColor,
									}
								]}
							>
								<Text style={styles.coefText}>
									{coefficient}
								</Text>
							</View>
						)
					})}
				</View>

				<View style={styles.footer}>
					<Text style={styles.footerText}>
						{discipline}
					</Text>
					<Text style={styles.footerText}>
						{matchStartTime}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	decor: {
		position: 'absolute',
		top: -1,
		height: 4,
		backgroundColor: accentColor,
		width: 150,
		borderRadius: 4,
	},

	wrap: {
		borderRadius: 14,
		paddingTop: 6,
		paddingHorizontal: 8,
		paddingBottom: 4,
		maxWidth: matchTileMaxWidth,
	},

	topPart: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	date: {
		paddingTop: 8,
		fontWeight: 'bold',
	},
	dateText: {
		color: mainTextColor,
	},

	coefficientsWrap: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	coef: {
		backgroundColor: '#3A4453',
		paddingVertical: 3,
		paddingHorizontal: 6,
		borderRadius: 3,
		minWidth: 45,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 4,
	},
	coefText: {
		color: masterColor,
		fontWeight: 'bold',
	},

	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 8,
		marginTop: 12,
	},
	footerText: {
		color: grayedTextColor,
		textTransform: 'capitalize',
	},
});