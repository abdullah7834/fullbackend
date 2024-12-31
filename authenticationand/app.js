const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');


app.set('view engine' , 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname , 'public')))
app.use(cookieParser());



app.get('/' , (req, res) =>{
   res.send("done")
})







app.listen(5000 , () =>{
    console.log("Server is running on PORT 5000")
})