import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateOrder = ({ order }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [updateOrder, setUpdateOrder] = useState({
    status: order.status,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setUpdateProduct((prevOrder) => {
      return {
        ...prevOrder,
        [id]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/orders/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpdateOrder(data);

        // navigate to products
        navigate("/orders");
      })
      .catch((err) => console.log(err));

    // alert("Product updated successfully");
  };
  return (
    <div className="container mb-5">
      <h2 className="text my-5">Update order status</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status:
          </label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="status"
              checked={order.status} //
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="status">
              Pending
            </label>
          </div>
        </div>
        <button className="btn btn-success px-5">Save</button>
      </form>
    </div>
  );
};

export default UpdateOrder;
