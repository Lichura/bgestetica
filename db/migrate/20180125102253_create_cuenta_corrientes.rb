class CreateCuentaCorrientes < ActiveRecord::Migration[5.0]
  def change
    create_table :cuenta_corrientes do |t|
      t.integer :user_id
      t.float :saldo

      t.timestamps
    end
  end
end
