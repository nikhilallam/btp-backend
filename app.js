import express from 'express';
import {config} from "dotenv"
import paymentRoute from "./routes/paymentRoutes.js";
import cors from 'cors';
config({path:"./config/config.env"});
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcrypt';
const proof = multer({dest:'uploads/'});
const upload = multer();
// const bodyParser = require("body-parser")
import bodyParser from 'body-parser';
import {User} from './models/paymentModel.js';
import { Employee } from './models/employeeModel.js';
import { Company } from './models/CompanyModel.js';
export const app = express()
const jsonParser = bodyParser.json();

// app.post('/employeeregistration' , jsonParser , (req,res) => {
//     if(User.includes(req.body.input)){
//         console.log("Item already exists!");
//     } else {
//         User.push(req.body.input);
//         console.log("Item added");
//         console.log(items);
//     }
// });

// app.use(bodyParser.urlencoded({ extended: false })); 
// app.use(bodyParser.json());



app.use(cors({
    origin: "*",
    credentials:true,
    optionSuccessStatus:200,
})); // react js project connect to 4000 port
app.use(express.json()); // repsonse will pass through json
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.post("/register" , async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        // Send success response
        res.send("success");
    } catch (error) {
        console.error(error);
        // Send error response
        res.status(500).send("An error occurred during registration.");
    }
});


app.get('/' , (req, res) => {
    res.render("index.ejs");
})

//signup
app.post('/employeeregistration' , async (req,res) => {
    try {
    let check = await Employee.findOne({email:req.body.email});
    if(check) {
        return res.status(400).json({success:false , errors:'existing user is found with same email address'});
    }

    const user = new Employee({
        ...req.body
    })

    
    let chck = await user.save();
    
    const data = {
        user : {
            id : user.id
        }
    }
    
    const token = jwt.sign(data , 'secret_ecom');
    res.json({success : true , user });
} catch (error) {
    console.error('Error in employee registration:', error);
    res.status(500).json({ success: false, errors: 'Internal server error' });
}
})

app.post('/login' , async (req,res) => {
    console.log("Data -> ", req.body);
    try {
    let user = await Employee.findOne({email:req.body.email});
    if (user) {
        res.json({success : true , user });
    } else {
        return res.status(400).json({success:false , errors:'User doesnt exist'});
    }
} catch (error) {
    console.error('Error in login', error);
    res.status(500).json({ success: false, errors: 'Internal server error' });
}
})

app.post('/companyregistration' , async (req,res) => {
    try {
    let check = await Company.findOne({email:req.body.email});
    if(check) {
        return res.status(400).json({success:false , errors:'existing company is found with same email address'});
    }

    const company = new Company({
        ...req.body
    })

    
    let chck = await company.save();
    
    const data = {
        company : {
            id : company.id
        }
    }
    
    const token = jwt.sign(data , 'secret_ecom');
    res.json({success : true , company });
} catch (error) {
    console.error('Error in company registration:', error);
    res.status(500).json({ success: false, errors: 'Internal server error' });
}
})

app.post('/company-login' , async (req,res) => {
    console.log("Data -> ", req.body);
    try {
    let company = await Company.findOne({email:req.body.email});
    if (company) {
        res.json({success : true , company });
    } else {
        return res.status(400).json({success:false , errors:'company doesnt exist'});
    }
} catch (error) {
    console.error('Error in login', error);
    res.status(500).json({ success: false, errors: 'Internal server error' });
}
})

// app.get('/employeeregistration', (req,res) => {
//     res.render('Hleo');
// })


//login

// app.post('/' , async (req,res) => {
//     let user = await User.findOne({email:req.body.email});
//     if(user) {
//         const passCompare = req.body.password === user.password;
//         if(passCompare){
//             const data = {
//                 user : {
//                     id : user.id
//                 }
//             }
//             const token = jwt.sign(data , 'secret_ecom');
//             res.json({success:true , token});
//         }
//         else {
//             res.json({
//                 success:false , errors : "Wrong password"
//             });
//         }        
//     }
//     else {
//         res.json({success:false , errors : "wrong email id"});
//     }
    
// })

//end routes


app.use("/api",paymentRoute);

app.get("/api/getkey" , (req,res) =>
    res.status(200).json({key:process.env.RAZORPAY_API_KEY})
);


// routes - api creation
// app.get('/login' , (req,res) => {
//     res.render("login.ejs");
// })

// app.get('/home' , (req,res) => {
//     res.render("home.ejs");
// })

// app.get('/register' , (req,res) => {
//     res.render('register.ejs');
// })

// app.get('/dashboard' , (req,res) => {
//     res.render('dashboard.ejs');
// })

// const storage = multer.diskStorage({
//     destination:'./upload/images',
//     filename : (req , file, cb) => {
//         return cb(null , `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// });


// const upload = multer({storage : storage});

//creating upload endpoint images
// app.use('/images',express.static('upload/images'));
// app.post('/upload' ,  upload.single('user',(req,res) => {
//     res.json({
//         success:1,
//         image_url:`http://localhost:${4000}/images/${req.file.filename}`
//     })
// }))

// app.post('/adduser' , async (req,res) => {
//     const user = new Payment({
//         razorpay_order_id : req.body.razorpay_order_id,
//         razorpay_payment_id : req.body.razorpay_payment_id,
//         razorpay_signature : req.body.razorpay_signature,
//         name : req.body.name,
//         email : req.body.email,
//         phoneNumber : req.body.phoneNumber,
//         datefile : req.body.datefile,
//         trade : req.body.trade,
//         idproof : req.body.idproof,
//     }) 
//     console.log(user);
//     await user.save();
//     console.log("saved");
//     res.json({
//         success:true,
//         name : req.body.name,
//     })
// })

// 