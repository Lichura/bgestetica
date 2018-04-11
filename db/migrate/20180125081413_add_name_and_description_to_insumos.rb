class AddNameAndDescriptionToInsumos < ActiveRecord::Migration[5.0]
  def change
    add_column :insumos, :name, :string
    add_column :insumos, :description, :string
  end
end
