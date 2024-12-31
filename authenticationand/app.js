const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.use(cookieParser())

app.get('/' , (req, res) =>{
   res.send("done")
})
app.get('/read' , (req, res) =>{
   res.send("done")
})






app.listen(5000 , () =>{
    console.log("Server is running on PORT 5000")
})