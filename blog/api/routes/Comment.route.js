import express from 'express'
import { addcomment, commentCount, deleteComment, getAllComments, getComments } from '../controllers/Comment.controller.js'
import { authenticate } from '../middleware/authenticate.js'

const CommentRouote = express.Router()

CommentRouote.post('/add', authenticate, addcomment)
CommentRouote.get('/get/:blogid', getComments)
CommentRouote.get('/get-count/:blogid', commentCount)
CommentRouote.get('/get-all-comment', authenticate, getAllComments)
CommentRouote.delete('/delete/:commentid', authenticate, deleteComment)


export default CommentRouote