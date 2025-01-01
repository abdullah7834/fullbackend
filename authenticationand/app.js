const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const User = require('./models/user.js'); 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.set('view engine' , 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname , 'public')))
app.use(cookieParser());



app.get('/' , (req, res) =>{
res.render('index')
})
app.get('/read' , async (req , res) =>{
   const users = await User.find();
       res.render('read' , {users})
})

app.get('/edit/:id' , async (req ,res) =>{
   const {id} = req.params;
   const user = await User.findOne({_id : id})
   res.render('edit' , {user})
})

app.post('/update/:id' , async (req, res) =>{
   const {name , email , password} = req.body;
    const data = await jwt.verify(req.cookies , token , "thisismysecrekkeyandiam")
   const user = await User.findOneAndUpdate({_id : req.params.id} , {name , email , password} , {new : true})
    res.redirect('/read')
})


app.post('/create' , async (req , res ) =>{
   const {name  , email  , password} = req.body;
   const hashPassword = await bcrypt.hash(password , 10) 
   const user = await User.create({name : name  , email : email ,password : hashPassword})
    const token =jwt.sign({email} , 'thisismysecrekkeyandiam');
    res.cookie('token' , token)
   res.redirect('/read')
})
app.get('/login' , (req , res) =>{
   res.render('login')
})

app.post('/login' , async (req , res) =>{
   const {email} = req.body;
   const user = await User.findOne({email})
   if(!user)  return res.send("Something Went Wrong")
      bcrypt.compare(req.body.password , user.password , function(err , result){
         if(result) {
            const token = jwt.sign({email : user.email} , "thisismysecrekkeyandiam")
            res.cookie("token" , token) 
            return res.send("Yes you can login")
         } 
         else  return res.send("Something Went Wrong")
      })
})

app.get('/logout' , (req , res)=>{
   res.cookie("token" , "")
   res.redirect('/')
})






app.listen(5000 , () =>{
    console.log("Server is running on PORT 5000")
})