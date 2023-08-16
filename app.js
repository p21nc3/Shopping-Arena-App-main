const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const seedDB = require('./seed');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const port = process.env.PORT || 5500;


const DB = 'mongodb+srv://Sanchit:sanchitcode@cluster0.x4rvz.mongodb.net/e-commerce?retryWrites=true&w=majority'
mongoose.connect(DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
}).then(()=>{
    console.log('Database connected');
}).catch((err)=> console.log('No connection'));

// Routes
const deleteRoutes = require('./routes/delete');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const reportRoutes = require('./routes/report');
const successRoutes = require('./routes/success');
// mongoose.connect('mongodb://localhost:27017/shopApp',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify:false,
//         useCreateIndex:true
//     })
//     .then(() => {
//         console.log("DB Connected");
//     })
//     .catch((err) => {
//         console.log("OH NO ERROR!!!");
//         console.log(err);
//     });


// seedDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const sessionConfig = {
    secret: 'weneedsomebettersecret',
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionConfig));
app.use(flash());

// Initilising the passport and sessions for storing the users info
app.use(passport.initialize());
app.use(passport.session());

// configuring the passport to use local strategy
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})


app.get('/', (req, res) => {
    res.render("home");
    res.send("LANDING PAGE");

})

app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(deleteRoutes);
app.use(reportRoutes);
app.use(successRoutes);
app.listen(port, () => {
    console.log(`Server Started AT PORT ${port}`);
})
