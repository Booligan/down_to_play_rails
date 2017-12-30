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
  getGames('My Planned Games', '/games.json')
};

// JOINED GAME BUTTON ACTION

function getJoinedGames(){
  getGames('My Joined Games', '/joined_games.json')
};

// QUICK FORM SUBMIT ACTION
function submitGame(){
  $.ajax({
    url: '/games.json',
    data: $('#quick-form').serialize(),
    dataType: "json",
    method: "POST",
    success: function(gameData){
      let game = new Game(gameData)
      appendGameRow(game)
    },
    error: function(error){
      alert("Make sure to include a Title/Players Needed for a Game.")
      console.log(error)
    }
  })
};

// AJAX CALL

function getGames(title, urlParam){
  let userID = $('h1').attr("data-user-id")
  $('#table-header').append(title)
  $('#table-columns').append(`<th>Title</th>
                              <th>Sport</th>
                              <th>Planner</th>
                              <th>Players needed</th>`)
  $.get(`/users/${userID}/${urlParam}`, function(games){
    games.forEach(function(gameData){
      let game = new Game(gameData)
      appendGameRow(game);
    })
  })
};

// HELPER FUNCTIONS

function appendGameRow(game){
  let userID = $('h1').attr("data-user-id")
  $('table').append(`<tr>
                      <td><a href="/users/${userID}/games/${game.id}">${game.title}</a></td>
                      <td>${game.sport.name}</td>
                      <td><a href="/users/${userID}">${game.planner.email}</a></td>
                      ${game.playerCountMessage()}
                    </tr>`)
};

function removeTable(){
  $('table tr').remove();
  $('table').append(`<tr id="table-header"></tr>
                     <tr id="table-columns"></tr>`)
};
