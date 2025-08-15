 const Admin_model = require('../models/admin_login');
 const Events_model =require('../models/events');
 const upcoming_model = require('../models/upcoming_events');
 const numbersinfo = require('../models/numbers');

exports.home= async(req,res)=>{
    const locals={
        title:"Home"
    }
    try{
           const getPrograms = await Events_model.find();
           const upcoming_events = await upcoming_model.find();
           const getnumInfo = await numbersinfo.find();
           console.log(getnumInfo)
          res.render('pages/index',{locals,getPrograms,upcoming_events,getnumInfo});
    }catch(err){
         console.error(err.messsage)
    }
  
}

exports.about = async(req,res)=>{
     const locals={
        title:"About-Us"
    }
    try{
            const getnumInfo = await numbersinfo.find();
            res.render('pages/about',{locals,getnumInfo});
    }catch(err){
        console.error(err.message);
    }
}
exports.contact = async(req,res)=>{
    const locals={
        title:"Contact-Us"
    }
    res.render('pages/contact',{locals});
}
exports.volunteer = async(req,res)=>{
    const locals={
        title:"Volunteer"
    }
    res.render('pages/volunteer',{locals});
}
exports.donation = async(req,res)=>{

     const locals={
        title:"Donation"
    }
    res.render('pages/donation',{locals});

}

exports.event_program = async(req,res)=>{
     const locals={
        title:"Programs"
    }
     res.render('pages/program', {  locals });
   

}
exports.upcoming_events =  async(req,res)=>{
     const locals={
        title:"Upcoming Events"
    }
     res.render('pages/upcomingEvents', {  locals });
   
}
//Admin End //

exports.Admin_home = async(req,res)=>{
     const locals={
        title:"Admin"
    }
     const getID = req.admin.id;
     const getAdmin = await Admin_model.findOne({_id:getID},{username:1})
    res.render('admin/index',{locals,getAdmin});
}
exports.Admin_login = async(req,res)=>{
     const locals={
        title:"Admin-Login"
    }
    res.render('admin/sign-in',{locals});
}
exports.Admin_logout = async(req,res)=>{
     res.clearCookie("jwt");
    res.redirect('/login');
}