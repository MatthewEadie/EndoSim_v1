const express = require("express");
const app = express();


app.get("/api/GetAll",async (req,res) => {
    return res.json({
        sucess:true,
        data:{
            // put some data here to return
        }
    })
})

app.get("/api/GetById/:id",async (req,res) => {
    const requestId = req.params.id;

    // access database and retrieve document based on ID

    return res.json({
        sucess:true,
        data:{
            // return data requested from database
        }
    })
})


app.post("/api/Search",async (req,res) => {
    const searchArgs = req.body;

    // parse search arguments into firebase query rules

    return res.json({
        sucess:true,
        data:{
            // return data requested from database
        }
    })
})

app.listen(3030,() => {console.log("api available on port 3030")})