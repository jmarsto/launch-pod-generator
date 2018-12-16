class Cohort < ApplicationRecord
  validates :name, presence: true

  has_many :students
  has_many :groups
end
