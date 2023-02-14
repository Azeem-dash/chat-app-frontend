import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MaterialTabs from 'react-native-material-tabs';
import CallList from './CallList';
import { Icon } from 'react-native-vector-icons';

const calls = [
	{
		id: '1',
		avatar: require('../assets/avatar_receiver.png'),
		walletAddress: '0x123456789',
		callDuration: '1h 23m',
		missedCall: false,
		time: '9:30 AM',
	},
	{
		id: '2',
		avatar: require('../assets/avatar_receiver.png'),
		walletAddress: '0x987654321',
		callDuration: '3m',
		missedCall: false,
		time: '2:00 PM',
	},
	{
		id: '3',
		avatar: require('../assets/avatar_receiver.png'),
		walletAddress: '0xabcdefghi',
		missedCall: true,
		time: '5:15 PM',
	},
];

const CallTabs = () => {
	const [selectedTab, setSelectedTab] = useState(0);

	const handleTabChange = (tab) => {
		setSelectedTab(tab);
	};

	return (
		<View>
			<MaterialTabs
				items={['All', 'Missed']}
				selectedIndex={selectedTab}
				onChange={handleTabChange}
				barColor="transparent"
				indicatorColor="#1F81E1"
				activeTextColor="#1F81E1"
				inactiveTextColor="#c1d8f2"
			/>
			{selectedTab === 0 && <CallList calls={calls}></CallList>}
			{selectedTab === 1 && <MissedCallsTab />}
		</View>

		
	);
};

const MissedCallsTab = () => {
	return (
		<View>
			<Text>Missed Calls UI Coming soon</Text>
		</View>
	);
};

const RequestTab = () => {
	return (
		<View>
			<Text>Requests UI coming soon</Text>
		</View>
	);
};

export default CallTabs;
