import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CallListItem from './CallListItem';

const Separator = () => <View style={styles.separator} />;

const CallList = ({ calls }) => {
	return (
		<View style={styles.container}>
			<FlatList
				data={calls}
				ItemSeparatorComponent={Separator}
				renderItem={({ item }) => (
					<CallListItem
						avatar={item.avatar}
						walletAddress={item.walletAddress}
						callDuration={item.callDuration}
						missedCall={item.missedCall}
						time={item.time}
					/>
				)}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 15,
	},
	separator: {
		height: 15,
		backgroundColor: 'transparent',
	},
});

export default CallList;
