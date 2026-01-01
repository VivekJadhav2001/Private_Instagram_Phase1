import { useSelector, useDispatch } from "react-redux";

function PostOptions({ post, currentUserId, onClose, setOpen, isDark=true }) {
  const isOwner = post.user?._id === currentUserId;

  const handleEdit = () => {
    setOpen(true);
    onClose();
  };

  return (
    <div className={`absolute right-0 mt-2 w-52 rounded-lg shadow-lg z-50 border
      ${isDark ? "bg-[#1f1f1f] text-gray-200 border-white/10" : "bg-white text-gray-800 border-gray-200"}`}
    >
      {isOwner && (
        <>
          <Option text="✏️ Edit Post" onClick={handleEdit} />
          <div className="my-1 border-t border-white/10" />
        </>
      )}

      <Option text="🗑️ Delete Post" danger onClick={() => deletePost(post._id)} />
    </div>
  );
}



function Option({ text, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm transition
        ${danger ? "text-red-500 hover:bg-red-500/10" : "hover:bg-black/5 dark:hover:bg-white/10"}`}
    >
      {text}
    </button>
  );
}

export default PostOptions