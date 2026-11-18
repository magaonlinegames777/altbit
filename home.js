$(document).ready(function() {

});

function calcus(){
    $(".btcCalcus").removeClass('hide');

      // Toggle visibility
  $("#calculatorr").on("click", function(e) {
    e.stopPropagation();
    // $(".btcCalcus").removeClass('hide');
    $(".btcCalcus").css('display', 'flex');
    $("body").addClass('no-scroll');
  });

  // Hide when clicking outside
  $(document).on("click", function(e) {
    if (!$(e.target).closest("#btcholdr, #calculator").length) {
        // $(".btcCalcus").addClass('hide');
        $(".btcCalcus").css('display', 'none');
        $("body").removeClass('no-scroll');

        $('#calculator').get(0).scrollIntoView({ behavior: 'smooth' });

    }
  });
  

}