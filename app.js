const express = require('express');
const path = require('path');

// init app
const app = express();

//load View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');


// Home Route
app.get('/',function(req,res){
    let articles = [
        {
            id:1,
            title:'ArticalsOne',
            auther:'Usama Raza',
            body:'this is articals One'
        },
        {
            id:2,
            title:'Articals Two',
            auther:'Usama Ansari',
            body:'this is articals Two'
        },
        {
            id:3,
            title:'Articals Three',
            auther:'HM Raza',
            body:'this is articals Three'
        }
    ];
    res.render('index',{
        title:'Hello usama',
        articles : articles
    });
})
// Add Route
app.get('/articals/add',function(req,res){
    res.render('add_Articals',{
        title:'Add Articals'
    })
})


app.listen(3000,function(){
    console.log("Server start")
});