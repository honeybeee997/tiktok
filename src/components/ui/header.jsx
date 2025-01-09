import { Link, Outlet } from "react-router";
import { useSupabase } from "../../context/useSupabase";
import { FaArrowRight, FaHome, FaUpload } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";

const Header = () => {
  const { session, logout } = useSupabase();

  const [isOpen, setIsOpen] = useState(false);
  const userName = session?.user?.email;

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex justify-end w-full p-4 absolute top-0 right-0">
        {session ? (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-white focus:outline-none text-[#242424]"
            >
              <span className="font-medium ">{userName}</span>
              <FaChevronDown
                className={`w-4 h-4  transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                <Link
                  to="/feed"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 space-x-2"
                >
                  <FaHome className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/upload"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 space-x-2"
                >
                  <FaUpload className="w-4 h-4" />
                  <span>Upload</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 space-x-2"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="-mx-3 rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white flex items-center gap-2"
          >
            Login <FaArrowRight />
          </Link>
        )}
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
