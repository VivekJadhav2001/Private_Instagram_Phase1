import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likes: [
        {
            userId: { type: String, required: true },
            userName: { type: String, required: true }
        }
    ],
    comments: [
        {
            userName: { type: String, required: true },
            userId: { type: String, required: true },
            comment: { type: String, required: true },
            createdAt: { type: Date, default: Date.now() }
        },
    ]
}, { timestamps: true })

export const Post = mongoose.model("Post", postSchema)