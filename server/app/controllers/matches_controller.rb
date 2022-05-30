class MatchesController < ApplicationController
    before_action :set_match, only: [:join]
    before_action :set_player, only: [:create, :join]    
    before_action :is_playing?, only: [:create, :join]    
   
    def create
        @match = Match.new(player1: @player, match_number: rand(1000..9999))
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

    def join
        if @match.player2.nil?
            if @match.update(player2: @player)
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
        else
            render(
                status: 400,
                json: {message: "El partido al cual se desea unir esta lleno"}
            )
        end
    end

    private
    
    def set_player
        @player = Player.find(request.headers["Authorization"].split[1])
        if @player.nil?
            render(
                json: {message: "El jugador solicitado no existe"},
                status: 404
            )
            false
        end
    end

    def set_match
        @match = Match.find_by(is_active: true, match_number: params[:match_number])
        if @match.nil?
            render(
                json: {message: "El partido solicitado no existe"},
                status: 404
            )
            false
        end
    end
    
    def is_playing?
        if @player.in_game
            render(
                status: 400,
                json: {message: "No puede realizar esta acción, ya que se encuentra en partida actualmente"}
            )
            false
        end
    end
end
