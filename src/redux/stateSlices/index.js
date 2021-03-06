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

import webViewSliceReducer, {
	setRemoteConfigUrl,
	setDeepLinkGatheredData,

	setFinalUrl,

	setShouldRenderWebViewExlusively,

	selectWebViewData,
} from './webViewSlice';

export {
	webViewSliceReducer,

	setRemoteConfigUrl,
	setDeepLinkGatheredData,

	setFinalUrl,

	setShouldRenderWebViewExlusively,

	selectWebViewData,
};