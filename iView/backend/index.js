import express from "express"

const app=express();

const port=5000;


let users= [
    {
        id:1,
        name:"emre",
        lastname:"hasilik",
        contanct:"2323",
    },
    {
        id:2,
        name:"gizem",
        lastname:"hasilik",
        contanct:"2323",
    },
    {
        id:3,
        name:"erol",
        lastname:"hasilik",
        contanct:"2323",
    },
    {
        id:4,
        name:"eda",
        lastname:"hasilik",
        contanct:"2323",
    }
]
app.get("/users", (req,res)=>{
    res.send(users);

})

app.get("/usrs/:id", (req,res)=>{
    const id=req.params.id;
 res.send("run");
})
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})


