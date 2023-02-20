import mongoose from 'mongoose';
// import GroupMember from './GroupMember.js';
import User from './User.js';

export default mongaoose.model(
	'GroupChatInfo',
	new mongoose.Schema({
		arrayOfObjects: {
			type: [mongoose.Schema.Types.Mixed],
			required: true
		}
	});
	      
);