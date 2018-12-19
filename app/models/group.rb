class Group < ApplicationRecord
  validates :name, presence: true

  belongs_to :week

  has_many :groupings
  has_many :students, through: :groupings
end
