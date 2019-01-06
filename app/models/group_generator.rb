class GroupGenerator
  def initialize(cohort)
    @cohort = cohort
  end

  def cohort_with_refreshed_groups
    delete_previous_groups
    create_six_new_weeks
    create_groups
    @cohort.reload
  end

  private
    def delete_previous_groups
      # something weird is happening with this function
      # it works to delete the previous weeks, and when we use the generator,
      # we are able to call cohort.weeks in the groups_controller line 7,
      # but somehow AFTER that, they disappear, and six new weeks are made without groups?

      #compare ID of weeks in cohortShowData with the ID of weeks in GroupsContainer props,
      # but BOTH are simply calling on cohort.weeks?
      @cohort.weeks.each do |week|
        week.delete
      end
      # if we DONT call this function, it behaves as expected. groups stay when we navigate to the
      # show page, but we end up generating another six when we click generate groups. not ideal.
      # tried removing the dependent: :destroy and deleting in other ways, still odd behavior

      # is there a special way we have to clean cohort.weeks?
    end

    def create_six_new_weeks
      6.times do |i|
        Week.create(cohort: @cohort, name: "#{i+1}")
      end
    end

    def create_groups
      @cohort.reload
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
