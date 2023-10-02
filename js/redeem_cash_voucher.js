$(function() {
    $('#redeemCashVoucher #agree-checkbox').change(function() {
      if ($(this).is(':checked')) {
        $('#redeemCashVoucher #redeemVoucherButton').prop('disabled', false);
      } else {
        $('#redeemCashVoucher #redeemVoucherButton').prop('disabled', true);
      }
    });
  });

$(function() {
    $("#redeemCashVoucher input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
            $('#agree-checkbox').prop('checked', false);
            $('#redeemCashVoucher #redeemVoucherButton').prop('disabled', true);
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            $("#redeemCashVoucher #redeemVoucherButton").html('Sending...');
            $("#redeemCashVoucher #redeemVoucherButton").prop('disabled', true);
            // get values from FORM
            var name = $("#redeemCashVoucher input#name").val();
            var email = $("#redeemCashVoucher input#email").val();
            var company = $("#redeemCashVoucher input#companyName").val();
            var phone = $("#redeemCashVoucher input#phone").val();
            var message = $("#redeemCashVoucher textarea#message").val();
            var vouchercode = $("#redeemCashVoucher input#voucherCode").val();
            
            if (company === null) {
                company = "";
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
                vouchercode: vouchercode
            };
            try {
                fetch("https://script.google.com/macros/s/AKfycbxsawcVKoyAqRln6nQzz9Nwd3vW_6lp1kAnC2Fo2Ra9O4EKcQpB2UhhB4wD3f8B6Q/exec", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    redirect: "follow",
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    }
                }).then(res => {
                    if (!res.ok) {
                        // Fail message
                        $('#redeemCashVoucher #success').html("<div class='alert alert-danger'>");
                        $('#redeemCashVoucher #success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#redeemCashVoucher #success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                        $('#redeemCashVoucher #success > .alert-danger').append('</div>');
                        //clear all fields
                        //$('#redeemVoucherForm').trigger("reset");
                        window.gtag('event', 'redeem_voucher_submission_fail');
                    }
                    else{
                        // Success message
                        $('#redeemCashVoucher #success').html("<div class='alert alert-success'>");
                        $('#redeemCashVoucher #success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#redeemCashVoucher #success > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                        $('#redeemCashVoucher #success > .alert-success')
                            .append('</div>');
    
                        //clear all fields
                        //$('#redeemVoucherForm').trigger("reset");
                        window.gtag('event', 'redeem_voucher_submission_success');
                    }
    
                    // $("#redeemVoucherButton").html('Redeem Now');
                    // $("#redeemVoucherButton").prop('disabled', false);
    
                }).catch((error) => {
                    window.gtag('event', 'redeem_voucher_submission_error');
                }).finally(
                    () => {
                        $('#redeemCashVoucher #redeemVoucherForm').trigger("reset");
                        $("#redeemCashVoucher #redeemVoucherButton").html('Redeem Now');
                        $("#redeemCashVoucher #redeemVoucherButton").prop('disabled', true);
                        $("#redeemCashVoucher #promoApplied").hide();
                        $("#redeemCashVoucher input#voucherCode").val();
                        $("#redeemCashVoucher input#voucherCode").attr('readonly', false);
                        $("#redeemCashVoucher #voucherCodeDiv").show();
                    }
                );
            } catch (error) {
                window.gtag('event', 'redeem_voucher_submission_error');
                $('#redeemCashVoucher #redeemVoucherForm').trigger("reset");
                $("#redeemCashVoucher #redeemVoucherButton").html('Redeem Now');
                $("#redeemCashVoucher #redeemVoucherButton").prop('disabled', true);
                $("#redeemCashVoucher #promoApplied").hide();
                $("#redeemCashVoucher input#voucherCode").val();
                $("#redeemCashVoucher input#voucherCode").attr('readonly', false);
                $("#redeemCashVoucher #voucherCodeDiv").show();
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
$('#redeemCashVoucher #name').focus(function() {
    $('#redeemCashVoucher #success').html('');
});

const longText = document.querySelector(".long_paragraph");
const showMoreLink = document.querySelector("#show-more-link");

showMoreLink.addEventListener("click", () => {

    longText.style.maxHeight = "none";
    showMoreLink.textContent = "Read More";
    longText.classList.remove("fade_shadow");
    showMoreLink.style.display = "none";
  
});
