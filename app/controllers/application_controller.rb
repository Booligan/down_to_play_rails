class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :logged_in?

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
    end
  end

  def logged_in?
    !!current_user
  end

end
