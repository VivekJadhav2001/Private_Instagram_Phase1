import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import Comments from "./Comments";
import Likes from "./Likes";
import PostOptions from "./PostOptions";
import api from "../contexts/axios";
import { useDispatch, useSelector } from "react-redux";
import Edit from "./Edit";
import { createComment } from "../features/postSlice";

// Skeleton placeholder while creating a post
// const PostSkeleton = () => (
//   <div className="w-full max-w-md mx-auto border border-gray-700 rounded-md mb-6 bg-black text-white animate-pulse overflow-hidden">
//     <div className="flex items-center justify-between p-3">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-full bg-gray-700" />
//         <div className="w-24 h-4 bg-gray-700 rounded" />
//       </div>
//     </div>
//     <div className="w-full h-80 bg-gray-700" />
//     <div className="px-3 py-2">
//       <div className="w-16 h-4 bg-gray-700 rounded mb-1" />
//       <div className="w-24 h-4 bg-gray-700 rounded" />
//     </div>
//   </div>
// );

const Post = ({ post }) => {
  const { creating } = useSelector((state) => state.posts); // loading state while creating post
  const { user } = useSelector((state) => state.auth);
  const currentUserId = user?._id;



  const [liked, setLiked] = useState(
    post.likes?.some((like) => like.userId === currentUserId) || false
  );
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [showComment, setShowComment] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [comment, setComment] = useState("");

  const [showEdit, setShowEdit] = useState(false)
  const dispatch = useDispatch()


  const handleMenuClick = () => {
    if (menuLoading) return;
    setMenuLoading(true);
    setTimeout(() => {
      setMenuOpen((prev) => !prev);
      setMenuLoading(false);
    }, 200);
  };

  // API call to like/unlike post
  const handleLike = async () => {
    const isLiked = liked;
    setLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      await api.post(`/post/like/${post._id}`);
    } catch (err) {
      setLiked(isLiked);
      setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };

  // console.log(post , "post in  frontend")

  const handleComment = () => {
    if (!comment.trim()) return;

    dispatch(
      createComment({
        postId: post._id,
        comment,
      })
    );

    setComment("");
    setShowComment(false);
  };

  return (
    <div className="w-full max-w-md mx-auto border border-gray-700 rounded-md mb-6 bg-black text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex justify-center items-center gap-3">
          <div className="w-10 h-10 flex justify-center items-center bg-slate-900 rounded-full text-white font-semibold text-2xl">
            {post.user?.name?.[0]}
          </div>
          <span className="font-semibold text-base">{post.user?.name}</span>
        </div>

        {/* MENU */}
        <div className="relative">
          <button onClick={handleMenuClick} className="font-bold cursor-pointer">
            {menuLoading ? "⏳" : "⋮"}
          </button>

          {menuOpen && <PostOptions currentUserId={currentUserId} post={post} setOpen={setShowEdit} onClose={() => setMenuOpen(false)} />}
        </div>
      </div>

      {/* Image */}
      <div className="w-full max-h-125 bg-black flex items-center justify-center overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt="Post"
            className="max-h-125 w-full object-contain"
          />
        ) : (
          <div className="w-full h-80 bg-gray-700 animate-pulse" />
        )}
      </div>

      {/* Like & Comment Count */}
      <div className="px-3 pt-2 text-sm font-semibold">
        {likesCount}{" "}
        <button
          className="hover:text-blue-600 hover:underline cursor-pointer"
          onClick={() => setShowLikes((prev) => !prev)}
        >
          likes
        </button>{" "}
        · {post.comments?.length || 0}{" "}
        <button
          className="hover:text-blue-600 hover:underline cursor-pointer"
          onClick={() => setShowComments((prev) => !prev)}
        >
          comments
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-4 px-3 py-2 text-xl">
        <button onClick={handleLike}>
          {liked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
        </button>
        <button onClick={() => setShowComment((prev) => !prev)}>
          <FaRegComment />
        </button>
      </div>

      {/* Caption */}
      <div className="px-3 pt-1 pb-3 text-sm leading-relaxed">
        <span className="font-semibold mr-1">{post.user?.name}</span>
        {post.text}
      </div>


      {/* Comment Input */}
      {showComment && (
        <div className="border-t border-gray-700 mt-2 flex items-center px-3 py-2">
          <input
            className="flex-1 bg-black outline-none text-sm"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="text-blue-500 font-semibold"
            onClick={handleComment}
          >Post</button>
        </div>
      )}

      {/* Comments */}
      {showComments && <Comments comments={post.comments || []} />}
      {/* Likes modal */}
      {showLikes && <Likes likes={post.likes || []} setShowLikes={setShowLikes} />}


      <Edit open={showEdit} post={post} onClose={() => setShowEdit(false)} />
    </div>
  );
};

export default Post;
