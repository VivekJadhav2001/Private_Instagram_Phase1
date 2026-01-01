import { Settings } from "lucide-react";
import Sidebar from "../components/Sidebar"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../features/postSlice";

const Profile = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const { list: posts } = useSelector((state) => state.posts)
    // console.log(posts, "INPROFILE")

    useEffect(() => {
        dispatch(getMyPosts())
    }, [])


    return (
        <>
            {/* ===== SIDEBAR ===== */}
            <Sidebar />

            {/* ===== PROFILE CONTENT ===== */}
            <div className="ml-64 min-h-screen bg-black text-white">
                <div className="max-w-5xl mx-auto px-10 pt-10">

                    {/* ===== TOP PROFILE SECTION ===== */}
                    <div className="flex gap-20 items-start">

                        {/* Avatar */}
                        <div className="shrink-0">
                            <img
                                src="https://files.catbox.moe/74owl8.png"
                                alt="profile"
                                className="w-36 h-36 rounded-full object-cover"
                            />
                        </div>

                        {/* Profile Info */}
                        <div className="flex flex-col gap-4 flex-1">

                            {/* Username + settings */}
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-semibold">{user?.email}</h2>
                                <Settings className="cursor-pointer" />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button className="bg-[#262626] px-5 py-1.5 rounded-lg text-sm font-medium hover:bg-[#363636]">
                                    Edit profile
                                </button>
                                <button className="bg-[#262626] px-5 py-1.5 rounded-lg text-sm font-medium hover:bg-[#363636]">
                                    View archive
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-10 text-sm">
                                <span><strong>{posts.length}</strong> posts</span>
                                <span><strong>161</strong> followers</span>
                                <span><strong>1,859</strong> following</span>
                            </div>

                            {/* Bio */}
                            <div className="text-sm leading-tight">
                                <p className="font-medium">{user?.name}</p>
                                {/* <p>त्याग शांती अनंतम</p> */}
                            </div>
                        </div>
                    </div>

                    {/* ===== HIGHLIGHTS ===== */}
                    <div className="flex gap-6 mt-10">
                        <div className="flex flex-col items-center gap-2 cursor-pointer">
                            <div className="w-16 h-16 rounded-full border border-gray-600 flex items-center justify-center">
                                <img
                                    src="https://via.placeholder.com/60"
                                    className="w-14 h-14 rounded-full"
                                />
                            </div>
                            <span className="text-xs">Highlights</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 cursor-pointer">
                            <div className="w-16 h-16 rounded-full border border-gray-600 flex items-center justify-center text-2xl">
                                +
                            </div>
                            <span className="text-xs">New</span>
                        </div>
                    </div>

                    {/* ===== TABS ===== */}
                    <div className="border-t border-gray-700 mt-12">
                        <div className="flex justify-center gap-20 text-sm tracking-widest uppercase text-gray-400">
                            <button className="flex items-center gap-2 py-4 border-t border-white text-white">
                                ⬛ Posts
                            </button>
                            {/* <button className="py-4 hover:text-white">🔖 Saved</button>
                            <button className="py-4 hover:text-white">👤 Tagged</button> */}
                        </div>
                    </div>

                    {/* ===== EMPTY POSTS STATE ===== */}
                    <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
                        {posts.length === 0 ? (
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full border border-gray-500 flex items-center justify-center text-3xl mb-4">
                                    📷
                                </div>
                                <h3 className="text-2xl text-white font-semibold">Share photos</h3>
                                <p className="text-sm mt-2">
                                    When you share photos, they will appear on your profile.
                                </p>
                                <button className="text-blue-500 mt-3 font-medium">
                                    Share your first photo
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-1 mt-6">
                                {posts.map((post) => (
                                    <div key={post._id} className="aspect-square bg-black">
                                        <img
                                            src={post.image}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </>
    );
};

export default Profile;
