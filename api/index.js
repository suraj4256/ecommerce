const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);


mongoose.connect("mongodb+srv://surajdey2k1:surajdey2k1%23mongo@cluster0.tgcxi.mongodb.net/",{
}).then(()=>{
    console.log("Connected Successfully");
}).catch((error)=>{
  console.log(error);
});

app.listen(port,()=>{
    console.log("Server is running on Port ",port);
});
