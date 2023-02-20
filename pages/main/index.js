import React from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MessagesScreen from "./messages/MessagesScreen";
import CallScreen from "./calls";
import SettingsScreen from "./settings";

import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";

const MainNavigator = createBottomTabNavigator();

const MainTabs = () => (
  <MainNavigator.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#1F81E1",
      tabBarInactiveTintColor: "#000",
    }}
    initialRouteName="Messages"
  >
    <MainNavigator.Screen
      name="Call"
      component={CallScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Ionicons name="ios-call-outline" size={size} color={color} />,
      }}
    />
    <MainNavigator.Screen
      name="Messages"
      component={MessagesScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Octicons name="comment-discussion" size={size} color={color} />,
      }}
    />
    <MainNavigator.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Ionicons name="ios-settings-outline" size={size} color={color} />,
      }}
    />
  </MainNavigator.Navigator>
);

export default MainTabs;
