class UserMailerPreview < ActionMailer::Preview
  def new_event_preview
    UserMailer.new_event(User.first, Event.first, "prueba")
  end
end
