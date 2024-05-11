const express = require('express');
const router = express.Router();
const Form = require('d://portfolio//NEW/contact-page-rozgaar/src/Form/form.js');

router.get('/' , (req,res) => {
    return res.render(Form);
});



router.get('/signup' , (req,res) => {
    return res.render("signup");
});

router.get('/login' , (req,res) => {
    return res.render("login");
});


module.exports = router;