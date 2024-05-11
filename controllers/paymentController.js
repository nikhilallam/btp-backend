import { instance } from "../server.js"
import crypto from 'crypto';
import { User } from "../models/paymentModel.js";

export const checkout = async (req,res) =>{
    console.log(req)
    console.log("done")
    const options = {
        amount:Number(req.body.amount*100),
        currency:"INR",
    };
    const order = await instance.orders.create(options);

    // console.log(order);
    res.status(200).json({
        success:true,
        order,
    });
};

export const paymentVerification = async (req,res) =>{
    console.log("helo")
    const {razorpay_order_id , razorpay_payment_id ,razorpay_signature} = req.body;
    console.log(req.body);
    
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256' , process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

    const response = {"signatureIsValid":"false"}

    const isAuthetic = expectedSignature === razorpay_signature;

    if(isAuthetic){
        //databse comes here
        await User.create({
            razorpay_order_id ,
             razorpay_payment_id ,
             razorpay_signature ,
             password ,  //req
             email ,
        })

        res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
        return ;
    }
    else{

        res.status(400).json({
            success:false,
        });

        return ;

    }

    

    // console.log(order);
    res.status(200).json({
        success:true,
        // order,
    });
};