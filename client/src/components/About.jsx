import { useEffect } from "react";
import ProfileClass from "./ProfileClass";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const About = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>About Us Page</h1>
      <p>This is an about us page</p>
      <ProfileClass name="Agrim" />
    </div>
  );
};

export default About;
