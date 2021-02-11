import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import { accentColor, mainTextColor, predictionsSectionImgHeight, predictionsSectionImgWidth } from '../constants';
import { useNavigation } from '@react-navigation/native';
import MatchTile from './MatchTile';
import { useSelector } from 'react-redux';
import { selectGameData } from '../redux/stateSlices';


PredictionsSection.propTypes = {
	routeName: PropTypes.string.isRequired,
	imgSource: PropTypes.number.isRequired,
	descWord: PropTypes.string.isRequired,
};
/**
 * @param {{routeName: string, imgSource: number, descWord: string}} props
 */
export default function PredictionsSection ({routeName, imgSource, descWord,}) {
	const navigation = useNavigation();
	const handleRoutePress = () => {
		navigation.navigate('PredictionsScreen', {
			routeName: routeName,
			descWord: descWord,
		});
	};

	const matchesData = useSelector(selectGameData).matchesDataArray
		.filter(match => match.belongsTo === routeName);

	return (
		<View style={styles.wrap}>
			<View style={styles.header}>
				<View style={styles.headerLeft}>
					<Image
						source={imgSource}
						width={predictionsSectionImgWidth}
						height={predictionsSectionImgHeight}
						style={{
							width: predictionsSectionImgWidth,
							height: predictionsSectionImgHeight,
							tintColor: '#565656',
						}}
					/>
					<Text style={styles.title}>
						{`Прогнозы на ${descWord}`}
					</Text>
				</View>
				<View style={styles.headerRight}>
					<TouchableOpacity onPress={handleRoutePress}>
						<Text style={styles.routeButtonText}>
							Больше
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={{marginBottom: 14}}
			>
				{matchesData.map(match => {
					const {
						matchId,
						coefficients,
						firstTeamId,
						matchStartDate,
						matchStartTime,
						secondTeamId,
					} = match;

					return (
						<View style={styles.tileWrap} key={matchId}>
							<MatchTile
								matchId={matchId}
								firstTeamId={firstTeamId}
								matchStartDate={matchStartDate}
								matchStartTime={matchStartTime}
								secondTeamId={secondTeamId}
								coefficients={coefficients}
								descWord={descWord}
							/>
						</View>
					)
				})}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	wrap: {},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 8,
		marginBottom: 12,
	},
	headerLeft: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 21,
		fontWeight: 'bold',
		color: mainTextColor,
		marginLeft: 11,
	},
	headerRight: {},
	routeButtonText: {
		color: accentColor,
		fontWeight: 'bold',
		fontSize: 14,
	},
});