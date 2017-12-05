class User < ActiveRecord::Base
	#after_create :set_defaults, unless: :persisted?

	has_many :incomes
	enum profile: [:admin, :medico, :usuario, :paciente ]
	
	#attr_accessor :password
	#before_save :encrypt_password
	before_create { generate_token(:auth_token) }
	has_secure_password

	#validates_confirmation_of :password
	#validates_presence_of :password, :on => :create
	validates_presence_of :email
	validates_uniqueness_of :email



	
	def is_admin
		return true if self.admin?
	end

	def is_paciente
		return true if self.paciente? 
	end
	def fullname
		self.name + " " + self.lastname
	end
	def self.search(usuario)
		where("name LIKE ? OR lastname LIKE ? OR email LIKE ?", "%#{usuario}%", "%#{usuario}%", "%#{usuario}%")
	end

	def self.authenticate(email, password)
		user = find_by_email(email)  #.first aca habia un 
		if user && user.password_hash = BCrypt::Engine.hash_secret(password, user.password_digest)
			user
		else
			nil
		end
	end

	def encrypt_password
		if password.present?
			self.password_salt = BCrypt::Engine.generate_salt
			self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
		end
	end	

	def send_password_reset
		generate_token(:password_reset_token)
		self.password_reset_sent_at = Time.zone.now
		save!
		UserMailer.password_reset(self).deliver
	end

	def generate_token(column)
		begin
			self[column] = SecureRandom.urlsafe_base64
		end while User.exists?(column => self[column])
	end
end
