import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, ScrollView, View } from 'react-native';
import { MatchTile } from '../components';
import { windowWidth } from '../constants';
import { useSelector } from 'react-redux';
import { selectGameData } from '../redux/stateSlices';


PredictionsScreen.propTypes = {
	route: PropTypes.shape({
		key: PropTypes.string,
		name: PropTypes.string,
		params: PropTypes.shape({
			routeName: PropTypes.string.isRequired,
			descWord: PropTypes.string.isRequired,
		})
	}).isRequired,
};
export default function PredictionsScreen ({route}) {
	const {routeName, descWord} = route.params;

	const matchesData = useSelector(selectGameData).matchesDataArray
		.filter(match => match.belongsTo === routeName);

	const displayedMatchesData = matchesData.sort((matchA, matchB) => {
		const [dayA, monthA, yearA] = matchA.matchStartDate.split('.');
		const fullYearA = +`20${yearA}`;
		const matchDateA = new Date(fullYearA, monthA - 1, dayA);

		const [dayB, monthB, yearB] = matchB.matchStartDate.split('.');
		const fullYearB = +`20${yearB}`;
		const matchDateB = new Date(fullYearB, monthB - 1, dayB);

		return (matchDateA.getTime() - matchDateB.getTime());
	});

	return (
		<ScrollView
			contentContainerStyle={{
				flexDirection: 'row',
				flexWrap: 'wrap',
				maxWidth: windowWidth,
			}}
		>
			{displayedMatchesData.map(match => {
				const {
					matchId,
					coefficients,
					firstTeamId,
					matchStartDate,
					matchStartTime,
					secondTeamId,
					// belongsTo,//
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
	)
}

const styles = StyleSheet.create({

	tileWrap: {},
});