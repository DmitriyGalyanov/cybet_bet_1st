import {createSlice} from '@reduxjs/toolkit';

import {initialBalance} from '../../constants';
import { createMatches } from '../../helpers';


export const gameSlice = createSlice({
	name: 'gameData',
	initialState: {
		balance: initialBalance,

		matchesDataArray: [],

		currentlySelectedMatch: -1,
		selectedOutcome: {id: -1, name: ''},
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

		changeBalance: (state, action) => {
			state.balance = state.balance + action.payload;
		},

		removeMatch: (state, action) => {
			const selectedMatchIndex = state.matchesDataArray.findIndex(match => {
				return match.matchId === action.payload;
			});
			console.log(selectedMatchIndex, 'gameSlice');
			state.matchesDataArray.splice(selectedMatchIndex, 1); //will it work as expected?
		},
	}
});

export const {
	createMatchesDataAction,
	setCurrentlySelectedMatch,
	setSelectedOutcome,
	changeBalance,
	removeMatch,
} = gameSlice.actions;

export const selectGameData = state => state.gameSlice;

export default gameSlice.reducer;