class CreateIncomes < ActiveRecord::Migration[5.0]
  def change
    create_table :incomes do |t|
      t.decimal :monto
      t.integer :user_id
      t.integer :event_id
      t.string :concepto

      t.timestamps
    end
  end
end
