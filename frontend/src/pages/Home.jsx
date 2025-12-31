import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import TopProfileBar from "../components/TopProfileBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../features/postSlice";
import PostSkeleton from "../components/PostSkeleton";

const Home = () => {
  const dispatch = useDispatch();


const { list: posts, loading, creating } = useSelector(
  state => state.posts
);

  const state = useSelector((state)=>state)

  console.log(state)

  // console.log(posts,"posts in home")
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch])

  return (
    <div className="bg-black min-h-screen text-white">
      <Sidebar />
      <TopProfileBar />

      <main className="md:ml-64 pt-10 flex justify-center">
        <div className="w-full max-w-xl">
          {creating && <PostSkeleton />}
          {posts.map(post => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
