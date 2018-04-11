json.array!(@medicos) do |medico|
  json.extract! medico, :id, :nombre, :apellido, :telefono, :mail
  json.url medico_url(medico, format: :json)
end
