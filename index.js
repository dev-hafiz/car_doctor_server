const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware & parser
app.use(cors());
app.use(express.json());

const uri = `mongodb://${process.env.SECRET_USER_NAME}:${process.env.SECRET_KEY_PASSWORD}@cluster0-shard-00-00.luy9u.mongodb.net:27017,cluster0-shard-00-01.luy9u.mongodb.net:27017,cluster0-shard-00-02.luy9u.mongodb.net:27017/?ssl=true&replicaSet=atlas-9im02q-shard-0&authSource=admin&retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the server
    await client.connect();

    //collection and database
    const serviceCollection = client.db("carDB").collection("services");

    // //get method (default all)
    // app.get("/services", async (req, res) => {
    //   const cursor = serviceCollection.find();
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    //Ping to successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

//root route
app.get("/", (req, res) => {
  res.send("Live car doctor server running...");
});

//listen
app.listen(port, () => {
  console.log(`Server is running on port, ${port}`);
});
