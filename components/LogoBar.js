import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LogoBar = ({ imageSource }) => {
	return (
		<View style={styles.container}>
			<Image source={imageSource} style={styles.image} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: '#1F81E1',
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 94,
		height: 26,
		resizeMode: 'contain',
	},
});

export default LogoBar;
