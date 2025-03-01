const express = require ('express')
    const port = 8001; 
    const server = express();
    const path = require('path')
    
    server.set("view engine",'ejs');
    server.use(express.urlencoded())

let studentData =[
    {
        id:"1",
        name:"punam",
        email:"punam@test.in",
        phone:"2170732382"
    },
    {
        id:"2",
        name:"yesha",
        email:"yesha@test.in",
        phone:"13198357965"
    },
    {
        id:"3",
        name:"urvisha",
        email:"urvisha@test.in",
        phone:"2810754823"
    }
]
server.get("/",(req , res) => {
    res.render('index',{studentData});
})

server.post("/add-student", (req , res) => {
    studentData.push(req.body);
    return res.redirect("/");
})
server.get("/delet/:id", (req, res) => {
    let id = req.params.id;
    let updatedData = studentData.filter(student => student.id !== id);
    studentData = updatedData;
    return res.redirect("/");
});
server.get("/edit/:id",(req , res) => {
    let id = req.params.id;
    let record = studentData.filter(student => student.id == id)
    return res.render('edit', {student : record})
})

server.post("/edit-student/:id", (req , res) => {
    let id = req.params.id;
    let updatedata = studentData.map(student => {
        if(student.id == id){
            return {...req.body , id : id}
        }else{
            return student;
        }
    });

    studentData = updatedata;
    return res.redirect("/")
})
server.listen(port , () => {
    console.log('server start at http://localhost:8001');
})
 
