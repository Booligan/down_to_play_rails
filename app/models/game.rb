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

  def sport_name
    self.sport.name
  end

  def current_number_of_players
    self.joined_players.count + 1
  end

  def full?
    self.current_number_of_players == self.max_players
  end

  def players_needed
    if !full?
      players_needed = self.max_players - self.current_number_of_players
      players_needed
    else
      "Game is full."
    end
  end

  def join_game(player)
    self.joined_players << player
  end

  def leave_game(player)
    self.joined_players.delete(player)
  end

  def self.today
    where("DATE(start_date) == ?", Date.today)
  end

  def self.future
    where("DATE(start_date) > ?", Date.today)
  end

  def self.old
    where("DATE(start_date) < ?", Date.today)
  end

end
