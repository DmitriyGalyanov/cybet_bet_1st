import {createSlice} from '@reduxjs/toolkit';


export const modalSlice = createSlice({
	name: 'modalData',
	initialState: {
		modalVisible: false,

		decisionModalVisible: false,
		betSuccessModalVisible: false,
		betFailModalVisible: false,
	},

	reducers: {
		setModalVisible: (state, action) => {
			state.modalVisible = action.payload;
		},

		setDecisionModalVisible: (state, action) => {
			state.decisionModalVisible = action.payload;
		},
		setBetSuccessModalVisible: (state, action) => {
			state.betSuccessModalVisible = action.payload;
		},
		setBetFailModalVisible: (state, action) => {
			state.betFailModalVisible = action.payload;
		},
	}
});

export const {
	setModalVisible,

	setDecisionModalVisible,
	setBetSuccessModalVisible,
	setBetFailModalVisible,
} = modalSlice.actions;

export const selectModalData = state => state.modalSlice;

export default modalSlice.reducer;