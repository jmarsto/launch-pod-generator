class Week < ApplicationRecord
  validates :name, presence: true

  belongs_to :cohort
  has_many :groups, dependent: :destroy

  def all_groups_have_minimum_students?
    !self.groups.any? { |group| group.minimum_not_met? }
  end

end
