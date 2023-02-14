import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ChatBubble = (props) => {
	const { sender, message, time, image } = props;

	return (
		<View style={[sender ? styles.senderContainer : styles.receiverContainer]}>
			{!sender && (
				<Image
					source={require('../assets/person.jpg')}
					style={sender ? styles.senderAvatar : styles.receiverAvatar}
				/>
			)}
			<View>
				
			</View>

			<View style={sender?{alignItems:'flex-end'}:null}>
			
			<View style={{alignItems:"baseline"}}>
				<View style={[sender ? styles.senderBubble : styles.receiverBubble]}>
					{image ? (
						<Image source={{ uri: image }} style={styles.image} />
					) : (
						<Text style={[sender ? styles.senderText : styles.receiverText]}>
							{message}
						</Text>
					)}
				</View>
			</View>
			<View >
				{time && <Text style={styles.time}>{time}</Text>}
			</View>
			</View>


			{sender && (
				<Image
					source={require('../assets/person.jpg')}
					style={sender ? styles.senderAvatar : styles.receiverAvatar}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginVertical: 8,
	},
	receiverContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		margin: 10,
	},
	senderContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		margin: 10,
		justifyContent: 'flex-end',
	},
	receiverAvatar: {
		width: 28,
		height: 28,
		borderRadius: 14,
		marginRight: 8,
		marginTop: 5,
	},
	senderAvatar: {
		width: 28,
		height: 28,
		borderRadius: 14,
		marginLeft: 0,
	},
	senderBubble: {
		marginRight:10,
		backgroundColor: '#1f81e1',
		padding: 10,
		borderRadius: 12,
		maxWidth: '80%',
		justifyContent:"flex-end",
		alignItems:"flex-end",


	},
	receiverBubble: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 12,
		maxWidth: '80%',
	},
	senderText: {
		fontWeight: '400',
		fontFamily: 'Helvetica',
		fontSize: 12,
		color: 'white',
		// minWidth: '10%',
		// padding:0,
		lineHeight: 18,
	},
	receiverText: {
		fontWeight: '400',
		fontFamily: 'Helvetica',
		fontSize: 12,
		color: '#000',
		// minWidth: '50%',
		lineHeight: 18,
	},
	time: {
		color: 'black',
		fontSize: 10,
		padding: 5,
		fontWeight: '400',
		fontFamily: 'Helvetica',
		
	},
	image: {
		width: 240,
		height: 250,
		borderRadius: 12,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});

export default ChatBubble;
