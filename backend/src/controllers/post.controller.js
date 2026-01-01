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
      email: req.user.email,
      name: req.user.name
    })

    post = await post.populate("user", "_id name email")

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

    console.log("post id", postId, "user Id", userId)

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

const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const myPosts = await Post.find({ user: userId }).sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      message: "user posts fetch successfully",
      data: myPosts
    })

  } catch (error) {
    console.log("Error Liking the post:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}


const updatePost = async (req, res) => {

  const { text } = req.body;

  // You can decide whether you want to allow both fields to be empty during update
  if (text === undefined) {
    return res.status(400).json({ success: false, message: "nothing to update" })
  }
  try {
    const postId = req.params.postId

    const post = await Post.findById(postId).populate("user", "_id name email");

    if (!post) {
      return res.status(404).json({ success: false, message: "Post Not Found" })
    }

    console.log(post.user.toString(), "Post user")
    console.log(req.user.id, "middleware")
    //Check if user is valid or not
    if (post.user._id.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: "User not authorized to update this post" })
    }

    if (text !== undefined) {
      post.text = text
    }

    const updatedPost = await post.save()

    return res.status(200).json({ success: true, message: "update the post", data: updatedPost })


  } catch (error) {
    console.log("Error Updating the post:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const comment = async (req, res) => {
  try {
    const { comment } = req.body
    const userCommented = req.user.id
    const postId = req.params.postId

    const post = await Post.findById(postId).populate("user", "name email");
    const user = await User.findById(userCommented)

    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found" });
    }

    if (!post) {
      return res.status(404).json({ success: false, message: "Post Not found" })
    }
    if (!comment) {
      return res.status(400).json({ success: false, message: "Please provide valid comment" });
    }

    const commentedTime = new Date()

    post.comments.push({
      userName: user.name,
      userId: userCommented,
      comment: comment,
      createdAt: commentedTime
    })

    await post.save()

    return res.status(200).json({
      success: true,
      message: "Commented Successfully",
      data: post,
    });


  } catch (error) {
    console.log(error, "Error Commenting the post")
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}





export {
  postUpload,
  postCreate,
  allPosts,
  deletePost,
  likePost,
  getMyPosts,
  updatePost,
  comment
}