class GamesController < ApplicationController
  before_action :find_game, only: [:show, :edit, :update, :destroy]

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
    binding.pry
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
