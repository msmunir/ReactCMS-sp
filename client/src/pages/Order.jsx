import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const Order = ({ user }) => {
  if (!user) return <Navigate to="/login" replace />;
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          // Get all the orders from db
          "http://localhost:8080/api/orders/",

          //Get logged in users order
          // "http://localhost:8080/api/orders/bytoken",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#id</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {orders.map((item) => (
            <tr className="align-middle" key={item._id}>
              {/* <Link to={`/orderDetails/${item._id}`}> */}
              <th scope="row">{item._id}</th>
              <td>€{item.totalPrice}</td>
              <td>{item.pending ? "pending" : "transit"}</td>
              <td>{item.createdAt.slice(0, 10)}</td>
              {/* </Link> */}
              <td>
                {/* <button className="btn btn-secondary">Update</button> */}

                <Link to={`/orderDetails/${item._id}`}>
                  <button type="button" className="btn btn-secondary">
                    Update
                  </button>
                </Link>

                <Link to={`/orderDetails/${item._id}`}>
                  <button className="btn btn-secondary mx-1">Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
