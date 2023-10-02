$(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('promo');
  if(param !== null && param.length > 0){
       $("#contact #promoApplied").text("Promo code <".concat(param ,"> is applied successfully"))
       $("#contact #formSub").hide();
       $("#contact #promoApplied").show();
       $("#contact #promotandc").show();
       $("#promoInstruction").show();
       $("#contact input#promocode").val(param);
       $("#contact input#promocode").attr('readonly', true);
    
      $('html, body').animate({
        scrollTop: $("#contact").offset().top
      },1000);
    
  }
  // else
  // {
  //   $("#voucherPopup").css('display','flex')
  // }
});
