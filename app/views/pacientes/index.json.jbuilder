json.array!(@pacientes) do |paciente|
  json.extract! paciente, :id, :nombre, :apellido, :email, :fecha_nacimiento, :telefono, :dni, :direccion
  json.url paciente_url(paciente, format: :json)
end
