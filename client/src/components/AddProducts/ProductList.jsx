import React from "react";
import { useState, useEffect } from "react";
import ProductLine from "./ProductLine";
import "./ProductList";
// import { useParams } from "react-router-dom";

// import OneOrderLine from "../components/OneOrderLine";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.allProducts);
        console.log(data.allProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="productList">
      <div className="orderList">
        {/* <p>Order-ID: #{order._id}</p> */}
        <h2>All products</h2>
        <div className="orderLineDescription">
          <div></div>
          <div>
            <p>Product</p>
          </div>
          <div>
            <p>Category</p>
          </div>
          <div>
            <p>Price</p>
          </div>
          <div>
            <p>desciption</p>
          </div>
          <div>{/* <p>Total</p> */}</div>
        </div>

        {/* {products &&
          products.slice(0, 1).map((item) => (
            // <OneOrderLine  />

            <ProductLine key={item._id} item={item} />
          ))} */}
      </div>
    </div>
  );
};

export default ProductList;
