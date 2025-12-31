import express from "express"
import upload from "../utilities/upload.js"
import { allPosts, deletePost, likePost, postCreate, postUpload } from "../controllers/post.controller.js"
import { authorize } from "../middlewares/authorize.js"

const router = express.Router()

router.post("/upload",upload.single("file"),postUpload)
router.post("/create",authorize,postCreate)
router.get("/getAllPosts",authorize,allPosts)
router.delete("/delete/:postId",authorize,deletePost)
router.post("/like/:postId",authorize,likePost)

export default router