import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MessagesScreen from '../pages/main/messages/MessagesScreen';
import ChatScreen from '../pages/main/messages/ChatScreen';
import Main from '../pages/main';

const Stack = createNativeStackNavigator();

const AppStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Main" component={Main} />
			<Stack.Screen name="Messages" component={MessagesScreen} />
			<Stack.Screen name="Chat" component={ChatScreen} />
		</Stack.Navigator>
	);
};

export default AppStack;
