json.array!(@profiles) do |profile|
  json.extract! profile, :id, :nombre, :descripcion
  json.url profile_url(profile, format: :json)
end
