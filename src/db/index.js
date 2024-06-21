const mongoose = require("mongoose")
const {join} = require("path")
const {readdirSync} = require("fs")

// connect to mongodb
mongoose.connect(process.env.DB_PATH || process.env.DATABASE_URL || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/greenlearn").then(() => console.log("Connected to Mongo DB")).catch(() => console.error("failed to connect to Mongo"))


// load schemas
const schemasPath = join(__dirname, "schemas");
readdirSync(schemasPath).filter(val => val.endsWith(".js")).forEach(file => {
    (async () => require(join(schemasPath, file)))(); // loading schemas asynchronously
    console.log(file, "Loading...");
})


module.exports = mongoose