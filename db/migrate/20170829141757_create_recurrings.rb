class CreateRecurrings < ActiveRecord::Migration[5.0]
  def change
    create_table :recurrings do |t|
      t.string :rec_type
      t.string :event_lenght
      t.integer :event_pid
      t.datetime :start_date
      t.datetime :end_date
      t.string :text
      t.string :details

      t.timestamps
    end
  end
end
