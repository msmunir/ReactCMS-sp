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
        navigate("/");
      })
      .catch((err) => console.log(err));

    alert("Success");
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Product Name:
        </label>
        <input
          type="text"
          className="mb-3"
          id="name"
          value={updateProduct.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Product Category:
        </label>
        <input
          type="text"
          className="mb-3"
          id="category"
          value={updateProduct.category}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price" className="form-label">
          Product Price:
        </label>
        <input
          type="number"
          inputMode="decimal"
          className="mb-3"
          id="price"
          value={updateProduct.price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="imgURL" className="form-label">
          Image Url:
        </label>
        <input
          type="text"
          className="mb-3"
          id="imgURL"
          value={updateProduct.imgURL}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Product Description:
        </label>
        <input
          className="mb-3"
          id="description"
          type="text"
          value={updateProduct.description}
          onChange={handleChange}
        ></input>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Product
      </button>
    </form>
  );
};

export default UpdateForm;
