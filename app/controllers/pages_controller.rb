class PagesController < ApplicationController

  def home
    if logged_in?
      redirect_to profile_path
    end
  end

end
