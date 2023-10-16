import { pool } from "./database.js";
import "./dotenv.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";
import { image_search } from "duckduckgo-images-api";

const currentPath = fileURLToPath(import.meta.url);
const noodlesFile = fs.readFileSync(
  path.join(dirname(currentPath), "../config/data/noodles.json")
);
const noodleData = JSON.parse(noodlesFile);

const createNoodlesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS noodles;

    CREATE TABLE noodles (
      id serial PRIMARY KEY,
      name varchar(100) NOT NULL,
      description varchar(500) NOT NULL,
      img_url text NOT NULL,
      price money NOT NULL
    );
  `;
  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 noodles table created successfully");
  } catch (err) {
    console.error("⚠️ error creating noodles table", err);
  }
};

const seedNoodlesTable = async () => {
  await createNoodlesTable();
  noodleData.forEach(async (noodle) => {
    const insertQuery = {
      text: "INSERT INTO noodles (name, description, img_url, price) VALUES ($1, $2, $3, $4)",
    };
    const img_url = await image_search({
      query: noodle.name,
      moderate: false,
      iterations: 1,
    });
    const values = [
      noodle.name,
      noodle.description,
      img_url[0].image,
      noodle.price,
    ];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error seeding noodles table", err);
        return;
      }
      console.log(`✅ ${noodle.name} added successfully`);
    });
  });
};

seedNoodlesTable();

const addonsFile = fs.readFileSync(
  path.join(dirname(currentPath), "../config/data/addons.json")
);
const addonData = JSON.parse(addonsFile);

const createAddonsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS addons;


    CREATE TABLE addons (
      id serial PRIMARY KEY,
      name varchar(100) NOT NULL,
      description varchar(500) NOT NULL,
      img_url text NOT NULL,
      price money NOT NULL
    );
  `;
  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 addons table created successfully");
  } catch (err) {
    console.error("⚠️ error creating addons table", err);
  }
};

const seedAddonsTable = async () => {
  await createAddonsTable();
  addonData.forEach(async (addon) => {
    const insertQuery = {
      text: "INSERT INTO addons (name, description, img_url, price) VALUES ($1, $2, $3, $4)",
    };
    const img_url = await image_search({
      query: addon.name,
      moderate: false,
      iterations: 1,
    });
    const values = [
      addon.name,
      addon.description,
      img_url[0].image,
      addon.price,
    ];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error seeding addons table", err);
        return;
      }
      console.log(`✅ ${addon.name} added successfully`);
    });
  });
};

seedAddonsTable();

const proteinsFile = fs.readFileSync(
  path.join(dirname(currentPath), "../config/data/proteins.json")
);

const proteinData = JSON.parse(proteinsFile);

const createProteinsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS proteins;

    CREATE TABLE IF NOT EXISTS proteins (
      id serial PRIMARY KEY,
      name varchar(100) NOT NULL,
      description varchar(500) NOT NULL,
      img_url text NOT NULL,
      price money NOT NULL
    );
  `;
  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 proteins table created successfully");
  } catch (err) {
    console.error("⚠️ error creating proteins table", err);
  }
};

const seedProteinsTable = async () => {
  createProteinsTable();

  proteinData.forEach(async (protein) => {
    const insertQuery = {
      text: "INSERT INTO proteins (name, description, img_url, price) VALUES ($1, $2, $3, $4)",
    };
    const img_url = await image_search({
      query: protein.name,
      moderate: false,
      iterations: 1,
    });
    const values = [
      protein.name,
      protein.description,
      img_url[0].image,
      protein.price,
    ];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error seeding proteins table", err);
        return;
      }
      console.log(`✅ ${protein.name} added successfully`);
    });
  });
};

seedProteinsTable();

// Creating an orders table

const createOrdersTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS orders;

    CREATE TABLE IF NOT EXISTS orders (
      id serial PRIMARY KEY,
      name varchar(100) NOT NULL,
      total money NOT NULL,
      noodles varchar(100) NOT NULL,
      proteins varchar(100) NOT NULL,
      addons varchar(100) NOT NULL
      );
  `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 orders table created successfully");
  } catch (err) {
    console.error("⚠️ error creating orders table", err);
  }
};

createOrdersTable();
