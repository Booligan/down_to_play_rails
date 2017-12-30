// GAME OBJECT

function Game(game){
  this.id = game.id
  this.location = game.location
  this.title = game.title
  this.notes = game.notes
  this.maxPlayers = game.max_players
  this.startDate = game.start_date
  this.startTime = game.start_time
  this.sport = game.sport
  this.planner = game.planner
  this.joinedPlayers = game.joined_players
};

// GAME PROTOTYPES

Game.prototype.generatePlayersNeededHTML = function(){
  let playersNeeded = this.maxPlayers - this.joinedPlayers.length
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

Game.prototype.generateJoinedPlayersHTML = function(){
  let html = undefined
  this.joinedPlayers.forEach(function(player){
    tr = `<tr class="game-joined-player" style="display:none">
            <td><a href="/users/${player.id}">${player.email}</a></td>
          </tr>`
    html = html + tr
  })
  return html
}
Game.prototype.playerCountMessage = function(){
  let playersNeeded = this.maxPlayers - this.joinedPlayers.length
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
