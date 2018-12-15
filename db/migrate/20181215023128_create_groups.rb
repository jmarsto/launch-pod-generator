class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.belongs_to :cohort

      t.timestamps
    end
  end
end
