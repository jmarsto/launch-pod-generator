class CreateWeeks < ActiveRecord::Migration[5.2]
  def change
    create_table :weeks do |t|
      t.string :name, null: false
      t.belongs_to :cohort
    end
  end
end
