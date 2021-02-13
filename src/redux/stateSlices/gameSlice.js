import {createSlice} from '@reduxjs/toolkit';

import {initialBalance} from '../../constants';
import { createMatches } from '../../helpers';


export const gameSlice = createSlice({
	name: 'gameData',
	initialState: {
		balance: initialBalance,

		matchesDataArray: [],

		matchHistoryDataArray: [],

		currentlySelectedMatch: -1,

		selectedOutcome: {id: -1, name: ''},
		winningOutcomeId: -1,

		selectedDate: 'any', // 'any' | 'today' | 'tomorrow' | 'later'
	},

	reducers: {
		createMatchesDataAction: (state) => {
			state.matchesDataArray = createMatches();
		},

		setCurrentlySelectedMatch: (state, action) => {
			state.currentlySelectedMatch = action.payload;
		},

		setSelectedOutcome: (state, action) => {
			state.selectedOutcome = action.payload;
		},
		setWinningOutcomeId: (state, action) => {
			state.winningOutcomeId = action.payload;
		},

		changeBalance: (state, action) => {
			state.balance = state.balance + action.payload;
		},

		moveMatchToHistory: (state, action) => {
			const {matchId, selectedOutcome, winningOutcomeId} = action.payload;

			const selectedMatchIndex = state.matchesDataArray.findIndex(match => {
				return match.matchId === matchId;
			});

			let movableMatch = state.matchesDataArray.splice(selectedMatchIndex, 1);
			movableMatch[0].selectedOutcome = selectedOutcome.id;
			movableMatch[0].winningOutcomeId = winningOutcomeId;

			let updatedMatchHistoryDataArray = [...state.matchHistoryDataArray];
			updatedMatchHistoryDataArray.push(movableMatch[0]);

			state.matchHistoryDataArray = updatedMatchHistoryDataArray;
		},

		setSelectedDate: (state, action) => {
			state.selectedDate = action.payload;
		},
	}
});

export const {
	createMatchesDataAction,

	setCurrentlySelectedMatch,

	setSelectedOutcome,
	setWinningOutcomeId,

	changeBalance,

	moveMatchToHistory,

	setSelectedDate,
} = gameSlice.actions;

export const selectGameData = state => state.gameSlice;

export default gameSlice.reducer;