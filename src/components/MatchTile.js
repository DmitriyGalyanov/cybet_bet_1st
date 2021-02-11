import React from 'react';
import PropTypes from 'prop-types';

import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
} from 'react-native';
import TeamImg from './TeamImg';
import { matchTileTextStyle, matchTileBGColor, matchTileWidth, teamImgInTileHeight, teamImgInTileWidth } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCurrentlySelectedMatch } from '../redux/stateSlices';


MatchTile.propTypes = {
	matchId: PropTypes.number.isRequired,
	firstTeamId: PropTypes.number.isRequired,
	matchCurrentTime: PropTypes.string.isRequired,
	secondTeamId: PropTypes.number.isRequired,
	coefficients: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		outcomeName: PropTypes.string,
		coefficient: PropTypes.number,
	})).isRequired,
};
/**
 * 
 * @param {{matchId: number, firstTeamId: number, matchCurrentTime: string, secondTeamId: number, coefficients: [...{id: number, outcomeName: string, coefficient: number}]}} props
 */
export default function MatchTile({
	matchId,
	firstTeamId,
	matchCurrentTime,
	secondTeamId,
	coefficients,
}) {
	const dispatch = useDispatch();

	const navigation = useNavigation();
	const navigateToMakeBetScreen = () => {
		dispatch(setCurrentlySelectedMatch(matchId));
		navigation.navigate('MakeBetScreen', {
			matchId: matchId,
		});
	};

	return (
		<TouchableOpacity onPress={navigateToMakeBetScreen}>
			<View style={styles.wrap}>
				<View style={styles.teamInfoWrap}>
					<TeamImg
						teamId={firstTeamId}
						width={teamImgInTileWidth}
						height={teamImgInTileHeight}
						rounded
					/>
					<Text style={styles.coefficientText}>
						{coefficients[0].coefficient}
					</Text>
				</View>

				<View style={styles.middlePartWrap}>
					<View style={styles.middlePartTopPartWrap}>
						<Text style={[matchTileTextStyle, styles.middlePartText]}>
							ВРЕМЯ
						</Text>
						<Text style={[matchTileTextStyle, styles.middlePartText]}>
							{matchCurrentTime}
						</Text>
					</View>
					<View style={styles.middlePartBottomPartWrap}>
						<Text style={[matchTileTextStyle, styles.middlePartText]}>
							НИЧЬЯ
						</Text>
						<Text style={[matchTileTextStyle, styles.middlePartText]}>
						{coefficients[1].coefficient}
						</Text>
					</View>
				</View>

				<View style={styles.teamInfoWrap}>
					<TeamImg
						teamId={secondTeamId}
						width={teamImgInTileWidth}
						height={teamImgInTileHeight}
						rounded
					/>
					<Text style={styles.coefficientText}>
					{coefficients[2].coefficient}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	wrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: matchTileWidth,
		backgroundColor: matchTileBGColor,
		borderRadius: 14,
		paddingTop: 14,
		paddingHorizontal: 12,
		paddingBottom: 4,
	},

	teamInfoWrap: {
		alignItems: 'center',
	},
	coefficientText: matchTileTextStyle,
	
	middlePartWrap: {
		justifyContent: 'space-between',
	},
	middlePartTopPartWrap: {},
	middlePartBottomPartWrap: {},
	middlePartText: {
		textAlign: 'center',
	},
});