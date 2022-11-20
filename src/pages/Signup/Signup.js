import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.webp";
import "./Signup.css";
import { Link } from "react-router-dom";

const Signup = ({ handleToken }) => {
  //State declaration
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = {};
  const navigate = useNavigate();
  //Handle input changes
  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //Handle Submit to register user in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && email && password) {
      //Fill my user with the data
      user.username = username;
      user.email = email;
      user.password = password;

      //Create request to send our user the the backend
      const registerUser = async () => {
        try {
          const response = await axios.post(
            "http://localhost:4000/user/signup",
            user
          );
          console.log(response);
          if (response.data.token) {
            handleToken(response.data.token);
            navigate("/");
          }
        } catch (error) {
          console.log(error.response.status);
          if (error.response?.status === 409) alert("This user already exists");
        }
      };
      registerUser();
    } else {
      alert("Please fill all the inputs");
    }
  };

  return (
    <div className="container">
      <form
        className="signup-form-container"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="signup-logo-container">
          <img className="signup-logo" src={logo} alt="marvel" />
        </div>

        <h2>BECOME A HERO </h2>

        <input
          type="text"
          placeholder="Spider Women"
          onChange={handleUserNameChange}
          value={username}
        />
        <input
          type="email"
          placeholder="SpiderWomen@hero.com"
          onChange={handleEmailChange}
          value={email}
        />
        <input
          type="password"
          placeholder="AZERTY pwd"
          onChange={handlePasswordChange}
          value={password}
        />
        <button type="submit"> Register</button>
        <Link to="/login">
          <p>Already an account ? Login here</p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
