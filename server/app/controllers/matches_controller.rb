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
                render_player_errors
            end
        else
            render_match_errors
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

    def start 
        if @match.player1 != @player
           render(
               status: 400,
               json: {message: "Solo el creador de la partida puede comenzar un juego"}
           )
            return 
        else
            if @match.player2.nil? 
                render(
                    status: 400,
                    json: {message: "Falta un jugador para comenzar el partido"}
                )
            else
                @match.status = "juegap1"
                if @match.save
                    render(
                        status: 200,
                        json: {match: @match}
                    )
                else
                    render_match_errors
                end
            end
        end
    end
    
    def make_move
        if (@match.status != "juegap1" || @match.status "juegap2")
            render(
                status: 400,
                json: {mensaje: "No es posible realizar una jugada"}
            )
            return
        end
        if (@match.status == "juegap1" && @match.player1 != @player) || (@match.status == "juegap2" && @match.player2 != @player)
            render(
                status: 400,
                json: {message: "No puede realizar una jugada porque no es su turno"}
            )
        else
            if @match.player1_cells.include?(params[:celdamarcada]) || @match.player2_cells.include?(params[:celdamarcada]) 
                render(
                    status: 400,
                    json: {mensaje: "No puede marcar una celda que ya fue marcada"}
                )
                return
            end
            if @match.status == "juegap1"
            #Hacer jugada de jugador 1
                @match.player1_cells.push(params[:celdamarcada])
                if @match.player1_cells.length >= 3 && did_player_win(@match.player1_cells)
                    @match.winner = @player
                    @match.status = "ganap1"
                    @match.is_active = false
                else
                    @match.status = "juegap2"
                end
            else 
                #Hacer jugada de jugador 2
                @match.player2_cells.push(params[:celdamarcada])
                if @match.player2_cells.length >= 3 && did_player_win(@match.player2_cells)
                    @match.winner = @player
                    @match.status = "ganap2"
                    @match.is_active = false
                else
                    @match.status = "juegap1"
                end
            end
            if @match.player1_cells.length + @match.player2_cells.length >= 8
                @match.winner = nil
                @match.status = "empate"
                @match.is_active = false
            end
            if @match.save
                render(
                    status: 200,
                    json: {match: @match}
                )
            else
                render_match_errors
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
                return
            end
            @match.status == "juegap1"
            render(
                status: 200,
                json: {match: @match}
            )
        else
            if @match.status == "juegap1"
                render(
                    status: 200,
                    json: {match: nil}
                )
                return
            end
            render(
                status: 200,
                json: {match: @match}
            )
        end 
    end

    private
    
    def set_player
        @player = Player.find(request.headers["Authorization"].split[1])
        if @player.nil?
            render(
                status: 404,
                json: {message: "El jugador solicitado no existe"}
            )
            false
        end
    end

    def set_match
        @match = Match.find_by(is_active: true, match_number: params[:match_number])
        if @match.nil?
            render(
                status: 404,
                json: {message: "El partido solicitado no existe"}
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

    #Metodos relacionados con la logica para determinar si un jugador ganó
    def did_player_win(array)
        #Para comprobar si hay una sucesión de 3 celdas cuyas filas son iguales
        rows = array.map {|a| a[0] }.sort.join
        if match_three_consec?(rows)
            return true
        end
        #Para comprobar si hay una sucesión de 3 celdas cuyas columnas son iguales
        columns = array.map {|a| a[2] }.sort.join
        if match_three_consec?(columns)
            return true
        end
        #Para comprobar si marco la diagonal principal
        if multiple_exist(array, ["0-0", "1-1", "2-2"]) 
           return true 
        end
        #Para comprobar si las celdas marcadas contienen al array de las celdas contradiagonales
        if multiple_exist(array, ["0-2", "1-1", "2-0"]) 
           return true 
        end
        return false
    end

    def match_three_consec?(str)
        return str.match?(/[0-2]{3,}/) 
    end

    def multiple_exist (arr, values)
        return values.all?{|a| arr.include? a}
    end
end
