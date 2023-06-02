import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OneOrderLine from "../components/Order/OneOrderLine";
import UpdateOrder from "../components/Order/UpdateOrder";

const OrderDetails = ({ user }) => {
  if (!user) return <Navigate to="/login" replace />;
  const token = localStorage.getItem("token");

  const [order, setOrder] = useState();

  const { id } = useParams();

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:8080/api/orders/" + id, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         setOrder(res.data);
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     console.log(order);
  //   }, [order]);

  useEffect(() => {
    fetch("http://localhost:8080/api/orders/" + id)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!order) {
    return;
  }
  return (
    // <div className="container">
    //   <table className="table">
    //     <thead>
    //       <tr>
    //         <th scope="col"></th>
    //         <th scope="col">Product</th>
    //         <th scope="col">Category</th>
    //         <th scope="col">Price</th>
    //         <th scope="col">Quantity</th>
    //         <th scope="col">Total</th>
    //       </tr>
    //     </thead>
    //     <tbody className="table-group-divider">
    //       {order &&
    //         order.orderLines.map((item) => (
    //           <OneOrderLine key={item._id} item={item} />
    //         ))}
    //     </tbody>
    //   </table>
    // </div>

    <div>{order && <UpdateOrder order={order} />}</div>
  );
};

export default OrderDetails;
