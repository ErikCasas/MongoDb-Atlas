const { Router } = require("express");
const main = require("../db");

const route = Router();

//al usar mongodb en node.js tan solo nos resta usar la misma sintaxis de las querys 
//en cada ruta según lo que necesitemos 

route.get("/users", async (req, res) => {
  try {
    const collection = await main();
    const data = await collection.find({}).toArray();//ya que responde con varios datos, le decimos que responda con un Array 
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

route.get("/users/:name", async (req, res) => {
  const name = req.params.name;
  const query = { nombre: name };
  try {
    const collection = await main();
    const data = await collection.findOne(query);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

route.post("/users", async (req, res) => {
  const { nombre, rol } = req.body;

  try {
    const collection = await main();

    const data = await collection.insertOne({ nombre, rol });

    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

route.put("/users/:name", async (req, res) => {
  const name = req.params.name;
  const { rol } = req.body;
  try {
    const collection = await main();

    const data = await collection.updateOne(
      { nombre: name },
      { $set: { rol: rol } }
    );
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

route.delete("/users/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const collection = await main();
    const data = await collection.deleteOne({ nombre: name });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

module.exports = route;
