json.array!(@equipos_todos) do |equipo|
  json.extract! equipo, :id, :nombre
  json.url equipo_url(equipo, format: :json)
end
