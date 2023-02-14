import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

const CustomSearchBar = () => {
	return (
		<View style={styles.container}>
			<TextInput style={styles.input} placeholder="Search" placeholderTextColor="#1F81E1" />
			<Image source={require('../assets/ico_search.png')} style={styles.icon} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width:"90%",
		backgroundColor: 'white',
		borderRadius: 20,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		height: 48,
	},
	input: {
		flex: 1,
		fontSize: 14,
	},
	icon: {
		width: 22,
		height: 22,
	},
});

export default CustomSearchBar;
