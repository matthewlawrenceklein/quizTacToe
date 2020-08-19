class CreateTheDumpsters < ActiveRecord::Migration[6.0]
  def change
    create_table :the_dumpsters do |t|

      t.timestamps
    end
  end
end
