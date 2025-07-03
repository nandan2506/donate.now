const express = require("express")
const {auth} = require("../middlewares/auth.middleware")
const { addComment, deleteComment } = require("../controllers/comment.controllers")
const commentRoutes = express.Router()


commentRoutes.post("/add_comment/:campId",auth,addComment)
commentRoutes.delete("/delete_comment/:campId",auth, deleteComment)


module.exports = commentRoutes