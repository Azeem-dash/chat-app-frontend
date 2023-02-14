import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [userToken, setUserToken] = useState('');
	const [walletAddress, setWalletAddress] = useState('');
	const [chats,setChats] = useState([]);
	const [bool, setBool] = useState(false)


	useEffect(()=>{
		syncChatsWithLocalStorage()
	},[chats])

	const syncChatsWithLocalStorage = async() => {
		await AsyncStorage.setItem('chats',JSON.stringify(chats)) 
	}

	const logout = () => {
		setUserToken(null);
		setWalletAddress(null);
	};

	return (
		<AuthContext.Provider value={{ userToken, setUserToken, walletAddress, setWalletAddress, logout, chats, setChats, bool, setBool }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
