import React from "react";
import "../App.css";
import OptionsAPI from "../services/OptionsAPI";
import OrdersAPI from "../services/OrdersAPI";
import { useState, useEffect } from "react";
import "../css/ViewOrders.css";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersData = await OrdersAPI.getAllOrders();
        setOrders(ordersData);
      } catch (error) {
        throw error;
      }
    };
    getOrders();
  }, []);

  return (
    <div className="order-container">
      {orders.map((order) => {
        return (
          <div className="order-card">
            <h1>{order.name}</h1>
            <h2>Total: {order.total}</h2>
            <h3>Noodles: {order.noodles}</h3>
            <h3>Proteins: {order.proteins}</h3>
            <h3>Addons: {order.addons}</h3>
            <div className="order-buttons">
              <button
                onClick={() => {
                  OrdersAPI.deleteOrder(order.id);
                  window.location.reload();
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  window.location.href = `/customorders/${order.id}`;
                }}
              >
                View
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewOrders;
