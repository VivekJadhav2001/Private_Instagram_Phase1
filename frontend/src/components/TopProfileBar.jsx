import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TopProfileBar = () => {
  const user = useSelector(state => state.auth.user);
  // console.log(user,"user in top profile")

  const firstName = user.name.split(" ")[0]
  const firstLetter = firstName[0]

  return (
    <div className="hidden lg:flex items-center justify-end gap-3 fixed right-6 top-6 text-white">
      {user.image ? <img src={user?.avatar} className="w-10 h-10 rounded-full" /> : <div className="w-10 h-10 rounded-full bg-slate-400 text-black flex justify-center items-center">{firstLetter}</div>}
      <div>
        <Link
          to={`/profile/${user?.username}`}
          className="font-semibold hover:underline"
        >
          {user?.username}
        </Link>
        <p className="text-gray-400 text-sm">{user?.email}</p>
      </div>
    </div>
  );
};

export default TopProfileBar;
