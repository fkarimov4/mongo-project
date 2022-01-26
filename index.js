const mongodb = require("mongodb");

const client = new mongodb.MongoClient("mongodb://localhost:27017");

const connectClient = async () => {
  await client.connect();
  console.log("Client connected!");
};

const getUsersCollection = () => {
  const db = client.db("farrukhs-db-2");
  const col = db.collection("users");

  return col;
};

const getProductsCollection = () => {
  const db = client.db("farrukhs-db-2");
  const col = db.collection("products");

  return col;
};

const insertUser = async () => {
  const col = getUsersCollection();
  await col.insertOne({
    first: "Farrukh",
    last: "Karimov",
    email: "fkarimov4@gmail.com",
  });
  console.log("User inserted!");
};

const insertProduct = async () => {
  const col = getProductsCollection();
  await col.insertOne({
    name: "Chair",
    color: "Slate",
    price: 59.99,
  });
  console.log("Product inserted!");
};

const getUsers = async () => {
  const col = getUsersCollection();
  const users = await col.find({}).toArray();

  return users
};

const getProducts = async () => {
    const col = getProductsCollection();
    const products = await col.find({}).toArray();

    return products
  };

connectClient()
    .then(() => insertUser())
    .then(() => insertProduct())
    .then(() => getUsers())
    .then((users) => console.log(users))
    .then(() => getProducts())
    .then((products) => console.log(products))
    .then(() => client.close())

