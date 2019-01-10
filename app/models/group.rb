class Group < ApplicationRecord
  validates :name, presence: true

  belongs_to :week

  has_many :groupings
  has_many :students, through: :groupings

  def acceptable_group?(student, repeat_factor)
    repeats = 0
    self.students.each do |student_in_group|
      student.reload
      if student.previous_group_mates.include?(student_in_group)
        repeats += 1
      end
    end
    repeat_factor >= repeats
  end

end
