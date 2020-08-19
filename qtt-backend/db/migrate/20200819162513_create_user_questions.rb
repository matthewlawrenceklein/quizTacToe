class CreateUserQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :user_questions do |t|
      t.string :questionBody
      t.string :answer
      t.string :category
      t.references :theDumpster

      t.timestamps
    end
  end
end
