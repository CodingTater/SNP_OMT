(function() {
  $(document).ready(function(){
    $('.menuSelect').on('click', function() {
      $('.menu').css('background-color', 'white');
      $('.patientFields').css('display', 'none');

      $(this).css('background-color', '#D6D6D6');
      $('.' + $(this).attr('id')).css('display', 'flex');
    });

    $('#continue-perInfo').on('click', function() {
      $('#personInfo').css('background-color', 'white');
      $('.personInfo').css('display', 'none');

      $('#planType').css('background-color', '#D6D6D6');
      $('.planType').css('display', 'flex');
    });

    $('#continue-planInfo').on('click', function() {
      $('#planType').css('background-color', 'white');
      $('.planType').css('display', 'none');

      $('#healthIssues').css('background-color', '#D6D6D6');
      $('.healthIssues').css('display', 'flex');
    });

    $('#continue-hInfo').on('click', function() {
      $('#healthIssues').css('background-color', 'white');
      $('.healthIssues').css('display', 'none');
    });
  });
})();
