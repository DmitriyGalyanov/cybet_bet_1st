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


import { initialMatchesAmount } from "./constants";
import {teamsAmount} from '../assets/images';

/**
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
			matchCurrentTime: matchTimeString,
			secondTeamId: secondTeamId,
			coefficients: coefficients,
		};
		matchesArray.push(match);
	};

	return matchesArray
};
