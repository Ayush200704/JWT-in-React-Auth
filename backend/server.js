import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import route from "./Routes/authRoute.js";
dotenv.config();

const app = express();
const port = process.env.PORT;
//middleware
app.use(express.json());
app.use(cors());
//route
app.use('/api/auth', route);

//global error handler
app.use((err, req, res, next)=>{
    err.statuCode = err.statuCode || '500';
    err.status = err.status || 'error';

    res.status(err.statuCode).json({
        code: err.statuCode,
        message: err.status
    });
});

//mongoDB and server
mongoose.connect(process.env.mongoDBURL)
    .then(()=>{
        console.log("connected to database");
        app.listen(port, ()=>{
            console.log(`listening to port ${port}`);
        })
    })

