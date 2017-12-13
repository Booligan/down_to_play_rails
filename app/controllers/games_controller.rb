class GamesController < ApplicationController
  before_action :find_game, only: [:show, :update, :join, :leave, :destroy]

  def index
    if params[:user_id]
      @user = User.find_by(id: params[:user_id])
      @games = @user.games
    else
      @games = Game.all
    end
  end

  def new
    if logged_in?
      if params[:user_id] && !User.exists?(params[:user_id])
        redirect_to user_path, alert: "User not found."
      elsif params[:user_id] && params[:user_id].to_i != current_user.id
        redirect_to user_path(current_user)
      else
        @game = Game.new(planner_id: params[:user_id])
        @game.build_sport
      end
    else
      redirect_to new_user_session_path
    end
  end

  def create
    @user = User.find_by(params[:user_id])
    @game = Game.new(game_params)
    if @game.save
      redirect_to user_game_path(@user,@game), notice: "Successfully planned a Game"
    else
      @game.build_sport
      render 'new'
    end
  end

  def edit
    if params[:user_id]
      user= User.find_by(id: params[:user_id])
      if user.nil?
        redirect_to users_path, alert: "User not found."
      else
        @game = user.games.find_by(id: params[:id])
        redirect_to user_games_path(user), alert: "Game not found." if @game.nil?
      end
    else
      find_game
      if @game.planner != current_user
        redirect_to user_path(current_user)
      end
    end
  end

  def update
    if @game.update(game_params)
      redirect_to game_path(@game), notice: "Game was successfully updated"
    else
      @game.build_sport
      render 'edit'
    end
  end

  def destroy
    if @game.planner == current_user
      @game.destroy
      redirect_to user_path(current_user)
    else
      redirect_to user_path(current_user), notice: "You can not delete this game."
    end
  end

  def join
    if logged_in? && current_user != @game.planner && !@game.full?
      @game.join_game(current_user)
      if @game.save
        redirect_to game_path(@game), notice: "You successfully joined the game!"
      end
    else
      redirect_to game_path(@game), notice: "Cannot join game"
    end
  end

  def leave
    if logged_in? && @game.joined_players.include?(current_user)
      @game.leave_game(current_user)
      if @game.save
        redirect_to game_path(@game), notice: "You successfully left the game."
      end
    else
        redirect_to game_path(@game), notice: "Can not leave a game without joining."
    end
  end

  def today
    @games = Game.today
    render :index
  end

  def future
    @games = Game.future
    render :index
  end

  def past
    @games = Game.past
    render :index
  end

  private

  def game_params
    params.require(:game).permit(:location,
                                 :title,
                                 :notes,
                                 :max_players,
                                 :start_date,
                                 :start_time,
                                 :sport_id,
                                 :planner_id,
                                 sport_attributes:[:name])
  end

  def find_game
    @game = Game.find(params[:id])
  end
end
