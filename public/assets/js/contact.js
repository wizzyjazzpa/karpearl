$(document).ready(function(){
    
    (function($) {
        "use strict";

    
    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value)
    }, "type the correct answer -_-");

    // validate contactForm form
    $(function() {
        $('#contactForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                subject: {
                    required: true,
                    minlength: 4
                },
                number: {
                    required: true,
                    minlength: 5
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 20
                }
            },
            messages: {
                name: {
                    required: "come on, you have a name, don't you?",
                    minlength: "your name must consist of at least 2 characters"
                },
                subject: {
                    required: "come on, you have a subject, don't you?",
                    minlength: "your subject must consist of at least 4 characters"
                },
                number: {
                    required: "come on, you have a number, don't you?",
                    minlength: "your Number must consist of at least 5 characters"
                },
                email: {
                    required: "no email, no message"
                },
                message: {
                    required: "um...yea, you have to write something to send this form.",
                    minlength: "thats all? really?"
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"contact_process.php",
                    success: function() {
                        $('#contactForm :input').attr('disabled', 'disabled');
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor','default');
                            $('#success').fadeIn()
                            $('.modal').modal('hide');
		                	$('#success').modal('show');
                        })
                    },
                    error: function() {
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $('#error').fadeIn()
                            $('.modal').modal('hide');
		                	$('#error').modal('show');
                        })
                    }
                })
            }
        })
    })
        
 })(jQuery)

 $('#contactForm').on('submit',function(e){
     e.preventDefault(e);
     let message =$('#message').val();
     let email =$('#email').val();
     let subject = $('#subject').val();
     $.ajax({
            url: '/api/contact', // same origin
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({message,email,subject }),
            success: function(response) {
                if(response.status==200){
                    $('#msg').html(`<p class='alert alert-success' >${response.data}</p>`);
                   $('#msg').fadeOut(10000);
                    // console.log('Login successful:', response.token);
                }else if(response.status==201){
                     $('#msg').html(`<p class='alert alert-success' >${response.data}</p>`);
                  // $('#msg').fadeOut(10000);
                }
                else{
                     $('#smsg').html(`<p class='alert alert-danger'>${response.data}</p>`);
                   $('#smsg').fadeOut(10000);
                }
        
            // redirect or show message
            },
            error: function(xhr) {
                $('#msg').html(`<p class='alert alert-danger' style='color:white'>failed to save</p>`);
               $('#msg').fadeOut(2000);
            console.error('Login failed:', xhr.status, xhr.responseText);
            }
        });

 })
})