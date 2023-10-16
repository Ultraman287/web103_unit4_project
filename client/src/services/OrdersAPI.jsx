const getAllOrders = async () => {
  const res = await fetch(`http://localhost:3001/api/orders`);
  const data = await res.json();
  return data;
};

const getOrderById = async (id) => {
  const res = await fetch(`http://localhost:3001/api/orders/${id}`);
  const data = await res.json();
  return data;
};

const createOrder = async (order) => {
  const res = await fetch(`http://localhost:3001/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  const data = await res.json();
  return data;
};

const updateOrder = async (id, order) => {
  const res = await fetch(`http://localhost:3001/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  const data = await res.json();
  return data;
};

const deleteOrder = async (id) => {
  const res = await fetch(`http://localhost:3001/api/orders/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
