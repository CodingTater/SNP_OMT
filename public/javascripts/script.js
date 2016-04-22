(function() {
  $(document).ready(function(){
    $('.menuSelect').on('click', function() {
      $('.menu').css('background-color', 'white');
      $('.patientFields').css('display', 'none');

      $(this).css('background-color', '#D6D6D6');
      $('.' + $(this).attr('id')).css('display', 'inline');
    });

    $('#continue-perInfo').on('click', function() {
      $('#personInfo').css('background-color', 'white');
      $('.personInfo').css('display', 'none');

      $('#planType').css('background-color', '#D6D6D6');
      $('.planType').css('display', 'inline');
    });

    $('#continue-planInfo').on('click', function() {
      $('#planType').css('background-color', 'white');
      $('.planType').css('display', 'none');

      $('#healthIssues').css('background-color', '#D6D6D6');
      $('.healthIssues').css('display', 'inline');
    });

    $('#continue-hInfo').on('click', function() {
      $('#healthIssues').css('background-color', 'white');
      $('.healthIssues').css('display', 'none');

      $('#measures').css('background-color', '#D6D6D6');
      $('.measures').css('display', 'block');
    });

    $('#continue-measures').on('click', function() {
      $('#measures').css('background-color', 'white');
      $('.measures').css('display', 'none');

      $('#measures2').css('background-color', '#D6D6D6');
      $('.measures2').css('display', 'block');
    });
  });
})();
