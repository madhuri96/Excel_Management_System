var express= require("express"),
    app = express(),
    bodyParser= require("body-parser"),
    mongoose=require("mongoose"),
    fileUpload= require("express-fileupload"),
    methodOverride= require("method-override");

// Employee Routes 
var employeeRoutes=require("./routes/employees");

// Connecting to the MongoDB database
mongoose.connect("mongodb://localhost/excel_db");
mongoose.Promise= global.Promise;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(fileUpload());

// using the Employee routes in app.js
app.use("/upload", employeeRoutes);

app.listen(process.env.PORT || 8000, process.env.IP, function(){
    console.log("Process Started!!");
});