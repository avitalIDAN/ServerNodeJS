const express = require("express");
app = express();
const hostname = "jsonplaceholder.typicode.com";
import DBPlaceholder from "./DBPlaceholder";
import Check from "./Check"
/**
 * app.get(stringPhat, (req, res)=>{
    res.send(DBPlaceholder.getAll('posts'));
})
app.get(`/${posts}`, (req, res)=>{
    res.send(DBPlaceholder.getAll('posts'));
}) */

app.get('/:collection', (req, res) => {
    const collection = req.params.collection;
    res.send(DBPlaceholder.get(collection));
});

/**   
app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.get('/posts', (req, res)=>{
    res.send(DBPlaceholder.getAll('posts'));
})


app.get('/comments', (req, res)=>{
    res.send(DBPlaceholder.getAll('comments'));
})

app.get('/albums', (req, res)=>{
    res.send(DBPlaceholder.getAll('albums'));
})

app.get('/photos', (req, res)=>{
    res.send(DBPlaceholder.getAll('photos'));
})

app.get('/todos', (req, res)=>{
    res.send(DBPlaceholder.getAll('todos'));
})

app.get('/users', (req, res)=>{
    res.send(DBPlaceholder.getAll('users'));
})*/

app.get('/posts/:id', (req, res)=>{
    const post = DBPlaceholder.getOne('posts', req.params.id)
    if (!post) return res.status(404).send("Not Found")
    res.send(post);
})

app.get('/comments/:id', (req, res)=>{
    const post = DBPlaceholder.getOne('comments', req.params.id)
    if (!post) return res.status(404).send("Not Found")
    res.send(post);
})

app.get('/albums/:id', (req, res)=>{
    const post = DBPlaceholder.getOne('albums', req.params.id)
    if (!post) return res.status(404).send("Not Found")
    res.send(post);
})

app.get('/photos/:id', (req, res)=>{
    const post = DBPlaceholder.getOne('photos', req.params.id)
    if (!post) return res.status(404).send("Not Found")
    res.send(post);
})

app.get('/todos/:id', (req, res)=>{
    const post = DBPlaceholder.getOne('todos', req.params.id)
    if (!post) return res.status(404).send("Not Found")
    res.send(post);
})

app.get('/users/:id', (req, res)=>{
    const post = DBPlaceholder.getOne('users', req.params.id)
    if (!post) return res.status(404).send("Not Found")
    res.send(post);
})

app.post('/posts', (req, res)=>{
    // check body
    // res.status(400).send("bad request")
    const {error} = Check.checkPosts(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }

    res.send(DBPlaceholder.addOne('posts', req.body));
})

app.post('/comments', (req, res)=>{
    // check body
    res.send(DBPlaceholder.addOne('comments', req.body));
})

app.post('/albums', (req, res)=>{
    // check body
    res.send(DBPlaceholder.addOne('albums', req.body));
})

app.post('/photos', (req, res)=>{
    // check body
    res.send(DBPlaceholder.addOne('photos', req.body));
})

app.post('/todos', (req, res)=>{
    // check body
    res.send(DBPlaceholder.addOne('todos', req.body));
})

app.post('/users', (req, res)=>{
    // check body
    res.send(DBPlaceholder.addOne('users', req.body));
})

app.put('/posts/:id', (req, res)=>{
    // check body
    // res.status(400).send("bad request")
    const {error} = Check.checkPosts(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }

    if(!DBPlaceholder.foundOne('posts', req.params.id)){
        return res.status(404).send("Not Found")
    }
    if(DBPlaceholder.updateOne('posts', req.body)){
        return res.send("Added successfully");
    }
    return res.status().send()
})

app.delete('/posts/:id', (req, res)=>{
    const post = DBPlaceholder.getOne('posts', req.params.id)
    if (!post) return res.status(404).send("Not Found")
    DBPlaceholder.deleteOne('posts', req.params.id);
    res.send(post);
})

app.listen(3000, () => console.log('Listening on port 3000...'));