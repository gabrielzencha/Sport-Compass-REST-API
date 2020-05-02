const express = require('express')
const bodyParser = require('body-parser')
const db = require('./../queries')

const blogpostRouter = express.Router();

blogpostRouter.use(bodyParser.json());
blogpostRouter.route('/post/')
.get(db.getPost)
.post(db.createPost)
.put(db.updatePost)
.delete(db.deletePost);


blogpostRouter.route('/comment')
.get(db.getComments)
.post(db.createComment)
.put(db.updateComment)
.delete(db.deleteComment);
module.exports = blogpostRouter;