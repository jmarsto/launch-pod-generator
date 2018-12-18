class Week < ApplicationRecord
  validates :name, presence: true

  belongs_to :cohort
  has_many :groups
end
