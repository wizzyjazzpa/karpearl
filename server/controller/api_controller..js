const Admin_model = require('../models/admin_login');
const Volunteer_model = require('../models/volunteer');
const Newsletter_model = require('../models/newsletter_model');
const number_model = require('../models/numbers');
const contact_model = require('../models/contact');
const donation_model = require('../models/donation');
const Event_model = require('../models/events');
const Team_model = require('../models/team');
const upcoming_model = require('../models/upcoming_events');
const jwt = require('jsonwebtoken');
const { get } = require('mongoose');
require('dotenv');


exports.volunteer = async(req,res)=>{
    const {available,first_name,last_name,address,city,country,phone_number,email_address}=req.body;
    try{
         const save_volunteer = await Volunteer_model.create({
        available:available,
        first_name:first_name,
        last_name:last_name,
        address:address,
        city:city,
        country:country,
        phone_number:phone_number,
        email_address:email_address
    });
    if(save_volunteer){
       return res.json({message:"Volunteer Saved",status:200})
    }else{
        return res.json({error:"failed to save volunteer"})
    }
    }catch(err){
        return res.json({error:err.message});
    }
  
}
exports.newsletter = async(req,res)=>{
    const getemail = req.body.getemail;
    try{
          const check_email = await Newsletter_model.find({email:getemail},{email:1});
          if(check_email.email==getemail){
             return res.json({data:"Thanks, you are already subscribed"},status=201);
          }else{
                const save_email = await Newsletter_model.create({email:getemail});
      
               if(save_email){
                  return res.json({data:"Thank you for Subscribing to Our Newsletter",status:200});

               }else{
                 return res.json({data:"Subscription Failed"});
               }
          }
    }catch(err){

        res.status(400).json({error:err.message});
    }
   
}
exports.post_numbers = async(req,res)=>{
      const {volunteer,treatment,donations} = req.body;
       try{  
                const check_data = await number_model.find();
                 if(check_data){
                     res.json({data:"data exists please click  the <a href='/update_number'>edit</a> button to update data",status:201});
                 }else{
                        const save_data = await number_model.create({volunteers:volunteer,treated:treatment,donations:donations})
                        if(save_data){
                        console.log(save_data)
                        res.json({data:"records saved",status:200})
                        }else{
                            return  res.json({data:"database error, please contact developer"});
                        }
                 }

       }catch(err){
          console.log(err.message)
       }
      
    
}

exports.contact = async(req,res)=>{
    const {message,email,subject}=req.body
    try{
          const save_contact = await contact_model.create({message:message,email_address:email,subject:subject});
          if(save_contact){
             console.log(save_contact);
                res.json({data:"Thanks for reaching out to us",status:200});
          }else{
                    res.json({error:"We are unable to save your contact please try again",status:403});
          }
    }catch(err){
          console.log(err.message)
    }
        console.log(req.body) 
}
exports.donation = async(req,res)=>{
      const {name,address,city,country,phone_number,email_address,amount}=req.body 
      try{
           const save_donations= await donation_model.create({
            name:name,
            address:address,
            city:city,
            country:country,
            phone_number:phone_number,
            email_address:email_address,
            amount:amount
        });
        if(save_donations){
            res.json({data:"Donation record saved",status:200});
        }else{
                res.json({data:"Donation record not saved",status:403});
        }
      }catch(err){
        console.log(err.message);
      }
}


exports.getImages = async(req,res)=>{
    try{
              const perpage = 4;
              const page = parseInt(req.query.page)|| 1;
              const skip = (page - 1 ) * perpage
              const totalItem = await Event_model.countDocuments();
              const totalPages = Math.ceil(totalItem / perpage);
              const items = await Event_model.find()
              .skip(skip)
              .limit(perpage)
               res.json({items,currentPage:page,totalPages})
        }catch(err){
             console.error(err.messsage)
        }
}

exports.getupComing = async(req,res)=>{
    try{
              const perpage = 4;
              const page = parseInt(req.query.page)|| 1;
              const skip = (page - 1 ) * perpage
              const totalItem = await upcoming_model.countDocuments();
              const totalPages = Math.ceil(totalItem / perpage);
              const items = await upcoming_model.find()
              .skip(skip)
              .limit(perpage)
               res.json({items,currentPage:page,totalPages})
        }catch(err){
             console.error(err.messsage)
        }
}

//admin END 

exports.register_admin = async(req,res)=>{
      const  username = req.body.username;
    const password = req.body.password;
    if(username=="" && password == ""){
           res.status(400).json({error:"Username and password must filled"})
    }else{
         try{
               const reg = await Admin_model.create({username:username,password:password});
               if(reg){
                   res.status(200).json({message:"admin has been uploaded successfully"});
               }else{
                    res.status(400).json({error:"unable to register admin"})
               }


         }catch(err){
            res.status(400).json({error:err.message})
         }
    }
}
exports.login = async(req,res)=>{

    const  username = req.body.username;
    const password = req.body.password;
    if(username=="" && password == ""){
           res.status(400).json({error:"Username and password must filled"})
    }else{
         try{
              const get_admin = await Admin_model.findOne({username:username,password:password});
              if(!get_admin){
                 return res.status(403).json({error:"user not found" });
              }else{
                 const token = jwt.sign({id:get_admin._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"});
                 res.cookie("jwt",token,{httpOnly:true,maxAge:36000000});
                 return res.json({token:token,status:200})

              }

         }catch(err){
            res.status(400).json({error:err.message})
         }
    }
   
    
}

exports.eventUplaod = async(req,res)=>{
    
   const { heading } = req.body;
   const fileName = req.file.filename;
    try{
          const save_event = await Event_model.create({heading:heading,filename:fileName});
          if(save_event){
                res.json({message:"Event has been saved"});
          }else{
              res.json({message:"failed"});
          }
    }catch(err){
        console.error(err.message);
    }


}
exports.teamUpload = async(req,res)=>{
   const { heading } = req.body;
   const fileName = req.file.filename;
    try{
          const save_event = await Team_model.create({heading:heading,filename:fileName});
          if(save_event){
                res.json({message:"Team has been saved"});
          }else{
              res.json({message:"failed"});
          }
    }catch(err){
        console.error(err.message);
    }
}
 exports.upcoming_events = async(req,res)=>{
       const{uptime,update}=req.body
       const upcoming_heading = req.body.upcoming_heading
        const fileName = req.file.filename;
    try{
        console.log(req.body.up_heading)
          const save_event = await upcoming_model.create({heading:upcoming_heading,uptime:uptime,update,filename:fileName});
          if(save_event){
                res.json({message:"Upcoming has been saved"});
          }else{
              res.json({message:"failed"});
          }
    }catch(err){
        console.error(err.message);
    }
 }

