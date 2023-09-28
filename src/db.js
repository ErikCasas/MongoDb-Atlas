const { MongoClient } = require("mongodb");
require("dotenv").config();

// en el archivo .env ponemos la uri de conección a esa base de datos en la nube
const url = process.env.ATLAS;

const main = async () => {
  const client = new MongoClient(url);

  await client.connect();
  //retorno  la conección ya echa a la base de datos y a la colección en especifico 
  return client.db("Ada").collection("desarrolladores");
};

module.exports = main;
