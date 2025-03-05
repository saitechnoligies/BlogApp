const exp = require("express");
const app = exp();
require('dotenv').config();//process.env
const mongoose = require("mongoose");
const authorApp = require("./Apis/AuthorApi");
const adminApp = require("./Apis/AdminApi");
const userApp = require("./Apis/UserApi");
const cors=require('cors')
app.use(cors())

const port = process.env.PORT || 4000;


mongoose.connect(process.env.DBURL)
    .then(() => {
        app.listen(port, () => console.log(`server listening on port ${port}..`))
        console.log("DB connection success")
    })
    .catch(err => console.log("Error in DB connection ", err))


//body parser middleware
app.use(exp.json())
//connect API rouites
app.use('/user-api',userApp)
app.use("/author-api",authorApp)
app.use('/admin-api',adminApp)    