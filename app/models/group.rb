class Group < ApplicationRecord
  validates :name, presence: true

  belongs_to :cohort

  has_many :groupings
  has_many :students, through: :groupings
end
