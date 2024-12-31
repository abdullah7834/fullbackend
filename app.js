const express = require('express')
const app = express()
const path = require('path')
const User = require('./models/UserModal.js')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname , 'views')))
app.set('view engine' , 'ejs')


app.get('/' , (req,res)=>{
    res.render('index')
})

app.get('/read', async (req ,res) =>{
const users = await User.find()
    res.render('read' , {users})
})
app.get('/edit/:userid', async (req ,res) =>{
const user = await User.findOne({_id : req.params.userid})
    res.render('edit' , {user})
})
app.post('/update/:userid', async (req ,res) =>{
    const {name , email , imageurl} = req.body;
const user = await User.findOneAndUpdate({_id : req.params.userid} , {name , email , imageurl} , {new : true})
    res.redirect('/read')
})

app.get('/delete/:id', async (req ,res) =>{
    const {id} = req.params;
const users = await User.findOneAndDelete({_id : id})
    res.redirect('/read')
})


app.post('/create' ,async (req , res)=>{
    const {name , email , imageurl}  = req.body;
    const creaetdUser = await User.create({
        name , 
        email ,
        imageurl
    })
    res.redirect('/read')
})


app.listen(3000 , () =>{
    console.log("App is running on port 3000")
})