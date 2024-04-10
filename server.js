var express = require('express');
var app = express();
let projectCollection;

app.use(express.static(__dirname + '/')); //root of the project
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Zeba:zYvsec-5cobjy-magqej@zeba.c9uuklt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
function connect() {
    client.connect(err => {

        if (err) console.log(err);
        else {
            projectCollection = client.db("Test").collection("Cat");
        };
    });
}

const insertProjects = (project, callback) => {
    projectCollection.insertOne(project, callback);
};

const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
};

app.post('/api/projects', (req, res) => {
    let newProject = req.body;
    insertProjects(newProject, (error, result) => {
        if (error) {
            console.log(error);
            res.json({ statusCode: 400, message: error });
        } else {
            res.json({ statusCode: 200, data: result, message: 'successfully added' });
        }
    });
});

app.listen(3000, ()=>{
    console.log('test');
    connect ();
});