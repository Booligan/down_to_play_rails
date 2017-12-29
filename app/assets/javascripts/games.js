$(document).on("turbolinks:load",function(){
  attachGameListeners();
});

function attachGameListeners(){

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
    $('#table-header').append('My Planned Games')
    $('#table-columns').append(`<th>Title</th>
                                <th>Sport</th>
                                <th>Planner</th>
                                <th>Players needed</th>`)

    games.forEach(function(game){
      let maxPlayers = game.max_players
      let joinedPlayers = game.joined_players.length
      let playersNeeded = gameCountMessage(maxPlayers, joinedPlayers)
      $('table').append(`<tr>
                          <td><a href="/users/${userID}/games/${game.id}">${game.title}</a></td>
                          <td>${game.sport.name}</td>
                          <td><a href="/users/${userID}">${game.planner.email}</a></td>
                          ${playersNeeded}
                        </tr>`)
    })

  })

  function gameCountMessage(maxPlayers, joinedPlayers){
    let playersNeeded = maxPlayers - joinedPlayers
    let message = undefined

    switch(true){
      case playersNeeded === 0:
        message = `<td style="color:red">Game is Full</td>`
        break;
      case playersNeeded <= 3:
        message = `<td style="color:yellow">${playersNeeded} players needed.</td>`
      default:
        message = `<td style="color:white">${playersNeeded} players needed.</td>`
    }

    return message;
  };

};
