import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  // hooks
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the phone number
    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid Bangladeshi phone number");
      return;
    }

    // Simulate login process
    if (phoneNumber && password) {
      // Login successful
      toast.success("Login successful");
      localStorage.setItem(
        "auth",
        JSON.stringify({ user: { phoneNumber }, token: "your_token" })
      );
      setAuth({ ...auth, token: "your_token", user: { phoneNumber } });
      navigate("/dashboard");
    } else {
      // Login failed
      toast.error("Login failed. Please fill in all the fields.");
    }
  };

  const isValidPhoneNumber = (number) => {
    // Regular expression to validate Bangladeshi phone numbers
    const regex = /^(?:\+?88|0088)?01[13-9]\d{8}$/;
    return regex.test(number);
  };

  return (
    <div>
      <Jumbotron title="Login" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="tel"
                className="form-control mb-4 p-2"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                autoFocus
              />

              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
