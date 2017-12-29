$(document).on("turbolinks:load",function(){
  $('.handle').on('click', function(){
    $('nav ul').toggleClass('showing');
  });
});
