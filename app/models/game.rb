class Game < ApplicationRecord
  belongs_to :sport
  belongs_to :planner, :class_name => "User", :foreign_key => "planner_id"
  has_many :user_joined_games, :foreign_key => 'joined_game_id'
  has_many :joined_players, through: :user_joined_games


  accepts_nested_attributes_for :sport, reject_if: proc { |attributes| attributes['name'].blank? }

  validates :location, length: { minimum: 5 }
  validates :title, length: { minimum: 5 }
  validates :start_date, presence: true
  validates :start_time, presence: true

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
