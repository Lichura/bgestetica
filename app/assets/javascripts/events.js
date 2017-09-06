jQuery(function() {
  $('#event_paciente').autocomplete({
    source: $('#event_paciente').data('autocomplete-source')
  });
  $('#event_medico').autocomplete({
    source: $('#event_medico').data('autocomplete-source')
  });
  $('#event_equipoo').autocomplete({
    source: $('#event_equipo').data('autocomplete-source')
  });
});