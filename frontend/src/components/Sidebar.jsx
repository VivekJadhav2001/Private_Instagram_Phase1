import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { FaRegCompass, FaRegHeart } from "react-icons/fa";
import { BsPlusSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import CreatePostModal from "./CreatePostModal";
import api from "../contexts/axios";
import { logout } from "../features/authSlice";

const Sidebar = () => {
    const user = useSelector(state => state.auth.user);
    const [showModal, setShowModal] = useState(false);
    

    const navigate = useNavigate()

    // const inputFileRef = useRef()

    // function handleFileInput(e) {
    //     const file = e.target.files[0]
    // }
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            dispatch(logout())
            navigate("/login", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-gray-700 bg-black text-white px-4 py-6">

            <h1 className="text-2xl font-semibold mb-10">Instagram</h1>

            <nav className="flex flex-col justify-between h-full text-lg">
                <div className="flex flex-col justify-center items-start gap-6">

                    <Link
                        to="/"
                        className="flex items-center gap-4 px-3 py-2 rounded-lg
             text-gray-300 hover:text-white
             hover:bg-white/10
             transition-all duration-200
             group"
                    >
                        <AiFillHome className="text-lg group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Home</span>
                    </Link>

                    {/* <Link className="flex items-center gap-4"><FiSearch /> Search</Link>
                <Link className="flex items-center gap-4"><FaRegCompass /> Explore</Link>
                <Link className="flex items-center gap-4"><FaRegHeart /> Notifications</Link> */}

                    <div
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-4 px-3 py-2 rounded-lg
             text-gray-300 hover:text-white
             hover:bg-white/10
             cursor-pointer
             transition-all duration-200
             group"
                    >
                        <BsPlusSquare className="text-lg group-hover:rotate-90 transition-transform" />
                        <span className="font-medium">Create</span>
                    </div>
                </div>


                <div className="flex flex-col justify-center items-start gap-6">
                    <Link
                        to="/profile"
                        className="flex items-center gap-4 px-3 py-2 rounded-lg
             text-gray-300 hover:text-white
             hover:bg-white/10
             transition-all duration-200
             group"
                    >
                        <CgProfile className="text-lg group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Profile</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="mt-auto flex items-center gap-3 px-3 py-2 rounded-lg
             text-red-400 hover:text-red-500
             hover:bg-red-500/10
             transition-all duration-200
             group"
                    >
                        <span className="text-lg group-hover:scale-110 transition-transform">
                            ⎋
                        </span>
                        <span className="text-lg font-medium">Log out</span>
                    </button>
                </div>

            </nav>
            <CreatePostModal open={showModal} onClose={() => setShowModal(false)} />
            
        </aside>
    );
};

export default Sidebar;
