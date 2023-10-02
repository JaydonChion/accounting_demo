$(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('promo');
  if(param !== null && param.length > 0){
       $("#redeemCashVoucher #voucherCodeDiv").hide();
       $("#redeemCashVoucher #promoApplied").text("Voucher code <".concat(param ,"> is applied successfully"))
       $("#redeemCashVoucher #promoApplied").show();
       $("#redeemCashVoucher input#voucherCode").val(param);
       $("#redeemCashVoucher input#voucherCode").attr('readonly', true);
    
      //scroll to contact form
      // $('html, body').animate({
      //   scrollTop: $("#redeemCashVoucher").offset().top
      // },1000);
    
  }
});
