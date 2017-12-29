$(document).on("turbolinks:load",function(){
  attachNextGameListener();
});

function attachNextGameListener(){
  $('#next-game').on('click', function(){
    event.preventDefault();
    getNextGame()
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
         nextGame = games[0]
       }else{
         nextGame = games[i+1]
       }
     }
    }
    addNextGameToDOM(nextGame)
  })
};

function addNextGameToDOM(game){
  let maxPlayers = game.max_players
  let joinedPlayersSize = game.joined_players.length
  let playersNeeded = playersNeededGame(maxPlayers, joinedPlayersSize)

   $('h1').attr('data-game-id', game.id)
   $('#game-title').text(game.title)
   $('small').text(game.sport.name)
   $('#game-location').text(`LOCATION: ${game.location}`)
   $('#game-start-date').text(`START DATE: ${game.start_date}`)
   $('#game-start-time').text(`START TIME: ${game.start_time}`)
   $('#game-notes').text(`NOTES: ${game.notes}`)
   $('#game-players-needed').text(playersNeeded)

   $('.game-joined-player').remove()
   game.joined_players.forEach(function(player){
      $('#joined-players-table').append(`<tr>
                                        <td class="game-joined-player"><a href="/users/${player.id}">${player.email}</a></td>
                                      </tr>`)
   })


};

function playersNeededGame(maxPlayers, joinedPlayers){
  let playersNeeded = maxPlayers - joinedPlayers
  let message = undefined

  switch(true){
    case playersNeeded === 0:
      $('#game-players-needed').css('color','red')
      message = `Game is Full`
      break;
    case playersNeeded <= 3:
      $('#game-players-needed').css('color','yellow')
      message = `${playersNeeded} players needed`
      break;
    default:
      $('#game-players-needed').css('color','black')
      message = `${playersNeeded} players needed`
  }

  return message;
};
