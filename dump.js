 $.ajax({
              url:'http://localhost:3000/api/admin_login',
              method: 'POST',
              contentType: 'application/json',
              data:JSON.stringify({
                     usersername:username,
                     password:password
              }),
              success:function(data){
                if(data.status==200){
                   window.location.href='/admin-home';
                }else{
                    $('#msg').html(`<p class='alert alert-danger' style'text-align:center'>${data.error}</p>`);
                }
              }
          })




          exports.event_program = async(req,res)=>{
                   const locals={
                  title:"Programs"
              }
              try{
                     const getPrograms = await Events_model.find();
                    res.render('pages/program',{locals,getPrograms});
              }catch(err){
                   console.error(err.messsage)
              }
             
          
          }
          
           <% getPrograms.forEach(function(programs) { %>
                          
                        <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-cases mb-40">
                            <div class="cases-img">
                                <img src="uploads/<%= programs.filename %>" alt="" style="height:250px;">
                            </div>
                            <div class="cases-caption">
                                <h3><a href="#"><%= programs.heading %></a></h3>
                                <!-- Progress Bar -->
                                <div class="single-skill mb-15">
                                    <div class="bar-progress">
                                        <div id="bar1" class="barfiller">
                                            <div class="tipWrap">
                                                <span class="tip"></span>
                                            </div>
                                            <span class="fill" data-percentage="70"></span>
                                        </div>
                                    </div>
                                </div>
                                <!-- / progress -->
                                <div class="prices d-flex justify-content-between">
                                   <!-- <a href="/programs" class="alert alert-success" style="color:white;background-color: rgb(116, 242, 116); border:none">View More</a>-->
                                    <p>Uploaded by:<span> Admin</span></p>
                                </div>
                                
                            </div>

                            
                        </div>
                    </div>

                     <% } )%>