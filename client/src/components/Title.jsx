import Logo from "../assets/Logo.jpg";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Title = () => {
  // const { user } = useContext(UserContext);
  const loggedInUser = useSelector((store) => store.user);
  return (
    <div className="flex items-center">
      <Link to="/">
        <img
          data-testid="logo"
          className="md:h-16 md:w-16 sm:h-10 sm:w-10 rounded-full"
          src={Logo}
          alt="logo"
        />
      </Link>
      {loggedInUser && (
        <div className="ml-4 hidden md:block">
          <h3 className="text-lg font-semibold text-gray-800 ">
            Welcome, {loggedInUser?.username}
          </h3>
          <p className="text-sm text-gray-600">
            Your mail, {loggedInUser?.emailId}
          </p>
        </div>
      )}
    </div>
  );
};

export default Title;
