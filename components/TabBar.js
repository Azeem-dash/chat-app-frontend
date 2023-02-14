import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MaterialTabs from 'react-native-material-tabs';
import ChatList from './ChatList';

const TabBar = () => {
	const [selectedTab, setSelectedTab] = useState(0);

	const handleTabChange = (tab) => {
		setSelectedTab(tab);
	};

	return (
		<View style={{flex:1}}>
			<MaterialTabs
				items={['All', 'Groups', 'Request']}
				selectedIndex={selectedTab}
				onChange={handleTabChange}
				barColor="transparent"
				indicatorColor="#1F81E1"
				activeTextColor="#1F81E1"
				inactiveTextColor="#c1d8f2"
			/>
			{selectedTab === 0 && <ChatList></ChatList>}
			{selectedTab === 1 && <GroupsTab />}
			{selectedTab === 2 && <RequestTab />}
		</View>
	);
};

const GroupsTab = () => {
	return (
		<View>
			<Text>Groups UI Coming soon</Text>
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

export default TabBar;
