import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	crew: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Crew",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	parentId: {
		type: String,
	},
	children: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Thread",
		},
	],
	Likes : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		}
	]
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
