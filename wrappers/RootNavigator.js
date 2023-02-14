/* eslint-disable prettier/prettier */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RNBootSplash from 'react-native-bootsplash';
import SplashScreen from 'react-native-splash-screen';
import { Platform } from 'react-native';

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import AuthProvider, { useAuth } from '../context/AuthContext';

const RootNavigator = () => {
	const { userToken,walletAddress } = useAuth();


	return (
		<NavigationContainer
			onReady={async () => {
				if (Platform.OS === 'ios') {
					setTimeout(async () => {
						await RNBootSplash.hide({ fade: true, duration: 250 });
					}, 500);
				} else {
					setTimeout(() => {
						SplashScreen.hide();
					}, 1000);
				}
			}}
		>
			{userToken ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default RootNavigator;
