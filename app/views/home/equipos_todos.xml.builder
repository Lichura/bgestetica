xml.instruct! :xml, :version=>"1.0"

xml.tag!("equipos_todos") do #actual count of records need to be used here
  @equipos_todos.each do |equipo|
    xml.tag!("equipos_todos",{ "id" => equipo.id }) do
      xml.tag!("key", equipo.id)
      xml.tag!("label", equipo.nombre)
    end
  end
end