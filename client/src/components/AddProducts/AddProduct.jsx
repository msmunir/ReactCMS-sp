import React, { useState } from "react";
import "./addProduct.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imgURL: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    const { id, value } = e.target;
    setNewProduct((formProduct) => ({
      ...formProduct,
      [id]: value,
    }));
  };

  // POST: Creating a new product in db.

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/");

        // Reset form
        setNewProduct({
          name: "",
          category: "",
          price: "",
          description: "",
          imgURL: "",
        });
      })
      .catch((err) => console.log(err));

    // alert("Success");

    // navigate to product page
  };

  return (
    <div className="container-form">
      <h1 className="text-center my-5">Add a new product</h1>

      <form noValidate onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            className="mb-3"
            id="name"
            value={newProduct.name}
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
            value={newProduct.category}
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
            value={newProduct.price}
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
            value={newProduct.imgURL}
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
            value={newProduct.description}
            onChange={handleChange}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
