import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const Contact = () => {
  const [res, setRes] = useState("hi");
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <h1>Contact Us</h1>
    </>
  );
};
export default Contact;
