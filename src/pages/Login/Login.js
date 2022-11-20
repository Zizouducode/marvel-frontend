import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.webp";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = ({ handleToken }) => {
  //State declaration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = {};
  const navigate = useNavigate();

  //Handle input changes
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  //Handle Submit to register user in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      //Fill my user with the data
      user.email = email;
      user.password = password;
      const logUser = async () => {
        try {
          const response = await axios.post(
            `https://site--backend-marvel--nfqr62d7mh6n.code.run/user/login`,
            user
          );
          // console.log(response);
          if (response.data.token) {
            handleToken(response.data.token);
            navigate("/myfavorites");
          }
        } catch (error) {
          console.log(error.message);
          if (error.response.status === 401) alert("Invalid credentials");
        }
      };
      logUser();
      //Create request to send our user the the backend
    } else {
      alert("Please fill all the inputs");
    }
  };

  return (
    <div className="container">
      <form
        className="login-form-container"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="login-logo-container">
          <img className="login-logo" src={logo} alt="marvel" />
        </div>
        <h2>Welcome back Super Hero </h2>
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
        <button type="submit"> Login</button>
        <Link to="/signup">
          <p>You don't have an account ? Register here</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
