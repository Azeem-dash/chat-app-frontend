import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import CustomButton from '../../../components/CustomButton';
import { useAuth } from '../../../context/AuthContext';
import { useWalletConnectContext } from '@walletconnect/react-native-dapp';

const Settings = () => {
	const { logout, walletAddress } = useAuth();
	const { connector } = useWalletConnectContext();
	const disconnectAction = async () => {
		await connector.killSession();
		logout();
	};

	return (
		<SafeAreaView>
			<Text style={styles.title}>Settings</Text>
			<Text style={styles.connectedAs}>
				Connected as <Text>{walletAddress}</Text>
			</Text>
			<Text style={styles.disconnectButton} onPress={disconnectAction}>
				Logout
			</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	title: { fontSize: 20, margin: 16, color: 'black' },
	connectedAs: { textAlign: 'center' },
	disconnectButton: { color: 'red', textAlign: 'center', marginTop: '50%', fontSize: 20 },
});

export default Settings;
