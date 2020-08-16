class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :category
      t.string :question
      t.boolean :answer

      t.timestamps
    end
  end
end
