// db.js

// Mongoose
const mongoose = require("mongoose");

// Connect to MongoDB Database
mongoose
   // .connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds119996.mlab.com:19996/sleepcodecompile`)
      .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0-1irll.mongodb.net/test?retryWrites=true&w=majority`)

    .then(() => {
        console.log("Database Ready for use!");
    })
    .catch(err => {
        console.error("Error connecting to Database!!");
        console.error(err.stack);
        process.exit(1);
    });

// Export the mongoose connection
module.exports = mongoose;