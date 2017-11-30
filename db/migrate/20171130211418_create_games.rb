class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.string :location
      t.string :title
      t.text :notes
      t.integer :max_players
      t.datetime :start_date
      t.datetime :start_time
      t.integer :sport_id
      t.integer :planner_id

      t.timestamps
    end
  end
end
