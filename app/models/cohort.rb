class Cohort < ApplicationRecord
  validates :name, presence: true

  has_many :students

  has_many :weeks
  has_many :groups, through: :weeks
end
