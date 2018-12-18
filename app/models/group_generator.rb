class GroupGenerator
  def initialize(cohort)
    @cohort = cohort
  end

  def groups
    delete_previous_groups
    create_six_new_weeks
    create_groups
  end

  private
    def delete_previous_groups
      @cohort.weeks.delete_all
    end

    def create_six_new_weeks
      Week.create(cohort: @cohort, name: "1")
      Week.create(cohort: @cohort, name: "2")
      Week.create(cohort: @cohort, name: "3")
      Week.create(cohort: @cohort, name: "4")
      Week.create(cohort: @cohort, name: "5")
      Week.create(cohort: @cohort, name: "6")
    end

    def create_groups
      @cohort.weeks.each do |week|
        Group.create(name: "Alpha", week: week)
        Group.create(name: "Beta", week: week)
        Group.create(name: "Gamma", week: week)
        Group.create(name: "Kappa", week: week)
        Group.create(name: "Epsilon", week: week)

        week.groups.each do |group|
          Grouping.create([
            {group: group, student: @cohort.students.first},
            {group: group, student: @cohort.students.second},
            {group: group, student: @cohort.students.third},
            {group: group, student: @cohort.students.fourth},
            {group: group, student: @cohort.students.fifth}
            ])
        end
      end
    end
end

# i think for roadmapping, if it's not divisible by 4, we should include groups of 3. for group projects, if it's not divisible by 4, we should have groups of 5 included
# as many as needed in each case
