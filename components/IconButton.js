import React from 'react';
import { Image } from 'react-native';

const IconButton = (props) => {
	const { src, width, height } = props;
	return (
		<div
			style={{
				padding: '17px',
				backgroundColor: 'white',
				borderRadius: '4px',
			}}
		>
			<Image source={src} width={width} height={height} alt="" />
		</div>
	);
};

export default IconButton;
