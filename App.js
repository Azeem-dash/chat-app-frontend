/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { StatusBar } from 'react-native';
import Providers from './wrappers/Providers';

import RootNavigator from './wrappers/RootNavigator';

const App = () => {
	return (
		<>
			<StatusBar backgroundColor="#1F81E1" barStyle={'default'} />
			<Providers>
				<RootNavigator />
			</Providers>
		</>
	);
};

export default App;
