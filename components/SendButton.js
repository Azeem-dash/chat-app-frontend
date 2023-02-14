import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SendButton = (props) => {
	return (
		<TouchableOpacity onPress={props.sendMessage} style={styles.button}>
			<Image source={require('../assets/ico_send.png')} style={styles.icon} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#1F81E1',
		borderRadius: 10,
		padding: 10,
	},
	icon: {
		tintColor: 'white',
		width: 15,
		height: 15,
	},
});

export default SendButton;
