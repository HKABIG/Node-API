require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require('./modals/productModal')
const port = process.env.PORT 
const username = process.env.USER 
const password = process.env.PASSWORD

// Middleware is added so that our project understands json
app.use(express.json())
// When can add multiple middlewares inorder to interpret where formats of data
// app.use(express.urlencoded())

// routes
app.get('/',(req,res)=>{
    res.send('Hello Node API');
})

app.get('/blog',(req,res)=>{
    res.send('My name is Ajay');
})

app.post('/product',async (req,res)=>{
    // console.log(req.body);
    // res.send(req.body); // used for testing purposes
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.get('/product', async(req,res) => {
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})


// update a product
app.put('/product/:id', async(req,res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(400).json({message: `Cannot find any product with ID${id}`})
        }
        const updatedProduct = await Product.findById(id);
        // res.status(200).json(updatedProduct);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// Delete Item from DataBase
app.delete('/product/:id',async (req,res) =>{
    try{
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message: `The item with ${id} doesn't exits`})
        }
        res.status(200).json(product);
    }catch{
        res.status(404).json({message: error.message})
    }
})

app.get('/product/:id',async (req,res) => {
    try{
        const {id} = req.params
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery",false) // this sets some messages to not show on console if there is

mongoose.connect(`mongodb+srv://${username}:${password}@nodeapi.lcw6t1i.mongodb.net/Node-API?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(port, ()=>{
        console.log("Node API is running on port "+port);
    })
    console.log('connected to MongoDB')
}).catch((error)=>{
    console.log(error)
})
