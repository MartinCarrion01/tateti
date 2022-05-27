class PlayersController < ApplicationController
    before_action :set_player, only: [:match_create]    

    def index
        @players = Player.all.to_a
        render(
            json: {players: @players},
            status: 200
        )
    end

    def create 
        @player = Player.new(player_params)
        if @player.save
            render(
                status: 200,
                json: {player: @player}
            )
        else
           render_errors_response 
        end
    end

    def login
        @player = Player.find_by(username: player_params[:username])
        if @player.nil?
            render(
                status: 404,
                json: {message: "No existe el usuario ingresado"}
            )
        else
            if @player.password != player_params[:password]
                render(
                    status: 400,
                    json: {message: "La contraseña ingresada no es correcta"}
                )
            else
                render(
                    status: 200,
                    json: {player: @player}
                )
            end
        end
    end

    def match_create
        @match = Match.new(player1: @player)
        if @match.save
            if @player.update(in_game: true)             
                render(
                    status: 200,
                    json: {match: @match}
                )
            else
                render(
                    status: 400,
                    json: {message: @player.errors.details}
                )
            end
        else
            render(
                status: 400,
                json: {message: @match.errors.details}
            )
        end
    end

    private
    def player_params
        params.require(:player).permit(:username, :password)
    end

    def set_player
        @player = Player.find(params[:id])
        if @player.nil?
            render(
                json: {message: "El jugador #{params[:id]} no existe"},
                status: 404
            )
            false
        end
    end

    def render_errors_response
        render(
            json: {message: @player.errors.details},
            status: 400
        )
    end
end
