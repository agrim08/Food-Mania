import Title from "./Title";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isOnline = useOnline();
  const cartItems = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const pathname = location.pathname;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7000/logout",
        {},
        { withCredentials: true }
      );
      console.log("Logout successful", response.data);
      dispatch(removeUser());
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-white shadow-md w-full fixed top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Title />

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/home"
            className="text-gray-700 hover:text-orange-500 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-orange-500 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            target="_blank"
            className="text-gray-700 hover:text-orange-500 transition duration-300"
          >
            Contact
          </Link>
          <Link
            to="/instamart"
            className="text-gray-700 hover:text-orange-500 transition duration-300"
          >
            Instamart
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 hover:text-orange-500 transition duration-300"
          >
            <span data-testid="cart-status">Cart ({cartItems.length})</span>
          </Link>
          {pathname === "/" ? (
            ""
          ) : (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-orange-500 transition duration-300"
            >
              Logout
            </button>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <span
            data-testid="online-status"
            className={`text-sm font-semibold ${
              isOnline ? "text-green-600" : "text-red-600"
            }`}
          >
            {isOnline ? "Online ✅" : "Offline ❌"}
          </span>
          <button className="md:hidden ml-4" onClick={toggleMenu}>
            {isMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-4 px-4 py-3">
            <Link
              to="/home"
              className="text-gray-700 hover:text-orange-500 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-orange-500 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              target="_blank"
              className="text-gray-700 hover:text-orange-500 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/instamart"
              className="text-gray-700 hover:text-orange-500 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Instamart
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-orange-500 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <span data-testid="cart-status">Cart ({cartItems.length})</span>
            </Link>
            {pathname === "/" ? (
              ""
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-orange-500 transition duration-300 text-left"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
