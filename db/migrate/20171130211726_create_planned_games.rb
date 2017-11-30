class CreatePlannedGames < ActiveRecord::Migration[5.1]
  def change
    create_table :planned_games do |t|
      t.integer :game_id
      t.integer :user_id

      t.timestamps
    end
  end
end
