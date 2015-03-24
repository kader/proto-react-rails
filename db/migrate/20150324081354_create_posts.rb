class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.string :attachment
      t.text :media

      t.timestamps
    end
  end
end
