const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user')
const Review = require('../models/review');
const { isLoggedIn } = require('../middleware');


// Display all the products
router.get('/delete', isLoggedIn, async(req, res) => {
    
    try {
        const users=await User.find({});
        res.render('products/delete',{users}); 
    } catch (e) {
        console.log("Something Went Wrong");
        req.flash('error', 'Cannot Find Users');
        res.render('error');
    }
})
module.exports = router;