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

    let userID = $('h1').attr("data-user-id")
    getPlannedGames(userID);
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

function getPlannedGames(userID){

  $.get(`/users/${userID}/games.json`, function(games){
    console.log(games)
    $('table-header').text("My Planned Games")
  })

};
