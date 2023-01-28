const express=require('express');
const cors=require('cors');
const path = require('path');
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const Employeedata=require('./model/EmployeeData');
app.use(express.static(path.join(__dirname,'/build')));

app.get('/api/employeelist',function(req,res){
Employeedata.find()
.then(function(data){
    res.send(data);
})
})
app.get('/api/employeelist/:id',function(req,res){
    Employeedata.findOne({"_id":req.params.id})
    .then(function(data){
        res.send(data);
    })
    })
app.post('/api/employeelist',function(req,res){
    var newdata={
        name:req.body.name,
        position:req.body.position,
        location:req.body.location,
        salary:req.body.salary
    }
    var Employee=Employeedata(newdata);
    Employee.save();

    Employeedata.find()
.then(function(data){
    res.send(data);
})
})
app.put('/api/employeelist',(req,res)=>{
    var item={
        name:req.body.name,
        location:req.body.location,
        salary:req.body.salary,
        position:req.body.position
    }
    Employeedata.findByIdAndUpdate({"_id":req.body._id},{$set:item

    }).then(()=>{ res.send()});
   
})
app.delete('/api/employeelist/:id',(req,res)=>{
let id=req.params.id;
Employeedata.findByIdAndDelete({"_id":id}).then(()=>{
    res.send();
})
})
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
});

app.listen(8000);