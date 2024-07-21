const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"no1!Trading",
    database:"p0716"
});

app.get("/", (req,res)=>{
    res.render("top.ejs")
});

app.get("/about", (req,res)=> {
    res.render("about.ejs")
});

app.get("/posts/new", (req,res)=> {
    res.render("posts_new.ejs")
});

app.post("/posts/create", (req,res)=>{
    
    const title = req.body.title
    const content = req.body.content
    const user_id = req.body.user_id
    
    connection.query(
        'INSERT posts(title,content,user_id) VALUES(?,?,?)',
        [title,content,user_id],
        (err,results,fields) => {
            res.redirect("/posts")
        }
    )
});

app.get("/posts/:id", (req,res)=> {

    connection.query(
        'SELECT * from posts where id =?',
        [req.params.id],
        (err,results,fields)=> {
            res.render("posts_show.ejs", {post: results[0]})
        })
});

app.get("/posts", (req,res)=>{

    connection.query(
        'SELECT * from posts',
        (err,results,fields)=> {
            res.render("posts_index.ejs", {posts :results});
        }
    )
})


app.listen(3000);
