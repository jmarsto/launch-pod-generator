class GroupGenerator
  def initialize(cohort)
    @cohort = cohort
  end

  def groups
    delete_previous_groups
    create_six_new_groups
    put_all_students_in_each_group
  end

  private
    def delete_previous_groups
      @cohort.groups.each do |group|
        group.delete
      end
    end

    def create_six_new_groups
      Group.create(cohort: @cohort, name: "GROUP 1")
      Group.create(cohort: @cohort, name: "GROUP 2")
      Group.create(cohort: @cohort, name: "GROUP 3")
      Group.create(cohort: @cohort, name: "GROUP 4")
      Group.create(cohort: @cohort, name: "GROUP 5")
      Group.create(cohort: @cohort, name: "GROUP 6")
    end

    def put_all_students_in_each_group
      @cohort.groups.each do |group|
        @cohort.students.each do |student|
          Grouping.create(group: group, student: student)
        end
      end
    end
end

# i think for roadmapping, if it's not divisible by 4, we should include groups of 3. for group projects, if it's not divisible by 4, we should have groups of 5 included
# as many as needed in each case
