import { pool } from "../config/database.js";

export const getNoodles = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM noodles");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
  }
};

export const getNoodlebyName = async (req, res) => {
  const { name } = req.params;
  const getNoodleQuery = {
    text: "SELECT * FROM noodles WHERE name = $1",
    values: [name],
  };
  try {
    const { rows } = await pool.query(getNoodleQuery);
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
  }
};

export const getProteins = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM proteins");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
  }
};

export const getProteinbyName = async (req, res) => {
  const { name } = req.params;
  const getProteinQuery = {
    text: "SELECT * FROM proteins WHERE name = $1",
    values: [name],
  };
  try {
    const { rows } = await pool.query(getProteinQuery);
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
  }
};

export const getAddons = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM addons");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
  }
};

export const getAddonbyName = async (req, res) => {
  const { name } = req.params;
  const getAddonQuery = {
    text: "SELECT * FROM addons WHERE name = $1",
    values: [name],
  };
  try {
    const { rows } = await pool.query(getAddonQuery);
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
  }
};

export const getOrders = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM orders");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
  }
};

export const createOrder = async (req, res) => {
  const { noodles, proteins, addons, total, name } = req.body;
  const createOrderQuery = {
    text: "INSERT INTO orders (noodles, proteins, addons, total, name) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    values: [noodles, proteins, addons, total, name],
  };
  try {
    const { rows } = await pool.query(createOrderQuery);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const deleteOrderQuery = {
    text: "DELETE FROM orders WHERE id = $1 RETURNING *",
    values: [id],
  };
  try {
    const { rows } = await pool.query(deleteOrderQuery);
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { noodles, proteins, addons, total, name } = req.body;
  const updateOrderQuery = {
    text: "UPDATE orders SET noodles = $1, proteins = $2, addons = $3, total = $4, name = $5 WHERE id = $6 RETURNING *",
    values: [noodles, proteins, addons, total, name, id],
  };
  try {
    const { rows } = await pool.query(updateOrderQuery);
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  const getOrderQuery = {
    text: "SELECT * FROM orders WHERE id = $1",
    values: [id],
  };
  try {
    const { rows } = await pool.query(getOrderQuery);
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
  }
};

export default {
  getNoodles,
  getNoodlebyName,
  getProteins,
  getProteinbyName,
  getAddons,
  getAddonbyName,
  getOrders,
  createOrder,
  deleteOrder,
  updateOrder,
  getOrder,
};
