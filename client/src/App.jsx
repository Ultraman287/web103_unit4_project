import React from "react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import ViewOrders from "./pages/ViewOrders";
import EditOrder from "./pages/EditOrder";
import CreateOrder from "./pages/CreateOrder";
import OrderDetails from "./pages/OrderDetails";
import "./App.css";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <CreateOrder title="BOLT BUCKET ORDERING | Customize" />,
    },
    {
      path: "/customorders",
      element: <ViewOrders title="BOLT BUCKET ORDERING | Custom Orders" />,
    },
    {
      path: "/customorders/:id",
      element: <OrderDetails title="BOLT BUCKET ORDERING | View" />,
    },
    {
      path: "/edit/:id",
      element: <EditOrder title="BOLT BUCKET ORDERING | Edit" />,
    },
  ]);

  return (
    <div className="app">
      <Navigation />

      {element}
    </div>
  );
};

export default App;
