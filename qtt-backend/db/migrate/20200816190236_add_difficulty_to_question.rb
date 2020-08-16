class AddDifficultyToQuestion < ActiveRecord::Migration[6.0]
  def change
    change_table(:questions) do |t|
      t.column :difficulty, :string
    end
  end
end
