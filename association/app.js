const express = require('express');
const app = express();
const User = require('./models/user.js')
const Post = require('./models/post.js')
  


app.get('/create' , async(req , res) =>{
    const user  =await User.create({
        name : "Abdullah Javaid",
        email :"abdullah@gmail.com",
        age :25
    })
res.send(user)
})
app.get('/post/create' , async(req , res) =>{
    const post = await Post.create({
        postdata : "Hello Kese ho",
        user  :"677523659f05b55640d81492",
    })
    const user = await User.findOne({_id :"677523659f05b55640d81492"})
    user.posts.push(post._id)
    await user.save();
   res.send({post , user})
})




app.listen(3000 , () =>{
    console.log("Server is running on PORT 3000")
})