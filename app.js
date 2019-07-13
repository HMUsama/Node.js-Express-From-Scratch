const express = require('express');
const path = require('path');
const mongoose =require("mongoose");
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// Check for DB Connection
db.on('open',function(){
    console.log("Check for DB Connection Mongo DB")
})
// Check for DB error
db.on('error',function(error){
    console.log("Check for DB error",error)
})

// Bring for models
let Article = require('./models/articles')

// init app
const app = express();

//load View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Home Route
app.get('/',function(req,res){
    Article.find({},function(error,articles){
        if(error){
            console.log('Data is not Gate *Error*',error)
        }else{
            res.render('index',{
                title:'Hello usama',
                articles : articles
            });
        }
    });
})
// Add Route
app.get('/articles/add',function(req,res){
    res.render('add_Articals',{
        title:'Add Articles'
    })
})

// Add submit POST Rout
app.post('/articles/add',function(req,res){
    let articles = new Article();
    articles.title = req.body.title;
    articles.title = req.body.auther;
    articles.title = req.body.body;
    console.log(req.body.title);
    articles.save(function(error){
        if(error){
            console.log("--------->",error);
            return
        }else{
            res.redirect('/');
        }
    })
    // return
})


app.listen(3000,function(){
    console.log("Server start")
});