import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    razorpay_order_id:{
        type:String,
        // required:true,
    } , 
    razorpay_payment_id:{
        type:String,
        // required:true,
    } ,
    razorpay_signature:{
        type:String,
        // required:true,
    } ,
    name : {
        type:String,
        // required : true,
    },
    password : {
        type :String,
        // required:true,
    },
    email : {
        type:String,
        // required : true,
    },
});

export const  User = mongoose.model("User" , UserSchema);