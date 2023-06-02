import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateOrder = ({ order }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [updateOrder, setUpdateOrder] = useState({
    price: order.price,
    status: order.status,
    date: order.date,
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

    alert("Product updated successfully");
  };
  return (
    <div className="container mb-5">
      <h2 className="text-center my-4">Update product</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="text"
            inputMode="decimal"
            className="form-control"
            id="price"
            value={order.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status:
          </label>
          <input
            type="text"
            className="form-control"
            id="status"
            value={order.status}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            type="text"
            inputMode="decimal"
            className="form-control"
            id="date"
            value={order.date}
            onChange={handleChange}
          />
        </div>

        {/* <div className="mb-3">
      <label htmlFor="name" className="form-label">
        Product Name:
      </label>
      <input
        type="text"
        className="form-control"
        id="name"
        value={updateProduct.name}
        onChange={handleChange}
      />
    </div> */}
        {/* <div className="mb-3">
      <label htmlFor="imgURL" className="form-label">
        Product Image:
      </label>
      <input
        type="text"
        className="form-control"
        id="imgURL"
        value={updateProduct.imgURL}
        onChange={handleChange}
      />
    </div> */}

        {/* <div className="mb-3">
      <label htmlFor="description" className="form-label">
        Product Description:
      </label>
      <textarea
        id="description"
        className="form-control"
        rows="5"
        value={updateProduct.description}
        onChange={handleChange}
      ></textarea>
    </div> */}
        <button className="btn btn-success px-5">Save</button>
      </form>
    </div>
  );
};

export default UpdateOrder;
