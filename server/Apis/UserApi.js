const exp=require('express')
const userApp=exp.Router()
const UserOrAuthor=require('../Models/userAuthorModel')
const expressAsyncHandler=require("express-async-handler");
const createUserOrAuthor = require('./createUserOrAuthor');
const Article = require('../Models/articleModel');



// userApp.get("/test", async (req, res) => {
//     const result = await UserOrAuthor.find()
//     res.send({ message: "users" ,payload:result});
// })
userApp.post("/user",expressAsyncHandler(createUserOrAuthor))

userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
    //get comment obj
    const commentObj=req.body;
    console.log(commentObj,req.params.articleId)
    //add commnetObj to comments array of article
   const articleWithComments= await Article.findOneAndUpdate(
        { articleId:req.params.articleId},
        { $push:{ comments:commentObj}},
        {returnOriginal:false})

        console.log(articleWithComments)
    //send res
    res.status(200).send({message:"comment added",payload:articleWithComments})

}))
module.exports=userApp;