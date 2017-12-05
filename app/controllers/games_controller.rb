class GamesController < ApplicationController
  before_action :find_game, only: [:show, :edit, :update, :join, :leave, :destroy]

  def index
    @games = Game.all
  end

  def show
  end

  def new
    @game = Game.new
    @game.build_sport
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      redirect_to game_path(@game), notice: "Successfully planned a Game"
    else
      render 'new'
    end
  end

  def edit
  end

  def update
    if @game.update(game_params)
      redirect_to game_path(@game), notice: "Game was successfully updated"
    else
      render 'edit'
    end
  end

  def join
    if logged_in? && current_user != @game.planner
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
