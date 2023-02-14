import React from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CallTabs from '../../../components/CallTabs';
import CustomSearchBar from '../../../components/CustomSearchBar';
import LogoBar from '../../../components/LogoBar';

const CallScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<LogoBar imageSource={require('../../../assets/sonart_logo.png')}></LogoBar>
			<View style={styles.parent}>
				<CustomSearchBar></CustomSearchBar>
				<CallTabs style={styles.callsTabBar}></CallTabs>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F6F6F6',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	parent: {
		width: '100%',
		paddingLeft: 25,
		paddingRight: 25,
		marginTop: 20,
	},
	text: {
		fontSize: 20,
		color: '#000',
	},
	callsTabBar: {
		marginTop: 20,
	},
});

export default CallScreen;
