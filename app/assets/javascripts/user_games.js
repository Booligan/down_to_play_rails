$(document).on("turbolinks:load",function(){
  attachUserGamesListeners();
});

function attachUserGamesListeners(){
  $('#planned-games').on('click', function(event){
    event.preventDefault();
    removeTable();
    $('#quick-form').show();
    getPlannedGames();
  })

  $('#joined-games').on('click', function(event){
    event.preventDefault();
    removeTable();
    $('#quick-form').hide();
    getJoinedGames();
  })

  $('#quick-form').on('submit', function(event){
    event.preventDefault();
    submitGame();
  })
};

// PLANNED GAMES BUTTON ACTION

function getPlannedGames(){
  let userID = $('h1').attr("data-user-id")
  setTableShell('My Planned Games')
  $.get(`/users/${userID}/games.json`, function(games){
    games.forEach(function(game){
      appendGameRow(game);
    })
  })
};

// JOINED GAME BUTTON ACTION

function getJoinedGames(){
  let userID = $('h1').attr("data-user-id")
  setTableShell('My Joined Games')
  $.get(`/users/${userID}/joined_games`, function(games){
    games.forEach(function(game){
      appendGameRow(game);
    })
  })
};

// QUICK FORM SUBMIT ACTION
function submitGame(){
  $.ajax({
    url: '/games.json',
    data: $('#quick-form').serialize(),
    dataType: "json",
    method: "POST",
    success: function(game){
      appendGameRow(game)
    },
    error: function(error){
      alert("Make sure to include a Title/Players Needed for a Game.")
      console.log(error)
    }
  })
};

// HELPER FUNCTIONS

function setTableShell(title){
  $('#table-header').append(title)
  $('#table-columns').append(`<th>Title</th>
                              <th>Sport</th>
                              <th>Planner</th>
                              <th>Players needed</th>`)
};

function appendGameRow(game){
  let userID = $('h1').attr("data-user-id")
  let maxPlayers = game.max_players
  let joinedPlayers = game.joined_players.length
  let playersNeededTag = gameCountMessage(maxPlayers, joinedPlayers)
  $('table').append(`<tr>
                      <td><a href="/users/${userID}/games/${game.id}">${game.title}</a></td>
                      <td>${game.sport.name}</td>
                      <td><a href="/users/${userID}">${game.planner.email}</a></td>
                      ${playersNeededTag}
                    </tr>`)
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

function removeTable(){
  $('table tr').remove();
  $('table').append(`<tr id="table-header"></tr>
                     <tr id="table-columns"></tr>`)
};
