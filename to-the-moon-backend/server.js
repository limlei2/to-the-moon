require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 8080;

const userRoute = require("./routes/userRoute");
const stockRoute = require("./routes/stockRoute")

app.use(cors());
app.use(express.json());

async function connect(){
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to MongoDB");
    } catch (e){
        console.error(e);
    }
}

connect();

app.use("/api/users", userRoute);
app.use("/api/stocks", stockRoute);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
