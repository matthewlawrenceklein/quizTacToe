class CreateHardQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :hard_questions do |t|
      t.string :category
      t.string :question
      t.string :answer
      t.string :difficulty

      t.timestamps
    end
  end
end
