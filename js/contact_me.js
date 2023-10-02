$(function() {

    $("#contact input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            $("#contact #contactButton").html('Sending...');
            $("#contact #contactButton").prop('disabled', true);
            // get values from FORM
            var name = $("#contact input#name").val();
            var email = $("#contact input#email").val();
            var company = $("#contact input#companyName").val();
            var phone = $("#contact input#phone").val();
            var message = $("#contact textarea#message").val();
            var promocode = $("#contact input#promocode").val();
            
            if (company === null) {
                company = "";
            }

            if (promocode === null) {
                promocode = "";
            }
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            let data = {
                name: name,
                company: company,
                phone: phone,
                email: email,
                message: message,
                promocode: promocode
            };
            try {
                fetch("https://script.google.com/macros/s/AKfycbzObKbBCqqNz7QF7zZZXIY-yuBETa_Z4jtJMIbm43Js0_3Jjf4ofH39p1ToMqI9C1Ck/exec", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    redirect: "follow",
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    }
                }).then(res => {
                    if (!res.ok) {
                        // Fail message
                        $('#contact #success').html("<div class='alert alert-danger'>");
                        $('#contact #success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#contact #success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                        $('#contact #success > .alert-danger').append('</div>');
                        //clear all fields
                        //$('#contactForm').trigger("reset");
                        window.gtag('event', 'form_submission_fail');
                    }
                    else{
                        // Success message
                        $('#contact #success').html("<div class='alert alert-success'>");
                        $('#contact #success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#contact #success > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                        $('#contact #success > .alert-success')
                            .append('</div>');
    
                        //clear all fields
                        //$('#contactForm').trigger("reset");
                        window.gtag('event', 'form_submission_success');
                    }
    
                    // $("#contactButton").html('Send Message');
                    // $("#contactButton").prop('disabled', false);
    
                }).catch((error) => {
                    window.gtag('event', 'form_submission_error');
                }).finally(
                    () => {
                        $('#contact #contactForm').trigger("reset");
                        $("#contact #contactButton").html('Send Message');
                        $("#contact #contactButton").prop('disabled', false);
                    }
                );
            } catch (error) {
                window.gtag('event', 'form_submission_error');
                $('#contact #contactForm').trigger("reset");
                $("#contact #contactButton").html('Send Message');
                $("#contact #contactButton").prop('disabled', false);
            }
            
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#contact #name').focus(function() {
    $('#contact #success').html('');
});
