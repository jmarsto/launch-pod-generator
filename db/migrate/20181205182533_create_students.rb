class CreateStudents < ActiveRecord::Migration[5.2]
  def change
    create_table :students do |t|
      t.string :name, null: false
      t.belongs_to :cohort

      t.timestamps
    end
  end
end
