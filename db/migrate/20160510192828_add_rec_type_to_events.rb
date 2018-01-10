class AddRecTypeToEvents < ActiveRecord::Migration
  def change
    add_column :events, :rec_type, :string
    add_column :events, :event_length, :integer
    add_column :events, :event_pid, :integer
  end
end
