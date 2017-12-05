class Sport < ApplicationRecord
  has_many :games
  validates :name, uniqueness: {message: "%{value} is on the list. Please choose it from the list."}, on: :create
end
