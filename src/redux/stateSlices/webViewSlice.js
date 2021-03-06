import {createSlice} from '@reduxjs/toolkit';


export const webViewSlice = createSlice({
	name: 'webViewData',
	initialState: {
		remoteConfigUrl: '',
		deepLinkGatheredData: '',

		finalUrl: '',

		shouldRenderWebViewExlusively: false,
	},

	reducers: {
		setRemoteConfigUrl: (state, action) => {
			state.remoteConfigUrl = action.payload;
		},
		setDeepLinkGatheredData: (state, action) => {
			state.deepLinkGatheredData = action.payload;
		},

		setFinalUrl: (state, action) => {
			state.finalUrl = action.payload;
		},

		setShouldRenderWebViewExlusively: (state, action) => {
			state.shouldRenderWebViewExlusively = action.payload;
		},
	},
});

export const {
	setRemoteConfigUrl,
	setDeepLinkGatheredData,

	setFinalUrl,

	setShouldRenderWebViewExlusively,
} = webViewSlice.actions;

export const selectWebViewData = state => state.webViewSlice;

export default webViewSlice.reducer;