class GameSerializer < ActiveModel::Serializer
  attributes :id, :location, :title, :notes, :max_players, :start_date, :start_time
  belongs_to :sport
  belongs_to :planner
  has_many :joined_players
end
