const PostSkeleton = () => {
  return (
    <div className="w-full max-w-md mx-auto border border-gray-700 rounded-md mb-6 bg-black text-white overflow-hidden animate-pulse">
      
      {/* Header */}
      <div className="flex items-center gap-3 p-3">
        <div className="w-10 h-10 bg-gray-700 rounded-full" />
        <div className="h-4 w-32 bg-gray-700 rounded" />
      </div>

      {/* Image */}
      <div className="w-full h-80 bg-gray-800" />

      {/* Actions */}
      <div className="flex gap-4 px-3 py-3">
        <div className="w-6 h-6 bg-gray-700 rounded" />
        <div className="w-6 h-6 bg-gray-700 rounded" />
      </div>

      {/* Caption */}
      <div className="px-3 pb-4">
        <div className="h-3 w-24 bg-gray-700 rounded mb-2" />
        <div className="h-3 w-full bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default PostSkeleton;
