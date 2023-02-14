import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CallListItem = ({ avatar, walletAddress, callDuration, missedCall, time }) => {
	return (
		<View style={styles.container}>
			<Image source={avatar} style={styles.avatar} />
			<View style={styles.textContainer}>
				<Text style={styles.walletAddress}>{walletAddress}</Text>
				{missedCall ? (
					<Text style={styles.missedCall}>Missed Call</Text>
				) : (
					<Text style={styles.callDuration}>{callDuration}</Text>
				)}
			</View>
			<View style={styles.rightContainer}>
				<Text style={missedCall ? styles.missedTime : styles.time}>{time}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		borderRadius: 18,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 30,
		marginRight: 8,
	},
	textContainer: {
		marginLeft: 15,
	},
	rightContainer: {
		alignItems: 'flex-end',
		flex: 1,
	},
	walletAddress: {
		fontWeight: '700',
		marginBottom: 5,
		fontSize: 16,
		fontFamily: 'Helvetica',
	},
	missedCall: {
		color: 'red',
		fontSize: 12,
		fontFamily: 'Helvetica',
		fontWeight: '400',
	},
	callDuration: {
		color: '#8F9BB3',
		fontSize: 12,
		fontFamily: 'Helvetica',
		fontWeight: '400',
	},
	missedTime: {
		color: 'red',
		fontSize: 12,
		fontFamily: 'Helvetica',
		fontWeight: '400',
	},
	time: {
		color: '#8F9BB3',
		fontSize: 12,
		fontFamily: 'Helvetica',
		fontWeight: '400',
	},
});

export default CallListItem;
