class UserJoinedGame < ApplicationRecord
  belongs_to :joined_player, :class_name => "User", :foreign_key => 'joined_player_id'
  belongs_to :joined_game, :class_name => "Game", :foreign_key => 'joined_game_id'
end
