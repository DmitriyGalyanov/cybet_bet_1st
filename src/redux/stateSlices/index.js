import gameSliceReducer, {
	createMatchesDataAction,

	setCurrentlySelectedMatch,

	setSelectedOutcome,

	changeBalance,

	removeMatch,

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
	
	changeBalance,

	removeMatch,

	setSelectedDate,

	selectGameData,

	modalSliceReducer,

	setModalVisible,

	setDecisionModalVisible,
	setBetSuccessModalVisible,
	setBetFailModalVisible,

	selectModalData,
};