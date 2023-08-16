const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user')
const Review = require('../models/review');
const { isLoggedIn } = require('../middleware');


// Display all the products
router.get('/success', isLoggedIn, async(req, res) => {
    
    try {
        const users=await User.find({});
        const products=await Product.find({});
        res.render('products/success',{users,products}); 
    } catch (e) {
        console.log("Something Went Wrong");
        req.flash('error', 'Cannot Find Users');
        res.render('error');
    }
})
module.exports = router;