import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

const postUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file provided",
      })
    }

    const file_url = req.file.path

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: { file_url },
    })
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}

const postCreate = async (req, res) => {
  try {
    const { text, image } = req.body

    // console.log(req.user,"MIddleware")

    let post = await Post.create({
      text,
      image,
      user: req.user.id, 
      email:req.user.email,
      name:req.user.name
    })

    post = await post.populate("user","_id name email")

    // console.log(post,"POST IN BACKEND CREATE")
    res.status(201).json({
      success: true,
      post,
    })
  } catch {
    res.status(500).json({ success: false, message: "Server error" })
  }
}


const allPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "_id name email")
      
      .sort({ createdAt: -1 })

      // console.log(posts,"backend get all posts")
    res.status(200).json({
      success: true,
      posts,
    })
  } catch {
    res.status(500).json({ success: false, message: "Server error" })
  }
}

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post Id is required",
      })
    }

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      })
    }


    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authorized to delete this post",
      })
    }

    await post.deleteOne()

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    })
  } catch (error) {
    console.log("Error deleting post:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id; // JWT should have id

    console.log("post id",postId,"user Id",userId)

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post Not Found" });

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user already liked
    const alreadyLiked = post.likes.some(
      (like) => like.userId === userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (like) => like.userId !== userId
      );
    } else {
      post.likes.push({
        userId: userId.toString(),
        userName: user.name
      });
    }

    await post.save();

    // Populate the likes with user name/email before sending
    // await post.populate('likes.user', 'name email');

    res.status(200).json({
      success: true,
      message: "Post liked/unliked successfully",
      data: post.likes
    });
  } catch (error) {
    console.log("Error Liking the post:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};






export {
  postUpload,
  postCreate,
  allPosts,
  deletePost,
  likePost
}