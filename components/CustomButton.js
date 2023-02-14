import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
			<View style={styles.button}>
				<Text style={styles.buttonText}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		backgroundColor: '#1F81E1',
		paddingVertical: 10,
		borderRadius: 12,
		width: '60%',
		marginBottom: '20%',
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20,
		fontFamily: 'Helvetica',
		alignSelf: 'center',
	},
});

export default CustomButton;
