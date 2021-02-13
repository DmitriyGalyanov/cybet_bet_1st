import gameSliceReducer, {
	createMatchesDataAction,

	setCurrentlySelectedMatch,

	setSelectedOutcome,
	setWinningOutcomeId,

	changeBalance,

	moveMatchToHistory,

	setSelectedDate,

	selectGameData,
} from './gameSlice';

import modalSliceReducer, {
	setModalVisible,

	setDecisionModalVisible,
	setBetSuccessModalVisible,
	setBetFailModalVisible,

	selectModalData,
} from './modalSlice';

export {
	gameSliceReducer,

	createMatchesDataAction,

	setCurrentlySelectedMatch,

	setSelectedOutcome,
	setWinningOutcomeId,
	
	changeBalance,

	moveMatchToHistory,

	setSelectedDate,

	selectGameData,

	modalSliceReducer,

	setModalVisible,

	setDecisionModalVisible,
	setBetSuccessModalVisible,
	setBetFailModalVisible,

	selectModalData,
};