import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Product criteria
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imgURL: "",
  });

  // Take data from form upon changing the value
  const handleChange = (e) => {
    e.preventDefault();

    const { id, value } = e.target;
    setNewProduct((formProduct) => ({
      ...formProduct,
      [id]: value,
    }));
  };

  // CREATE: Creating a new product in db.

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

        // navigate to product page
        navigate("/products");

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

    alert("Successfully Created product.");
  };
  return (
    <div className="container mb-5">
      <h2 className="text-center my-4">Add a new product</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={newProduct.name}
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
            value={newProduct.price}
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
            value={newProduct.imgURL}
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
            value={newProduct.category}
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
            value={newProduct.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default Add;
