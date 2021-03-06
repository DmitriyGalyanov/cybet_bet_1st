import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

import {
	gameSliceReducer,
	modalSliceReducer,
	webViewSliceReducer,
} from './stateSlices';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};

const rootReducer = combineReducers({
	gameSlice: gameSliceReducer,
	modalSlice: modalSliceReducer,
	webViewSlice: webViewSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
		}
	})
});

export const persistor = persistStore(store);
