$(document).ready(function(){
  responsive_nav();
  bindUserPageLinks();
});

function responsive_nav(){
  $('.handle').on('click', function(){
    $('nav ul').toggleClass('showing');
  });
};

function bindUserPageLinks(){
  $('#planned-games').on('click', function(event){
    event.preventDefault();
    alert("planned games");
  })

  $('#joined-games').on('click', function(event){
    event.preventDefault();
    alert("joined games");
  })

  $('#plan-game').on('click', function(event){
    event.preventDefault();
    console.log('yoooooo')
  })
};
