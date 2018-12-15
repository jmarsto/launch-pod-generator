class Student < ApplicationRecord
  validates :name, presence: true

  belongs_to :cohort

  has_many :groupings
  has_many :groups, through: :groupings
end
