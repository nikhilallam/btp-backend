import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
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
    },
    trade : {
        type:String,
        // required : true,
    },
    timePeriod : {
        type :String,
        // required:true,
    },
    owner : {
        type:String,
        // required : true,
    },
    wages: {
        type: String
    },
});

export const  Company = mongoose.model("Company" , CompanySchema);