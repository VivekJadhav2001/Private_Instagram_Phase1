import React, { useState } from "react";
import api from "../contexts/axios";
import { useDispatch } from "react-redux";
import { createPost } from "../features/postSlice";


export default function CreatePostModal({ open, onClose }) {
  if (!open) return null;

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

const handleCreatePost = () => {
  if (!text || !file) {
    alert("Caption and image are required");
    return;
  }

  dispatch(createPost({ text, file }));
  onClose();
};



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
          <button onClick={onClose} className="text-gray-400 hover:text-white">
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

        <div className="px-5 mt-4">
          <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">🖼️</div>
            <p className="text-sm text-gray-300">
              Upload Your Image Here
            </p>
            <input type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-3 text-center bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 py-4 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleCreatePost}
            disabled={loading}
            className="bg-blue-600 px-4 py-1.5 rounded"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
