import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ user, setUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeepLoggedInChange = (e) => {
    setKeepLoggedIn(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    if (formData.email == "" || formData.password == "") {
      setError("You have to fill in all feilds!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/loginadmin",
        formData
      );
      console.log(res);
      if (res.data) {
        //Setting user to the data stored in the MongoDB
        setUser(res.data);

        //Save usertoken
        localStorage.setItem("token", res.data.token);

        //Resets the login-form
        setFormData({
          email: "",
          password: "",
        });
        navigate("/products");
      }
    } catch (err) {
      if (err.response.status == 401) {
        console.log("Wrong email or password");
        setError("Wrong email or password");
      }
      console.log(err);
    }
  };

  //Logging user when updated.
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div class="container my-5 py-5 z-depth-1">
      <section class="px-md-5 mx-md-5 text-center text-lg-left dark-grey-text">
        <div class="row d-flex justify-content-center">
          <div class="col-md-6">
            <form class="text-center" onSubmit={handleSubmit} noValidate>
              <p class="h4 mb-4">Sign in</p>

              <input
                type="email"
                id="email"
                name="email"
                class="form-control mb-4"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                id="password"
                name="password"
                class="form-control mb-4"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div class="d-flex justify-content-around">
                <div>
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="checkbox"
                      checked={keepLoggedIn}
                      onChange={handleKeepLoggedInChange}
                    />
                    <label
                      class="custom-control-label"
                      for="defaultLoginFormRemember"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                {/* <p className="error">{error}</p> */}
              </div>

              <button class="btn btn-info btn-block my-4 px-4" type="submit">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
    // <div className="loginForm">
    //   <div className="wrapper">
    //     <form onSubmit={handleSubmit} noValidate>
    //       <div className="loginRegister">
    //         <p>Please Login To Your Account</p>
    //         {/* <Link to="/registration">Or Register By Clicking Here</Link> */}
    //       </div>
    //       <br></br>

    //       <label htmlFor="email">Email*</label>
    //       <input
    //         type="email"
    //         id="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         required
    //       />

    //       <label htmlFor="password">Password*</label>
    //       <input
    //         type="password"
    //         id="password"
    //         name="password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         required
    //       />

    //       <div className="checkbox">
    //         <input
    //           type="checkbox"
    //           id="checkbox"
    //           checked={keepLoggedIn}
    //           onChange={handleKeepLoggedInChange}
    //         />
    //         <label htmlFor="checkbox">Please keep me logged in</label>
    //       </div>
    //       <p className="error">{error}</p>

    //       <button type="submit" id="btn-submit">
    //         Submit
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
}

export default Login;
