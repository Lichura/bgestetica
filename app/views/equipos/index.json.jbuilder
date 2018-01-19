json.array!(@equipos) do |equipo|
  json.extract! equipo, :id, :nombre, :descripcion, :color, :activo, :icon
  json.url equipo_url(equipo, format: :json)
end
