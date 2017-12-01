class Sport < ApplicationRecord
  validates :name, uniqueness: {message: "%{value} is on the list. Please choose it from the list."}, on: :create
end
