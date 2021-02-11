/**
 * @param {number} min
 * @param {number} max
 * @returns random Int lesser or equal to MAX and greater or equal to MIN
 */
export const getRandomIntInclusive = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

import {Animated, Easing} from 'react-native';

/**
 * @param {React.MutableRefObject<Animated.Value>} animatableValue
 * @param {number} toValue
 * @param {number} animDuration in milliseconds
 */
export const animateValue = (animatableValue, toValue, animDuration) => {
	Animated.timing(animatableValue.current, {
		toValue: toValue,
		duration: animDuration,
		useNativeDriver: false,
	}).start();
};

/**
 * @param {React.MutableRefObject<Animated.Value>} animatableValue
 * @param {number} toValue
 * @param {number} animDuration in milliseconds
 */
export const easingAnimateValue = (animatableValue, toValue, animDuration) => {
	Animated.timing(animatableValue.current, {
		toValue: toValue,
		duration: animDuration,
		useNativeDriver: true,
		easing: Easing.out(Easing.quad),
	}).start();
};

/**
 * @param {number} month
 * @param {number} year
 */
const daysInMonth = (month, year) => {
	return new Date(year, month, 0).getDate();
};

import { initialMatchesAmount } from "./constants";
import {teamsAmount} from '../assets/images';

/**
 * function is clunky since it was made for single discipline matches creation
 * @returns array filled with matches data (objects) needed to create a PlayField
 */
export const createMatches = () => {
	let matchesArray = [];

	for (let i = 0; i < initialMatchesAmount; i++) {
		let firstTeamId = getRandomIntInclusive(0, teamsAmount - 1);
		let secondTeamId = getRandomIntInclusive(0, teamsAmount - 1);

		while (secondTeamId === firstTeamId) {
			secondTeamId = getRandomIntInclusive(0, teamsAmount - 1);
		};

		let matchMinutes = getRandomIntInclusive(0, 89);
		if (matchMinutes < 10) matchMinutes = `0${matchMinutes}`;
		let matchSeconds = getRandomIntInclusive(0, 59);
		if (matchSeconds < 10) matchSeconds = `0${matchSeconds}`;
		const matchTimeString = `${matchMinutes}:${matchSeconds}`;

		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth();
		const currentDay = currentDate.getDate();
		const currentHour = currentDate.getHours();
		const currentMinute = currentDate.getMinutes();

		const daysInCurrentMonth = daysInMonth(currentMonth + 1, currentYear);

		let matchMonth = (currentMonth + 1 < 10) ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
		let matchDay = getRandomIntInclusive(currentDay, daysInCurrentMonth);
		if (currentHour > 22) matchDay = getRandomIntInclusive(currentDay + 1, daysInCurrentMonth);
		if (currentDay === daysInCurrentMonth) {
			matchDay = getRandomIntInclusive(1, 10);
			matchMonth = ((currentDate.getMonth() + 1) + 1 < 10)
				? `0${currentDate.getMonth() + 2}`
				: `${currentDate.getMonth() + 2}`;
		};

		let matchHour = matchDay === currentDay ?
			getRandomIntInclusive(currentHour, 23) : getRandomIntInclusive(0, 23);
		if (matchHour < 10) matchHour = `0${matchHour}`;
		let matchMinute = matchDay === currentDay ?
			getRandomIntInclusive(currentMinute, 59) : getRandomIntInclusive(0, 59);
		matchMinute = Math.round(matchMinute / 5) * 5;
		if (matchMinute < 10) matchMinute = `0${matchMinute}`
		else if (matchMinute === 60) matchMinute = 55;

		const matchStartDate = `${matchDay}.${matchMonth}.${currentYear.toString().substring(2)}`;
		const matchStartTime = `${matchHour}:${matchMinute}`;

		const coefficients = [
			{
				id: 0,
				outcomeName: 'firstTeamWin',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
			},
			{
				id: 1,
				outcomeName: 'tie',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
			},
			{
				id: 2,
				outcomeName: 'secondTeamWin',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
			},
		];

		const match = {
			matchId: i,
			firstTeamId: firstTeamId,
			matchCurrentTime: matchTimeString, ///
			matchStartDate: matchStartDate,
			matchStartTime: matchStartTime,
			secondTeamId: secondTeamId,
			coefficients: coefficients,
			belongsTo: 'footballPredictionsScreen',
		};
		matchesArray.push(match);
	};

	return matchesArray;
};
