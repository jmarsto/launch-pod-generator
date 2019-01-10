class GroupGenerator
  def initialize(cohort)
    @cohort = cohort
    @number_of_groups = (cohort.students.length/4.to_f).ceil
  end

  def cohort_with_refreshed_groups
    delete_previous_groups
    delete_previous_groupings
    create_six_new_weeks
    name_groups
    create_groups
    @cohort.reload
  end

  private
  def delete_previous_groups
    @cohort.weeks.each do |week|
      week.delete
    end
  end

  def delete_previous_groupings
    @cohort.students.each do |student|
      student.delete_previous_groupings
    end
  end

  def create_six_new_weeks
    6.times do |i|
      Week.create(cohort: @cohort, name: "#{i+1}")
    end
  end

  def name_groups
    @cohort.reload

    @cohort.weeks.each do |week|
      @number_of_groups.times do |i|
        Group.create(name: "#{i+1}", week: week)
      end
    end
  end

  def group_students(students, week, repeat_factor)
    # need a way of stopping when minimum is met, and then filling in the rests
    week.groups.each do |group|
      students.each do |student|
        group.reload
        if group.acceptable_group?(student, repeat_factor)
          Grouping.create(group: group, student: student)
          students.delete(student)
        end
      end
    end
  end

  def create_groups
    @cohort.reload
    @cohort.weeks.each do |week|
      ungrouped_students = @cohort.students.map { |student| student }
      repeat_factor = 0
      until ungrouped_students.empty?
        group_students(ungrouped_students, week, repeat_factor)
        repeat_factor += 1
      end
    end
  end

  end
