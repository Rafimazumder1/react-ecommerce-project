import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // state
  const [name, setName] = useState("");
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

    // Simulate registration process
    if (name && phoneNumber && password) {
      // Registration successful
      toast.success("Registration successful");
      localStorage.setItem(
        "auth",
        JSON.stringify({ user: { name, phoneNumber }, token: "your_token" })
      );
      setAuth({ ...auth, token: "your_token", user: { name, phoneNumber } });
      navigate("/login");
    } else {
      // Registration failed
      toast.error("Registration failed. Please fill in all the fields.");
    }
  };

  const isValidPhoneNumber = (number) => {
    // Regular expression to validate Bangladeshi phone numbers
    const regex = /^(?:\+?88|0088)?01[13-9]\d{8}$/;
    return regex.test(number);
  };

  return (
    <div>
      <Jumbotron title="Register" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />

              <input
                type="tel"
                className="form-control mb-4 p-2"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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

export default Register;
