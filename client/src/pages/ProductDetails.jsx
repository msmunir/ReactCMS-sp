import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import UpdateForm from "../components/Update/UpdateForm";

const ProductDetails = ({ user }) => {
  if (!user) return <Navigate to="/login" replace />;
  const [product, setProduct] = useState();
  const { id } = useParams();

  // Get One product with id

  useEffect(() => {
    fetch("http://localhost:8080/api/products/" + id)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>{product && <UpdateForm product={product} />}</div>;
};

export default ProductDetails;
