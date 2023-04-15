var express= require("express");
var router= express.Router();
var Employee= require("../models/employee");
var mongoose=require("mongoose");
var csv= require("fast-csv");

//Index route: To show the home page to upload file
router.get("/", function(req, res){
   res.render("home"); 
});

//CREATE route - Route to create/add new Employee data to database
router.post("/", function(req, res){
    if (!req.files)
            return res.status(400).send('No files were uploaded.');
            var employeeFile = req.files.file;
     
        var employee = [];
        csv
         .fromString(employeeFile.data.toString(), {
             headers: true,
             ignoreEmpty: true
         })
         .on("data", function(data){
             data['_id'] = new mongoose.Types.ObjectId();
              
             employee.push(data);
         })
         .on("end", function(){
             Employee.create(employee, function(err, documents) {
                if (err) {throw err;}
                res.redirect("employee");
             });
        res.send(employee.length + ' employees have been successfully uploaded.');
    });
});

//Show route - shows/read all the records of Employees
router.get("/employee", function(req, res){
    Employee.find({},function(err, employees){
        if(err){
            throw err;
        } else {
            res.render("employee",{employees:employees});
        }
    });
});

// Edit route - To Edit a employee data
router.get("/employee/:id/edit", function(req, res) {
    Employee.findById(req.params.id, function(err, employee){
        if(err){
            throw err;
            res.redirect("/upload/employee");
        } else {
            res.render("edit",{employee:employee});
        }
    });
});

// Update Route - To Update Employee Data
router.put("/employee/:id", function(req, res){
    Employee.findByIdAndUpdate(req.params.id , req.body.employee ,function(err, updateData){
       if(err){
          throw err;
          res.redirect("/upload/employee");
       } else {
           res.redirect("/upload/employee");
       }
    });
});

//Delete Route -  Delete Employee Data, if not required
router.delete("/employee/:id", function(req, res){
   Employee.findByIdAndRemove(req.params.id, function(err){
     if(err){
         throw err;
         res.redirect("/upload/employee");
     }  else {
         res.redirect("/upload/employee");
     }
   });
});

//Exporting to the app.js
module.exports =router;
