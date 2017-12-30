$(document).on("turbolinks:load",function(){
  attachNextGameListener();
});

function attachNextGameListener(){
  $('#next-game').on('click', function(){
    event.preventDefault();
    getNextGame()
  })
  $('#players-joined-th').on('click', function(){
    event.preventDefault();
    showJoinedPlayers()
  })
};

function getNextGame(){
  let userID = $('#planner').attr(`data-user-id`)
  $.get(`/users/${userID}/games.json`, function(games){
    let currentGameID = $('h1').attr(`data-game-id`)
    let nextGame = undefined
    for (i = 0; i < games.length; i++){
     if(currentGameID == games[i].id){
       if(currentGameID == games[games.length - 1].id) {
         nextGame = new Game(games[0])
       }else{
         nextGame = new Game(games[i+1])
       }
     }
    }
    addNextGameToDOM(nextGame)
  })
};

// SHOW JOINED PLAYERS CLICK ACTION

function showJoinedPlayers(){
  $('.game-joined-player').show()
};

// HELPER FUNCTIONS

function addNextGameToDOM(game){
   $('h1').attr('data-game-id', game.id)
   $('#game-title').text(game.title)
   $('small').text(game.sport.name)
   $('#game-location').text(`LOCATION: ${game.location}`)
   $('#game-start-date').text(`START DATE: ${getFormattedDate(game.startDate)}`)
   $('#game-start-time').text(`START TIME: ${getFormattedTime(game.startTime)}`)
   $('#game-notes').text(`NOTES: ${game.notes}`)
   $('#game-players-needed').text(game.generatePlayersNeededHTML())
   $('#players-joined-th').text(`Players Joined (${game.joinedPlayers.length})`)
   $('.game-joined-player').remove()
   $('#joined-players-table').append(game.generateJoinedPlayersHTML());

   // UPDATE BUTTONS TO CORRECT GAME ROUTE
   $('#edit-game').attr("href", `/users/${game.planner.id}/games/${game.id}/edit`)
   $('#cancel-game').attr("href", `/games/${game.id}`)
};

function getFormattedDate(date) {
    let newDate = new Date(date)
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate() + 1;
    let year = newDate.getFullYear();
    return month + "/" + day + "/" + year;
}

function getFormattedTime(time) {
    let newTime = new Date(time)
    newTime.setHours(newTime.getHours() + 5)
    return newTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'})
}
