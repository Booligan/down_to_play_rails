class Game < ApplicationRecord
  belongs_to :sport
  belongs_to :planner, :class_name => "User", :foreign_key => "planner_id"
  has_many :planned_games
  has_many :users, through: :planned_games
  accepts_nested_attributes_for :sport, reject_if: proc { |attributes| attributes['name'].blank? }

  validates :location, presence: true
  validates :title, presence: true
  validates :start_date, presence: true
  validates :start_time, presence: true
  

end
