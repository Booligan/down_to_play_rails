class GamesController < ApplicationController
  before_action :find_game, only: [:show, :edit, :update, :destroy]

  def index
    @games = Game.all
  end

  def show
  end

  def new
    @game = Game.new
  end

  def create
    @game = Game.new(game_params)

    if @game.save
      redirect_to game_path(@game), notice: "Successfully planned a Game"
    else
      render 'new'
    end
  end

  def update
  end

  private

  def game_params
    params.require(:game).permit(:location, :title, :max_players, :start_date, :start_time, :sport_id, :planner_id)
  end

  def find_game
    @game = Game.find(params[:id])
  end
end
