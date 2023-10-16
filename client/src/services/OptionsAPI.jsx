const getAllNoodles = async () => {
  const res = await fetch(`http://localhost:3001/api/options/noodles`);
  const data = await res.json();
  return data;
};

const getNoodlebyName = async (name) => {
  const res = await fetch(`http://localhost:3001/api/options/noodles/${name}`);
  const data = await res.json();
  return data;
};

const getAllProteins = async () => {
  const res = await fetch(`http://localhost:3001/api/options/proteins`);
  const data = await res.json();
  return data;
};

const getProteinbyName = async (name) => {
  const res = await fetch(`http://localhost:3001/api/options/proteins/${name}`);
  const data = await res.json();
  return data;
};

const getAllAddons = async () => {
  const res = await fetch(`http://localhost:3001/api/options/addons`);
  const data = await res.json();
  return data;
};

const getAddonbyName = async (name) => {
  const res = await fetch(`http://localhost:3001/api/options/addons/${name}`);
  const data = await res.json();
  return data;
};

export default {
  getAllNoodles,
  getNoodlebyName,
  getAllProteins,
  getProteinbyName,
  getAllAddons,
  getAddonbyName,
};
