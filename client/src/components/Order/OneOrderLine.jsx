import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <tr className="align-middle">
        <th scope="row">{singleProduct.imgURL}</th>
        <td>{singleProduct.name}</td>
        <td>{singleProduct.category}</td>
        <td>{singleProduct.price}</td>
        <td>{singleProduct.quantity}</td>
        <td>€{singleProduct.price * singleProduct.quantity}</td>
      </tr>
    </div>
  );
};

export default OneOrderLine;
