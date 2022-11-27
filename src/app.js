const express = require('express');
const path = require('path');
require('./database/conn.js');
const User = require('./models/usermessage.js');

const hbs = require('hbs');
const app = express();
// port to assign the port to make things workable having no error in running process
const port = process.env.PORT || 3000;
// path setting
const staticpath = path.join(__dirname , '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// middle
app.use('/css',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/js')));
app.use('/jq',express.static(path.join(__dirname,'../node_modules/jquery/dist')));
app.use(express.static(staticpath));
app.set("view engine" , "hbs");
app.set('views' , templatesPath);
hbs.registerPartials(partialsPath);
app.use(express.urlencoded({extended:false}))

// app.get('/',(req , res)=>{
//     res.render('index');
// })




// app.get('/about-detail',(req , res)=>{
//     res.render('about-detail');
// })

app.post('/contact' , async(req , res)=>{
    try{
        // res.send(req.body)
        const UserData = new User(req.body);
       await UserData.save();
       res.status(201).render('index');
    } catch(error)
    {
        res.status(500).send(error);
    }
});

app.listen(port , () => {
    console.log(`server is running at port : ${port}`);
});