import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import {MatchTile} from '.';

import { accentColor, mainTextColor, predictionsSectionImgHeight, predictionsSectionImgWidth, windowWidth } from '../constants';

import { useNavigation } from '@react-navigation/native';

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
			imgSource: imgSource,
			descWord: descWord,
		});
	};

	const matchesData = useSelector(selectGameData).matchesDataArray
		.filter(match => match.belongsTo === routeName);

	const {selectedDate} = useSelector(selectGameData);
	const dateFilteredMatchesData = matchesData.filter(match => {
		const {matchStartDate} = match;
		if (selectedDate === 'any') return true;

		const [day, month, year] = matchStartDate.split('.');
		const fullYear = +`20${year}`;
		const matchDate = new Date(fullYear, month - 1, day);

		const todayDateWithTime = new Date();
		const [todayDateYear, todayDateMonth, todayDateDay] = [
			todayDateWithTime.getFullYear(),
			todayDateWithTime.getMonth(),
			todayDateWithTime.getDate(),
		];
		const todayDate = new Date(todayDateYear, todayDateMonth, todayDateDay);

		let checkDate;
		switch (selectedDate) {
			case 'today':
				checkDate = todayDate;
				break;
			case 'tomorrow':
				let tomorrowDate = new Date(todayDate.getTime());
				tomorrowDate.setMilliseconds(todayDate.getMilliseconds() + 86400000);
				checkDate = tomorrowDate;
				break;
			case 'later':
				let laterDate = new Date(todayDate.getTime());
				laterDate.setMilliseconds(todayDate.getMilliseconds() + 86400000 * 2);

				if (matchDate.getTime() >= laterDate.getTime()) return true
				else return false;
			default:
				return true;
		};
		if (matchDate.getTime() === checkDate.getTime()) {
			return true;
		};
	});

	const displayedMatchesData = dateFilteredMatchesData.sort((matchA, matchB) => {
		const [dayA, monthA, yearA] = matchA.matchStartDate.split('.');
		const fullYearA = +`20${yearA}`;
		const matchDateA = new Date(fullYearA, monthA - 1, dayA);

		const [dayB, monthB, yearB] = matchB.matchStartDate.split('.');
		const fullYearB = +`20${yearB}`;
		const matchDateB = new Date(fullYearB, monthB - 1, dayB);

		return (matchDateA.getTime() - matchDateB.getTime());
	});

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
				{dateFilteredMatchesData.map(match => {
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
				{displayedMatchesData.length === 0 && (
					<View style={styles.emptyNote}>
						<Text style={styles.emptyNoteText}>
							К сожалению, прогнозы на выбранный период отсутствуют
						</Text>
					</View>
				)}
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

	emptyNote: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 140,
		width: windowWidth,
		paddingHorizontal: 20,
	},
	emptyNoteText: {
		fontSize: 20,
		textAlign: 'center',
	},
});