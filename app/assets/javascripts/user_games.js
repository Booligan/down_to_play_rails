$(document).on("turbolinks:load",function(){
  attachUserGamesListeners();
});

function attachUserGamesListeners(){

  $('#planned-games').on('click', function(event){
    event.preventDefault();
    let userID = $('h1').attr("data-user-id")
    removeTable();
    getPlannedGames(userID);
  })

  $('#joined-games').on('click', function(event){
    event.preventDefault();
    let userID = $('h1').attr("data-user-id")
    removeTable();
    getJoinedGames(userID);
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
      let playersNeededTag = gameCountMessage(maxPlayers, joinedPlayers)
      $('table').append(`<tr>
                          <td><a href="/users/${userID}/games/${game.id}">${game.title}</a></td>
                          <td>${game.sport.name}</td>
                          <td><a href="/users/${userID}">${game.planner.email}</a></td>
                          ${playersNeededTag}
                        </tr>`)
    })
  })
};

function gameCountMessage(maxPlayers, joinedPlayers){
  let playersNeeded = maxPlayers - joinedPlayers
  let message = undefined

  switch(true){
    case playersNeeded === 0:
      message = `<td style="color:red">Game is Full</td>`
      break;
    case playersNeeded <= 3:
      message = `<td style="color:yellow">${playersNeeded} players needed</td>`
      break;
    default:
      message = `<td style="color:white">${playersNeeded} players needed</td>`
  }

  return message;
};

function getJoinedGames(userID){
  $.get(`/users/${userID}/joined_games`, function(games){
    console.log(games)
    $('#table-header').append('My Joined Games')
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
};

function removeTable(){
  $('table tr').remove();
  $('table').append(`<tr id="table-header"></tr>
                     <tr id="table-columns"></tr>`)
};
