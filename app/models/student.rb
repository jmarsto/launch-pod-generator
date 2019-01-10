class Student < ApplicationRecord
  validates :name, presence: true

  belongs_to :cohort

  has_many :groupings
  has_many :groups, through: :groupings

  def delete_previous_groupings
    self.groupings.destroy_all
  end

  def previous_group_mates
    group_mates = []
    self.groups.each do |group|
      group.students.each do |student|
        group_mates << student
      end
    end
    group_mates.select! { |student| student != self }
    group_mates.uniq
  end

end
