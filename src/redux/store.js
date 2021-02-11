import { configureStore } from '@reduxjs/toolkit';

import {gameSliceReducer} from './stateSlices';
import {modalSliceReducer} from './stateSlices';

export default configureStore({
	reducer: {
		gameSlice: gameSliceReducer,
		modalSlice: modalSliceReducer,
	},
});