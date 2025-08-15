const express = require ('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./server/config/db');
const cors = require('cors');
require('dotenv').config();


 const app = express();
 const port = process.env.PORT;
 //connect to databae
 connectDB();

 app.use(cookieParser());
 app.use(express.urlencoded({extended:true}));
 app.use(express.json());


 app.use(express.static('public'));
 app.set('view engine','ejs');

 

 app.use('/',require('./server/routes/route_pages'));
 app.use('/api',require('./server/routes/api_routes'));

 app.listen(port,()=>{
     console.log(`app listening to http://localhost:${port}`);
 })

