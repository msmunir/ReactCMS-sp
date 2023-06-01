import React from "react";

const Home = () => {
  return (
    <div className="view grey lighten-3 mt-5">
      <div className="mask">
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col-md-6">
              <h1 className="mb-4">
                Welcome <span className="text-warning">To</span>
                <br />
                <span className="cyan-text">Administration</span>
              </h1>
              <p className="mb-4 pb-2 dark-grey-text">
                Please Login to gain access.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-rounded btn-md ml-md-0"
              >
                Get started
              </button>
            </div>

            <div className="col-md-6">
              <img
                src="https://mdbootstrap.com/img/illustrations/hiker-man-colour.svg"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
