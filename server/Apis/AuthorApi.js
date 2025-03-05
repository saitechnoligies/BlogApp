const exp=require('express');
const createUserOrAuthor = require('./createUserOrAuthor');
const expressAsyncHandler = require('express-async-handler');
const Article = require('../Models/articleModel');
const { requireAuth } = require('@clerk/express');
const authorApp=exp.Router()
require('dotenv').config()


authorApp.post("/author",expressAsyncHandler(createUserOrAuthor))

authorApp.post("/article", expressAsyncHandler(async (req, res) => {

    //get new article obj from req
    const newArtilceObj = req.body;
    const newArticle = new Article(newArtilceObj);
    const articleObj = await newArticle.save();
    res.status(201).send({ message: "article published", payload: articleObj })

}))

authorApp.get('/articles' ,expressAsyncHandler(async (req, res) => {
    //read all articles from db
    const listOfArticles = await Article.find({ isArticleActive: true });
    res.status(200).send({ message: "articles", payload: listOfArticles })
}))

// authorApp.get('/articles',requireAuth({signInUrl:"unauthorized"}) ,expressAsyncHandler(async (req, res) => {
//     //read all articles from db
//     const listOfArticles = await Article.find({ isArticleActive: true });
//     res.status(200).send({ message: "articles", payload: listOfArticles })
// }))
authorApp.put('/article/:articleId', 
    // requireAuth({signInUrl:"unauthorized"}),
    expressAsyncHandler(async (req, res) => {

    //get modified article
    const modifiedArticle = req.body;
    //update article by article id
    const latestArticle = await Article.findByIdAndUpdate(modifiedArticle._id,
        { ...modifiedArticle },
        { returnOriginal: false })
    //send res
    res.status(200).send({ message: "article modified", payload: latestArticle })
}))
authorApp.put('/articles/:articleId',expressAsyncHandler(async (req, res) => {

    //get modified article
    const modifiedArticle = req.body;
    //update article by article id
    const latestArticle = await Article.findByIdAndUpdate(modifiedArticle._id,
        { ...modifiedArticle },
        { returnOriginal: false })
    //send res
    res.status(200).send({ message: "article deleted or restored", payload: latestArticle })
}))


module.exports=authorApp;