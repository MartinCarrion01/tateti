class MatchesController < ApplicationController
    before_action :set_player, only: [:create, :join, :make_move, :refresh]    
    before_action :set_match, only: [:join, :make_move, :refresh]
    before_action :can_play?, only: [:make_move]    
    before_action :is_playing?, only: [:create, :join]

    def create
        @match = Match.new(player1: @player, match_number: rand(100000..999999))
        if @match.save
            if @player.update(in_game: true)             
                render(
                    status: 200,
                    json: {match: @match}
                )
            else
                render_player_errors
            end
        else
            render_match_errors
        end
    end

    def refresh
        if @match.player1 == @player
            if @match.status != "juegap1"
                render(
                    status: 200,
                    json: {match: nil, refresh: true}
                )
                return
            end
            render(
                status: 200,
                json: {match: @match, refresh: false}
            )
        else
            if @match.status != "juegap2"
                render(
                    status: 200,
                    json: {match: nil, refresh: true}
                )
                return
            end
            render(
                status: 200,
                json: {match: @match, refresh: false}
            )
        end 
    end

    def join
        if @match.player2.nil?
            if @match.update(player2: @player, status: "juegap1")
                if @player.update(in_game: true)             
                    render(
                        status: 200,
                        json: {match: @match}
                    )
                else
                    render_player_errors
                end
            else
                render_match_errors
            end
        else
            render(
                status: 400,
                json: {message: "El partido al cual se desea unir esta lleno"}
            )
        end
    end

    def make_move
        @match.make_move(@player, params[:celdamarcada])
        if @match.save
            render(
                status: 204,
                json: {message: ""}
            )
        else
            render_match_errors
        end
    end

    private
    
    def set_player
        if request.headers["Authorization"].nil?
            render(
                status: 400,
                json: {message: "Debe poseer un token válido para realizar esta acción"}
            )
            return false
        end
        @player = Player.find_by(id: request.headers["Authorization"].split[1])
        if @player.nil?
            render(
                status: 404,
                json: {message: "El jugador solicitado no existe"}
            )
            return false
        end
    end

    def set_match
        @match = Match.find_by(match_number: params[:id])
        if @match.nil?
            render(
                status: 404,
                json: {message: "El partido solicitado no existe"}
            )
            false
        end
    end

    def can_play?
        if (@match.status != "juegap1" && @match.status != "juegap2")
            render(
                status: 400,
                json: {mensaje: "No es posible realizar una jugada"}
            )
            return false
        end
        if @match.player1 != @player && @match.player2 != @player
            render(
                status: 400,
                json: {message: "No puede realizar esta acción, ya que no le corresponde esta partida"}
            )
            return false
        end
        if (@match.status == "juegap1" && @match.player1 != @player) || (@match.status == "juegap2" && @match.player2 != @player)
            render(
                status: 400,
                json: {message: "No puede realizar una jugada porque no es su turno"}
            )
            return false
        end
        if @match.player1_cells.include?(params[:celdamarcada]) || @match.player2_cells.include?(params[:celdamarcada]) 
            render(
                status: 400,
                json: {mensaje: "No puede marcar una celda que ya fue marcada"}
            )
            return false
        end
    end
    
    def render_match_errors
        render(
            status: 400,
            json: {mensaje: @match.errors.details}
        )    
    end

    def render_player_errors
        render(
            status: 400,
            json: {mensaje: @player.errors.details}
        )    
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