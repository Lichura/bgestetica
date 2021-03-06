class UserMailer < ApplicationMailer
#default from: "mbcontable@zoho.com"
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.password_reset.subject
  #
  def password_reset(user)
    @user = user

    mail(:to => user.email, :subject => "Recuperacion de contraseña")
  end

  def nuevo_turno(user)
  	@user = user

  	mail(:to => user.email, :subject => "Su turno en BG Estetica")
  end
  def envio_de_password(user, password)
    @user = user
    @password = password
    mail(:to => user.email, :subject => "Detalles de su cuenta")
  end

  def new_event(user, event, subject)
    @user = user
    @event = event
    mail(:to => user.email, :subject => subject)
  end
end
