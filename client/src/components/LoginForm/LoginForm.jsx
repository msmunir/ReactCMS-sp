import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginForm({ user, setUser }) {
  const navigate = useNavigate();
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // e.preventDefault();

    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });

    const { id, value } = e.target;
    setFormData((data) => ({
      ...data,
      [id]: value,
    }));
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
    <div className="container my-5 py-5 z-depth-1">
      <section className="px-md-5 mx-md-5 text-center text-lg-left dark-grey-text">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <form className="text-center" onSubmit={handleSubmit} noValidate>
              <p className="h4 mb-4">Sign in</p>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control mb-4"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                id="password"
                name="password"
                className="form-control mb-4"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div className="d-flex justify-content-around">
                <div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkbox"
                      checked={keepLoggedIn}
                      onChange={handleKeepLoggedInChange}
                    />
                    <label className="custom-control-label" htmlFor="checkbox">
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <p className="error">{error}</p>
              <button
                className="btn btn-info btn-block my-4 px-4"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginForm;
