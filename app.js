const express = require('express')
const path = require('path')
const mongoose =require("mongoose")
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

// Set Public Folder
app.use(express.static(path.join(__dirname,'public')));


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

// Get single Article
app.get('/article/:id',function(req,res){
    Article.findById(req.params.id,function(error,article){
        res.render('article',{
            article:article
        })
        // return
    })
})

// Edit Article Form
app.get('/article/edit/:id',function(req,res){
    // Article for model
    Article.findById(req.params.id,function(error,article){
        res.render('edit_article',{
            title:'Edit Article',
            article:article
        })
        // return
    })
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
    articles.auther = req.body.auther;
    articles.body = req.body.body;
    articles.save(function(error){
        if(error){
            console.log("--------->",error);
            return
        }else{
            console.log("--------->redirect")
            res.redirect('/');
        }
    })
    // return
})
// update submit POST Rout
app.post('/articles/edit/:id',function(req,res){
    let article={};
    article.auther = req.body.title;
    article.auther = req.body.auther;
    article.body = req.body.body;

    let query ={_id:req.params.id}
    // Article for model
    Article.update(query,article,function(error){
        if(error){
            console.log("--------->",error);
            return
        }else{
            console.log("--------->redirect")
            res.redirect('/');
        }
    })
    // return
})
//  Delete Article 
app.delete('/article/:id',function(req,res){
    let quary = {_id:req.params.id}

    Article.remove(quary,function(error){
        if(error){
            console.log("--------->",error);
        }
        res.send('success');
    })
})

app.listen(3000,function(){
    console.log("Server start")
});