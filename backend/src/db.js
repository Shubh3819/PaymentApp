const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

async function connectDB() {
  if (!MONGO_URI) throw new Error("MONGO_URI missing");

  await mongoose.connect(MONGO_URI, {
    dbName: "paytmApp"   
  });

  console.log("MongoDB connected to", mongoose.connection.name);
}

module.exports = { connectDB };
