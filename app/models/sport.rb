class Sport < ApplicationRecord
  has_many :games

  validates :name, presence: true
  validate :sport_is_not_on_the_list, :sport_is_a_valid_format, on: :create

  before_save :make_uppercase

  private

  def sport_is_not_on_the_list
    if Sport.all.any?{|sport| sport.name == self.name.upcase! || sport.name == self.name.downcase!}
      errors.add(:name, "is on the list. Please choose it from the list.")
    end
  end

  def sport_is_a_valid_format
    if name =~ /[^a-zA-Z]/
      errors.add(:name, "is not a valid name. It only accepts alphabet letters.")
    end
  end

  def make_uppercase
    self.name.upcase!
  end

end
