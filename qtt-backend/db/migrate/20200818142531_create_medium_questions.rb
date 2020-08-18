class CreateMediumQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :medium_questions do |t|
      t.string :category
      t.string :question
      t.string :answer
      t.string :difficulty

      t.timestamps
    end
  end
end
