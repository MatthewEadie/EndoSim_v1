const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');


var serviceAccount = require("./serviceAccountKey.json");

initializeApp({
    credential: cert(serviceAccount)
});
  
const db = getFirestore();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api/GetAll",async (req,res) => {

    const projectRef = db.collection('projects');
    const snapshot = await projectRef.get();

    const dataList = new Array();
    snapshot.forEach(doc => {
        dataList.push(doc.data())
    });

    return res.json({
        sucess:true,
        content:{
            data:dataList
        }
    })
})

app.get("/api/GetById/:id",async (req,res) => {
    
    const projectId = req.params.id;

    // access database and retrieve document based on ID
    const datasetRef = db.collection('datasets');
    const snapshot = await datasetRef.where("projectId", "==",projectId).get();

    const dataList = new Array();
    snapshot.forEach(doc => {
        dataList.push(doc.data())
    });

    return res.json({
        sucess:true,
        content:{
            data:dataList
        }
    })
})


app.post("/api/Search",async (req,res) => {
    const searchArgs = req.body;

    // parse search arguments into firebase query rules

    let projectRef = db.collection('projects');

    if(searchArgs?.name){
        projectRef = projectRef.where('name', '>=', searchArgs?.name).where('name', '<=', searchArgs?.name + '~');
    }
    const snapshot = await projectRef.get();

    const dataList = new Array();
    snapshot.forEach(doc => {
        dataList.push(doc.data())
    });

    return res.json({
        sucess:true,
        content:{
            data:dataList
        }
    })
})

app.listen(3030,() => {console.log("api available on port 3030")})