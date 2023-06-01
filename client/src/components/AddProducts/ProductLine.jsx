import React from "react";
import "./ProductLine";

const ProductLine = ({ item }) => {
  return (
    <div className="productLine">
      <div
        className="productImg"
        style={{ backgroundImage: `url("${item.imgURL}")` }}
      ></div>
      <div>{item.name}</div>
      <div>{item.category}</div>
      <div>€ {item.price}</div>
      <div>{item.description}</div>
      {/* <div>€ {item.price * item.quantity}</div> */}
    </div>
  );
};

export default ProductLine;
