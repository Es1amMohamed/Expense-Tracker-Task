// import React, { useState } from "react";
// import axios from "axios";

// function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     password2: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://127.0.0.1:8000/accounts/register/", formData);
//       alert("Registered successfully! You can now login.");
//     } catch (err) {
//       console.error(err);
//       alert("Error registering user.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="username" placeholder="Username" onChange={handleChange} required />
//       <input name="email" placeholder="Email" onChange={handleChange} required />
//       <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
//       <input name="password2" placeholder="Confirm Password" type="password" onChange={handleChange} required />
//       <button type="submit">Register</button>
//     </form>
//   );
// }

// export default Register;



import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/accounts/register/", formData);

      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      alert("Registered successfully! You are now logged in.");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error registering user.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password2"
          placeholder="Confirm Password"
          type="password"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;

