class PlayersController < ApplicationController
    before_action :set_player, only: :show
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

    def show
        render(
            json: {player: @player},
            status: 200
        )
    end

    def login
        player = Player.find_by(username: player_params[:username])
        if player.nil?
            render(
                status: 404,
                json: {message: "No existe el usuario ingresado"}
            )
        elsif player.password != player_params[:password]
                render(
                    status: 400,
                    json: {message: "La contraseña ingresada no es correcta"}
                )
            else
                render(
                    status: 200,
                    json: {player: player}
                )
            end
        end
    end

    private
    def player_params
        params.require(:player).permit(:username, :password)
    end

    def set_player
        @player = Player.find_by(id: params[:id])
        if @player.nil?
            render(
                json: {message: "El jugador solicitado no existe"},
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