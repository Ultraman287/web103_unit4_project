import React from "react";
import "../App.css";
import OptionsAPI from "../services/OptionsAPI";
import OrdersAPI from "../services/OrdersAPI";
import { useState, useEffect } from "react";
import "../css/CreateOrder.css";

const CreateOrder = () => {
  const [noodles, setNoodles] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [addons, setAddons] = useState([]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState({
    noodle: [],
    protein: [],
    addon: [],
  });

  const impossibleCombinations = [
    ["Rice Noodle", "Udon Noodle"],
    ["Chicken", "Beef"],
    ["Chicken", "Pork"],
    ["Chicken", "Shrimp"],
    ["Chicken", "Tofu"],
    ["Beef", "Pork"],
    ["Beef", "Shrimp"],
    ["Beef", "Tofu"],
    ["Pork", "Shrimp"],
    ["Pork", "Tofu"],
    ["Shrimp", "Tofu"],
    ["Egg", "Tofu"],
    ["Egg", "Shrimp"],
    ["Egg", "Pork"],
    ["Egg", "Beef"],
    ["Egg", "Chicken"],
  ];

  useEffect(() => {
    const getNoodles = async () => {
      try {
        const noodlesData = await OptionsAPI.getAllNoodles();
        setNoodles(noodlesData);
      } catch (error) {
        throw error;
      }
    };
    getNoodles();
  }, []);

  useEffect(() => {
    const getProteins = async () => {
      try {
        const proteinsData = await OptionsAPI.getAllProteins();
        setProteins(proteinsData);
      } catch (error) {
        throw error;
      }
    };
    getProteins();
  }, []);

  useEffect(() => {
    const getAddons = async () => {
      try {
        const addonsData = await OptionsAPI.getAllAddons();
        setAddons(addonsData);
      } catch (error) {
        throw error;
      }
    };
    getAddons();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const noodles = orderItems.noodle.map((noodle) => noodle.name);
      const proteins = orderItems.protein.map((protein) => protein.name);
      const addons = orderItems.addon.map((addon) => addon.name);
      const order = {
        noodles: noodles,
        proteins: proteins,
        addons: addons,
        name: name,
        total: total,
      };
      console.log(order);
      await OrdersAPI.createOrder(order);
    } catch (error) {
      throw error;
    }
  };

  const handleAddItemToOrder = (type, item) => {
    if (order.includes(item)) {
      setOrder(order.filter((items) => items !== item));
      const currentItems = orderItems;
      currentItems[type] = currentItems[type].filter((items) => items !== item);
      setOrderItems(currentItems);
      setTotal((Number(total) - parseFloat(item.price.slice(1))).toFixed(2));
      document.getElementById(type + item.id).classList.remove("selected");
    } else {
      setOrder([...order, item]);
      const currentItems = orderItems;
      currentItems[type] = [...currentItems[type], item];
      setOrderItems(currentItems);
      setTotal((Number(total) + parseFloat(item.price.slice(1))).toFixed(2));
      document.getElementById(type + item.id).classList.add("selected");
    }
  };

  // Keeping track of whether impossible combinations are selected and deactivating the submit button if so
  useEffect(() => {
    let impossibleCombinationSelected = false;
    for (let i = 0; i < impossibleCombinations.length; i++) {
      if (
        orderItems.noodle.includes(impossibleCombinations[i][0]) &&
        orderItems.protein.includes(impossibleCombinations[i][1])
      ) {
        impossibleCombinationSelected = true;
      }
      if (
        orderItems.noodle.includes(impossibleCombinations[i][1]) &&
        orderItems.protein.includes(impossibleCombinations[i][0])
      ) {
        impossibleCombinationSelected = true;
      }
    }
    if (impossibleCombinationSelected) {
      document.getElementById("submit").classList.add("disabled");
    } else {
      document.getElementById("submit").classList.remove("disabled");
    }
  }, [orderItems]);

  return (
    <div>
      <div className="section">
        <h1>Choose your noodle</h1>
        <div className="options">
          {noodles.map((noodle) => (
            <div
              className="option-item"
              id={"noodle" + noodle.id}
              onClick={() => handleAddItemToOrder("noodle", noodle)}
            >
              <img src={noodle.img_url} />
              <h2>{noodle.name}</h2>
              <p>{noodle.description}</p>
              <h3>{noodle.price}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h1>Choose your protein</h1>
        <div className="options">
          {proteins.map((protein) => (
            <div
              className="option-item"
              id={"protein" + protein.id}
              onClick={() => handleAddItemToOrder("protein", protein)}
            >
              <img src={protein.img_url} />
              <h2>{protein.name}</h2>
              <p>{protein.description}</p>
              <h3>{protein.price}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h1>Choose your addons</h1>
        <div className="options">
          {addons.map((addon) => (
            <div
              className="option-item"
              id={"addon" + addon.id}
              onClick={() => handleAddItemToOrder("addon", addon)}
            >
              <img src={addon.img_url} />
              <h2>{addon.name}</h2>
              <p>{addon.description}</p>
              <h3>{addon.price}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="name">
        <h1>Name your order</h1>
        <input
          type="text"
          placeholder="Name your order"
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="Receipt">
        <h1>Receipt</h1>
        <div className="receipt-items">
          {order.map((item) => (
            <div className="receipt-item" key={item._id}>
              <h2>{item.name}</h2>
              <h3
                style={{
                  fontSize: "20px",
                }}
              >
                {item.price}
              </h3>
            </div>
          ))}
        </div>
        <h2>Total: {total}</h2>
      </div>

      <div className="submit">
        <button id="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;
