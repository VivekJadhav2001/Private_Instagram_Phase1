import { AiFillHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaRegCompass, FaRegHeart } from "react-icons/fa";
import { BsPlusSquare } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import CreatePostModal from "./CreatePostModal";

const Sidebar = () => {
    const user = useSelector(state => state.auth.user);
    const [showModal, setShowModal] = useState(false);

    // const inputFileRef = useRef()

    // function handleFileInput(e) {
    //     const file = e.target.files[0]
    // }

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-gray-700 bg-black text-white px-4 py-6">

            <h1 className="text-2xl font-semibold mb-10">Instagram</h1>

            <nav className="flex flex-col gap-6 text-lg">
                <Link className="flex items-center gap-4"><AiFillHome /> Home</Link>
                {/* <Link className="flex items-center gap-4"><FiSearch /> Search</Link>
                <Link className="flex items-center gap-4"><FaRegCompass /> Explore</Link>
                <Link className="flex items-center gap-4"><FaRegHeart /> Notifications</Link> */}

                <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => setShowModal(true)}
                >
                    <BsPlusSquare />
                    <span>Create</span>
                </div>


                <Link
                    to={`/profile/${user?.username}`}
                    className="flex items-center gap-4 mt-4"
                >
                    <img src={user?.avatar} className="w-6 h-6 rounded-full" />
                    {user?.username}
                </Link>
            </nav>
            <CreatePostModal open={showModal} onClose={() => setShowModal(false)} />
        </aside>
    );
};

export default Sidebar;
