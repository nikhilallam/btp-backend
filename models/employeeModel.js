import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
    } , 
    email:{
        type:String,
        required:true,
    } ,
    password:{
        type:String,
        // required:true,
    } ,
    trade : {
        type:String,
        // required : true,
    },
    date : {
        type :String,
        // required:true,
    },
    rating : {
        type:String,
        // required : true,
    },
    age: {
        type: Number
    },
    location: {
        type: String
    },
    industry: {
        type: String
    },
    phoneNumber: {
        type: String
    }
});

export const  Employee = mongoose.model("Employee" , EmployeeSchema);