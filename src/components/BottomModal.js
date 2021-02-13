import React from 'react';

import { TouchableOpacity, StyleSheet, View, Modal } from 'react-native';
import { BetFailModal, BetSuccessModal, DecisionModal } from '../modalParts';

import { useDispatch, useSelector } from 'react-redux';
import {
	moveMatchToHistory,
	selectModalData,
	selectGameData,
	setBetFailModalVisible,
	setBetSuccessModalVisible,
	setDecisionModalVisible,
	setModalVisible,
} from '../redux/stateSlices';

import {
	windowHeight,
	windowWidth,
} from '../constants';


export default function BottomModal() {
	const dispatch = useDispatch();

	const {
		modalVisible,
		decisionModalVisible,
		betSuccessModalVisible,
		betFailModalVisible,
	} = useSelector(selectModalData);

	const {currentlySelectedMatch, selectedOutcome, winningOutcomeId} = useSelector(selectGameData);

	const hideModal = () => {
		dispatch(setModalVisible(false));
		dispatch(setDecisionModalVisible(false));
		dispatch(setBetSuccessModalVisible(false));
		dispatch(setBetFailModalVisible(false));

		if (selectedOutcome.id !== -1) {
			dispatch(moveMatchToHistory({
				matchId: currentlySelectedMatch,
				selectedOutcome: selectedOutcome,
				winningOutcomeId: winningOutcomeId,
			}));
		};
	};

	return (
		<View style={styles.wrap}>
			<Modal
				animationType='slide'
				transparent
				visible={modalVisible}
				onRequestClose={hideModal}
			>
				<TouchableOpacity
					onPress={hideModal}
					style={[
						styles.closeButton,
						{
							position: 'absolute',
							zIndex: 100,
							width: 40,
							height: 14,
							backgroundColor: 'white',
							top: (windowHeight - 28) / 2,
							left: (windowWidth - 40) / 2,
							justifyContent: 'center',
							borderRadius: 4,
							flexDirection: 'row',
							borderBottomEndRadius: 0,
							borderBottomStartRadius: 0,
						}
					]}
				>
					<View
						style={{
							width: 2, height: 16,
							backgroundColor: '#5A5A5A',
							transform: [{rotate: '55deg'}],
							position: 'absolute',
							right: 13,
						}}
					/>
					<View
						style={{
							width: 2, height: 16,
							backgroundColor: '#5A5A5A',
							transform: [{rotate: '125deg'}],
							position: 'absolute',
							left: 13,
						}}
					/>
				</TouchableOpacity>
				<View style={styles.modalInside}>
					{decisionModalVisible && (
						<DecisionModal />
					)}
					{betSuccessModalVisible && (
						<BetSuccessModal />
					)}
					{betFailModalVisible && (
						<BetFailModal />
					)}
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	modalInside: {
		height: windowHeight,
		backgroundColor: 'green',
		paddingTop: windowHeight / 2,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},

	closeButton: {elevation: 1},
});