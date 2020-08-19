class AddUsernameToHighscore < ActiveRecord::Migration[6.0]
  def change
    change_table(:highscores) do |t|
      t.column :username, :string
    end
  end
end
