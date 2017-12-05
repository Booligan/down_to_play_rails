class CreateUserJoinedGames < ActiveRecord::Migration[5.1]
  def change
    create_table :user_joined_games do |t|
      t.integer :joined_game_id
      t.integer :joined_player_id

      t.timestamps
    end
  end
end
