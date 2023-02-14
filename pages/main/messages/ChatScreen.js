import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, SafeAreaView, TextInput, ScrollView } from 'react-native';
import AppBar from '../../../components/AppBar';
import ChatBubble from '../../../components/ChatBubble';
import SendButton from '../../../components/SendButton';
import AuthProvider, { useAuth } from '../../../context/AuthContext';


const ChatScreen = (props) => {
	const scrollViewRef = useRef(null);
	const { userToken, walletAddress, messageItem, chats, setChats } = useAuth();
	const [text, setText] = useState(props?.route?.params?.text??'')
	const [to,setTo] = useState(props?.route?.params?.to?.toLowerCase())
	const [messages,setMessages] = useState('')


	useEffect(()=>{
		setTo(props?.route?.params?.to?.toLowerCase())
	},[to])


	useEffect(() => {
            scrollViewRef?.current?.scrollToEnd({animated: true});
    }, [chats]);

	const api = axios.create({
		baseURL: 'https://chat-api.sonart.tools',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		},
	});

	const handleSendMessage = async()=>{
		let body = {}
		body.to = to
		body.text = text
			try{
				const response = await api.post(`/messages/create`, body);
				let tmpChats = [...chats];
				let chatIndex = tmpChats.findIndex((c)=>c.name.toLowerCase() == to.toLowerCase())
				let currentDate = new Date();
				let tmpObj = {
					from_user:walletAddress,
					to_user:to.toLowerCase(),
					message_text:text,
					_createdAt:currentDate.toISOString()
				}
				tmpChats[chatIndex].message = text
				tmpChats[chatIndex].messages = [...tmpChats[chatIndex].messages,tmpObj]
				tmpChats[chatIndex].time = currentDate.toISOString()
				setChats(tmpChats)
				setText('')
			}catch(e){
				console.log("call error", e)
			}

		
	}


	const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    };


	


	return (
		<SafeAreaView style={styles.container}>

			<AppBar data={chats?.find((chat)=>chat?.name?.toLowerCase() == to?.toLowerCase())}></AppBar>
			<ScrollView ref={scrollViewRef}>
				<View style={{ marginBottom: 50 }}>

					{chats?.find((chat)=>chat?.name?.toLowerCase() == to?.toLowerCase())?.messages?.map((message, index)=>{
					return (
					<ChatBubble key={index} sender={message?.from_user == walletAddress? true:false} message={message?.message_text} time={message?._createdAt?formatDate(message?._createdAt):null} />
					)
					})}
					
				
				</View>
			</ScrollView>
			<View style={styles.chatBoxcontainer}>
				<TextInput
					style={styles.input}
					placeholder="Type here"
					placeholderTextColor="#C4C4C4"
					onChangeText={(value)=>setText(value)}
					value={text}
				/>
				<View style={styles.iconContainer}>
					<Image source={require('../../../assets/ico_attach.png')} style={styles.icon} />
					<Image source={require('../../../assets/ico_media.png')} style={styles.icon} />
					<Image source={require('../../../assets/ico_voice.png')} style={styles.icon} />
				</View>
				
				<SendButton sendMessage={handleSendMessage}></SendButton>
			</View>
		</SafeAreaView>
	);
};

const styles = {
	container: {
		flex: 1,
		backgroundColor: '#F6F6F6',
	},
	receiverContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		margin: 10,
	},
	receiverAvatar: {
		width: 28,
		height: 28,
		borderRadius: 14,
		marginRight: 8,
		marginTop: 5,
	},
	receiverBubble: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 12,
		maxWidth: '80%',
	},
	receiverText: {
		fontWeight: '400',
		fontFamily: 'Helvetica',
		fontSize: 12,
		color: '#000',
		minWidth: '50%',
		lineHeight: 18,
	},
	senderContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		margin: 10,
		justifyContent: 'flex-end',
	},
	senderBubble: {
		backgroundColor: '#1f81e1',
		padding: 10,
		borderRadius: 12,
		maxWidth: '70%',
	},
	senderAvatar: {
		width: 28,
		height: 28,
		borderRadius: 14,
		marginLeft: 8,
	},
	image: {
		width: 240,
		height: 250,
		borderRadius: 12,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	senderText: {
		fontWeight: '400',
		fontFamily: 'Helvetica',
		fontSize: 12,
		color: 'white',
		minWidth: '50%',
		lineHeight: 18,
	},
	chatBoxcontainer: {
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		// marginBottom: 20,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 60,
	},
	input: {
		flex: 1,
		height: 40,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#E2E2E2',
		paddingHorizontal: 20,
		fontSize: 16,
	},
	iconContainer: {
		flexDirection: 'row',
		marginLeft: 10,
	},
	icon: {
		width: 16,
		height: 16,
		tintColor: '#1F81E1',
		marginRight: 10,
	},
	timeContainer: {
		alignItems: 'flex-end',
	},
	time: {
		color: 'black',
		fontSize: 10,
		padding: 5,
		fontWeight: '400',
		fontFamily: 'Helvetica',
	},
};

export default ChatScreen;
