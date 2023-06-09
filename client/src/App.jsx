import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Add from "./pages/Add";
import ProductDetails from "./pages/ProductDetails";
import Order from "./pages/Order";
import Login from "./pages/login";
import Products from "./pages/Products";
import OrderDetails from "./pages/OrderDetails";

const App = () => {
  const [user, setUser] = useState(null);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout user={user} setUser={setUser} />,
      children: [
        {
          index: true,
          element: <Home user={user} />,
        },
        {
          path: "products",
          element: <Products user={user} />,
        },
        {
          path: "productDetails/:id",
          element: <ProductDetails user={user} />,
        },
        {
          path: "add",
          element: <Add user={user} />,
        },
        {
          path: "orders",
          element: <Order user={user} />,
        },
        {
          path: "orderDetails/:id",
          element: <OrderDetails user={user} />,
        },
        {
          path: "login",
          element: <Login user={user} setUser={setUser} />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
