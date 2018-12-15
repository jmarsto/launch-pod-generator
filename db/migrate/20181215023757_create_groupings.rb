class CreateGroupings < ActiveRecord::Migration[5.2]
  def change
    create_table :groupings do |t|
      t.belongs_to :group
      t.belongs_to :student

      t.timestamps
    end
  end
end
