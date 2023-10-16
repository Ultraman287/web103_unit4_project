import React from "react";
import "../App.css";
import OptionsAPI from "../services/OptionsAPI";
import OrdersAPI from "../services/OrdersAPI";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/OrderDetails.css";

const OrderDetails = (props) => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [noodles, setNoodles] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [addons, setAddons] = useState([]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const orderData = await OrdersAPI.getOrderById(id);
        // I'll try manually parsing it
        const noodles = orderData.noodles.slice(1, -1).split(",");
        for (let i = 0; i < noodles.length; i++) {
          noodles[i] = noodles[i].slice(1, -1);
        }

        noodles.forEach((noodle) => {
          OptionsAPI.getNoodlebyName(noodle).then((res) => {
            setNoodles((prev) => [...prev, res]);
          });
        });

        const proteins = orderData.proteins.slice(1, -1).split(",");
        for (let i = 0; i < proteins.length; i++) {
          proteins[i] = proteins[i].slice(1, -1);
        }

        proteins.forEach((protein) => {
          OptionsAPI.getProteinbyName(protein).then((res) => {
            setProteins((prev) => [...prev, res]);
          });
        });

        const addons = orderData.addons.slice(1, -1).split(",");
        for (let i = 0; i < addons.length; i++) {
          addons[i] = addons[i].slice(1, -1);
        }

        addons.forEach((addon) => {
          OptionsAPI.getAddonbyName(addon).then((res) => {
            setAddons((prev) => [...prev, res]);
          });
        });

        setOrder(orderData);
      } catch (error) {
        throw error;
      }
    };
    getOrder();
  }, []);

  return (
    <div>
      {order && (
        <>
          <h1>{order.name}</h1>
          <h2>Total: {order.total}</h2>
          <h3>Noodles: {order.noodles}</h3>
          <h3>Proteins: {order.proteins}</h3>
          <h3>Addons: {order.addons}</h3>
        </>
      )}
      <div className="edit-buttons">
        <button
          onClick={() => {
            window.location.href = `/edit/${id}`;
          }}
        >
          Edit
        </button>
      </div>
      {/* {noodles.map((noodle) => {
        return (
          <div
            className="order-card"
            onClick={() => {
              console.log(noodles);
            }}
          >
            <h1>{noodle.name}</h1>
            <h2>{noodle.price}</h2>
            <h3>{noodle.description}</h3>
          </div>
        );
      })} */}
    </div>
  );
};

export default OrderDetails;
