import { Link } from "react-router-dom";
export const Topbar = () => {
  return (
    <div className="bg-gray-300 text-black min-h-12 ">
      <div className="nav flex justify-between items-center h-12 px-10">
        <img src="logo.png" alt="Logo" className="h-24" />
        <div className="flex nav-links gap-5 font-medium text-xl ">
          <Link to="/about" className="hover:text-[#2B5A84] ">
            About
          </Link>
          <Link to="/activity" className="hover:text-[#2B5A84] ">
            Activity
          </Link>
          <Link to="/questionList" className="hover:text-[#2B5A84] ">
            Problems
          </Link>
        </div>
      </div>
    </div>
  );
};
