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
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Providers = ({ children }) => {
	return (
		<WalletConnectProvider
			redirectUrl={Platform.OS === 'web' ? window.location.origin : 'mehdi://connect'}
			storageOptions={{
				asyncStorage: AsyncStorage,
			}}
		>
			<AuthProvider>{children}</AuthProvider>
		</WalletConnectProvider>
	);
};

export default Providers;
