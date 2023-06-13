const express = require("express");
app = express();
const hostname = "jsonplaceholder.typicode.com";
import DBPlaceholder from "./DBPlaceholder";
import Check from "./Check"

app.get('/:collection', (req, res) => {
    const collection = req.params.collection;
    res.send(DBPlaceholder.get(collection));
});

app.get('/:collection/:id', (req, res)=>{
    const jsonObject = DBPlaceholder.getOne(collection, req.params.id)
    if (!jsonObject) return res.status(404).send("Not Found")
    res.send(jsonObject);
})

app.post('/:collection', (req, res)=>{
    // res.status(400).send("bad request")
    const {error} = Check.check(collection, req.body);    // check body - how?
    if (error){
        return res.status(400).send(error.details[0].message);
    }

    res.send(DBPlaceholder.post(collection, req.body));
})

app.put('/:collection/:id', (req, res)=>{
    // check body
    // res.status(400).send("bad request")
    const {error} = Check.check(collection, req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }

    if(!DBPlaceholder.get(collection, req.params.id)){
        return res.status(404).send("Not Found")
    }
    if(DBPlaceholder.put(collection, req.body)){
        return res.send("Added successfully");
    }
    return res.status().send() //??
})

app.delete('/:collection/:id', (req, res)=>{
    const flage = DBPlaceholder.delete(collection, req.params.id)
    if (!flage) return res.status(404).send("Not Found")
    res.send("Delete");
})