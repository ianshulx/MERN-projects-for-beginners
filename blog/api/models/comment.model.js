import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    blogid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema, 'comments')
export default Comment 