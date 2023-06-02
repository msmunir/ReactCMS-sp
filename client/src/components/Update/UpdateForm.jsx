import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateForm = ({ product }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [updateProduct, setUpdateProduct] = useState({
    name: product.name,
    category: product.category,
    price: product.price,
    description: product.description,
    imgURL: product.imgURL,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setUpdateProduct((previousProduct) => {
      return {
        ...previousProduct,
        [id]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/products/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpdateProduct(data);

        // navigate to products
        navigate("/products");
      })
      .catch((err) => console.log(err));

    // alert("Product updated successfully");
  };

  return (
    <div className="container mb-5">
      <h2 className="text-center my-4">Update product</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div className="mb-3">
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
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Product Price:
          </label>
          <input
            type="text"
            inputMode="decimal"
            className="form-control"
            id="price"
            value={updateProduct.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
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
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Product Category:
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={updateProduct.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
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
        </div>
        <button className="btn btn-success px-5">Save</button>
      </form>
    </div>
  );
};

export default UpdateForm;
