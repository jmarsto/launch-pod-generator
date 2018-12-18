class AddWeekToGroups < ActiveRecord::Migration[5.2]
  def change
    add_reference :groups, :week, foreign_key: true
  end
end
