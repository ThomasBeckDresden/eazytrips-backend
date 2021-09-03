const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    .then(() => {
        console.log("Connection to the database established successfully");
    })
    .catch(() => {
        console.log("Connection to the database failed");
    });

const client = mongoose.connection;

client.on("error", (error) => {
    console.log(error.message);
});

module.exports = client;