class Game < ApplicationRecord
  belongs_to :sport
  belongs_to :planner, :class_name => "User", :foreign_key => "planner_id"
  has_many :user_joined_games, :foreign_key => 'joined_game_id'
  has_many :joined_players, through: :user_joined_games

  validates :location, length: { minimum: 5 }
  validates :title, length: { minimum: 5 }
  validates :start_date, presence: true
  validates :start_time, presence: true


  def sport_attributes=(sport_attributes)
    if !sport_attributes[:name].blank?
      self.build_sport(sport_attributes)
    end
  end

  def planner_email
    self.planner.email
  end

  def join_game(player)
    self.joined_players << player
  end

  def leave_game(player)
    self.joined_players.delete(player)
  end

end
