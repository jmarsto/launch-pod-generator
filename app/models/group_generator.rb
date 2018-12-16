class GroupGenerator
  def initialize(cohort)
    @cohort = cohort
  end

  def groups
    @cohort.groups.each do |group|
      group.delete
    end
    
    Group.create(cohort: @cohort, name: "GROUP 1")
    Group.create(cohort: @cohort, name: "GROUP 2")
    Group.create(cohort: @cohort, name: "GROUP 3")
    Group.create(cohort: @cohort, name: "GROUP 4")
    Group.create(cohort: @cohort, name: "GROUP 5")
    Group.create(cohort: @cohort, name: "GROUP 6")

    @cohort.groups
  end
end
