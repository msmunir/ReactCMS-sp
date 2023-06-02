import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./OneOrderLine.scss";

const OneOrderLine = ({ item }) => {
  const [singleProduct, setSingleProduct] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/" + item.product)
      .then((res) => {
        setSingleProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.log(singleProduct);
  }, [singleProduct]);

  if (!singleProduct) {
    return;
  }

  return (
    <tr className="align-middle">
      <th scope="row">
        <img
          src={singleProduct.imgURL}
          alt={singleProduct.name}
          className="c-img"
        />
      </th>
      <td>{singleProduct.name}</td>
      <td>{singleProduct.category}</td>
      <td>{singleProduct.price}</td>
      <td>{item.quantity}</td>
      <td>€{singleProduct.price * item.quantity}</td>
    </tr>
  );
};

export default OneOrderLine;
