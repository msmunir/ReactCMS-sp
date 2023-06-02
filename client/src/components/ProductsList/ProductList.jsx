import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./ProductList.scss";

const ProductList = ({ user }) => {
  if (!user) return <Navigate to="/login" replace />;

  const [product, setProduct] = useState([]);

  // READ: Get all the products from db

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.allProducts);
        console.log(data.allProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  // DELETE: Remove one product from db

  const handleDelete = (e, itemId) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");

    setTimeout(() => {
      fetch(`http://localhost:8080/api/products/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Product deleted successfully:", data);

          setProduct((prevProducts) =>
            prevProducts.filter((product) => product._id !== itemId)
          );
        })
        .catch((err) => console.log(err));
    }, 1000);
  };

  return (
    <div className="container my-5 py-3 z-depth-1 ">
      <div>
        <Link to={`/add`}>
          <button type="button" className="btn btn-success mx-5 mb-5 px-5">
            Add product
          </button>
        </Link>
      </div>
      <section className="dark-grey-text">
        <div className="table-responsive px-5">
          {/* <table className="table table-hover "> */}
          <table className="table product-table mb-0">
            <thead className="mdb-color lighten-5">
              <tr>
                <th></th>
                <th className="font-weight-bold">
                  <strong>Product</strong>
                </th>
                <th className="font-weight-bold">
                  <strong>Category</strong>
                </th>

                <th className="font-weight-bold">
                  <strong>Price</strong>
                </th>
                <th className="font-weight-bold">
                  <strong>Description</strong>
                </th>
                <th className="font-weight-bold">
                  <strong>Action</strong>
                </th>
              </tr>
            </thead>

            <tbody>
              {product.map((item) => {
                return (
                  <tr key={item._id}>
                    <th scope="row">
                      <img
                        src={item.imgURL}
                        alt={item.name}
                        className="custom-img"
                      />
                    </th>
                    <td>
                      <h5 className="mt-3">
                        <strong>{item.name}</strong>
                      </h5>
                    </td>
                    <td>{item.category}</td>
                    <td>€{item.price}</td>
                    <td>{item.description}</td>

                    <td className="d-flex justify-content-center align-items-center">
                      <div>
                        <Link to={`/productDetails/${item._id}`}>
                          <button
                            type="button"
                            className="btn btn-primary custom-Ebtn customBtn"
                          >
                            Edit
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-danger custom-Dbtn customBtn"
                          onClick={(e) => handleDelete(e, item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
