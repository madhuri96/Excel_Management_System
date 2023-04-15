var mongoose=require("mongoose");

// Creating EmployeeSchema 
var employeeSchema= new mongoose.Schema({
   name:String,
   designation:String,
   email:String,
   location:String
});

//Exporting Employee Schema
module.exports= mongoose.model("Employee", employeeSchema);