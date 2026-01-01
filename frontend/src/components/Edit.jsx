import React, { useState } from 'react'
import { updatePost } from '../features/postSlice';
import { useDispatch } from 'react-redux';

function Edit({open, onClose, post}) {
  if (!open) return null;

    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()

    function handleEditPost(){
      dispatch(updatePost({ postId: post._id, text }));
      onClose()
    }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-180 rounded-xl bg-[#141414] text-white shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Create Post</h2>
          <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>


        {/* Caption */}
        <div className="px-5 mt-4">
          <input
            placeholder="Caption"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-lg bg-[#1a1a1a] border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
          />
        </div>

        {/* Content */}


        {/* Upload */}

        

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 py-4 mt-4">
          <button 
          onClick={onClose}
          >Cancel</button>
          <button
            onClick={handleEditPost}
            disabled={loading}
            className="bg-blue-600 px-4 py-1.5 rounded"
          >
            {loading ? "Editing..." : "Edit"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Edit