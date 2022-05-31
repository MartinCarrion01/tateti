class MatchesController < ApplicationController
    before_action :set_match, only: [:join, :start, :make_move, :refresh]
    before_action :set_player, only: [:create, :join, :start, :make_move, :refresh]    
    before_action :can_play?, only: [:start, :make_move, :refresh]    
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

    def start 
        if @match.player1 != @player
           render(
               status: 400,
               json: {message: "Solo el creador de la partida puede comenzar un juego"}
           ) 
        else
            if @match.player2.nil? 
                render(
                    status: 400,
                    json: {message: "Falta un jugador para comenzar el partido"}
                )
            else
                @play = Play.new(player1_cells: [], player2_cells: []) 
                @match.plays.push(@play)
                @match.status = "juegap1"
                if @match.save
                    render(
                        status: 200,
                        json: {match: @match}
                    )
                else
                    render(
                        status: 400,
                        json: {message: @match.errors.details}
                    )
                end
            end
        end
    end

    def make_move
        if (@match.status == "juegap1" && @match.player1 != @player) || (@match.status == "juegap2" && @match.player2 != @player)
            render(
                status: 400,
                json: {message: "No puede realizar una jugada porque no es su turno"}
            )
        else
            if @match.status == "juegap1"
            #Hacer jugada de jugador 1
                if @match.plays[-1].player2_cells.include?(params[:celdamarcada])
                    render(
                        status: 400,
                        json: {mensaje: "No puede marcar una celda marcada por el otro jugador"}
                    )
                else
                    @match.plays[-1].player1_cells.push(params[:celdamarcada])
                    @match.status = "juegap2"
                    if @match.save
                        render(
                            status: 200,
                            json: {match: @match}
                        )
                    else
                        render(
                            status: 400,
                            json: {message: @match.errors.details}
                        )
                    end
                end
            elsif @match.status == "juegap2" 
                #Hacer jugada de jugador 2
                if @match.plays[-1].player1_cells.include?(params[:celdamarcada])
                    render(
                        status: 400,
                        json: {mensaje: "No puede marcar una celda marcada por el otro jugador"}
                    )
                else
                    @match.plays[-1].player2_cells.push(params[:celdamarcada])
                    @match.status = "juegap1"
                    if @match.save
                        render(
                            status: 200,
                            json: {match: @match}
                        )
                    else
                        render(
                            status: 400,
                            json: {message: @match.errors.details}
                        )
                    end
                end
            else
                render(
                    status: 400,
                    json: {message: "Imposible realizar esta acción"}
                )
            end
        end
    end

    def refresh
        if @match.player1 == @player
            if @match.status == "juegap2"
                render(
                    status: 200,
                    json: {match: nil}
                )
            elsif @match.status == "juegap1"
                render(
                    status: 200,
                    json: {match: @match}
                )
            else
                render(
                    status: 400,
                    json: {message: "Imposible realizar esta acción"}
                )
            end
        elsif @match.player2 == @player 
            if @match.status == "juegap1"
                render(
                    status: 200,
                    json: {match: nil}
                )
            elsif @match.status == "juegap2"
                render(
                    status: 200,
                    json: {match: @match}
                )
            else
                render(
                    status: 400,
                    json: {message: "Imposible realizar esta acción"}
                )
            end
        else
            render(
                status: 400,
                json: {message: "Imposible realizar esta acción"}
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

    def can_play?
        if @match.player1 != @player && @match.player2 != @player
            render(
                status: 400,
                json: {message: "No puede realizar esta acción, ya que no le corresponde esta partida"}
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
