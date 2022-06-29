class Match
    include Mongoid::Document

    field :match_number, type: Integer
    field :status, type: String, default: "esperando"
    field :player1_cells, type: Array, default: []
    field :player2_cells, type: Array, default: []

    belongs_to :winner, class_name: "Player", optional: true
    belongs_to :player1, class_name: "Player", autosave: true
    belongs_to :player2, class_name: "Player", optional: true, autosave: true

    def make_move(player, cell)
        cells = if self.player1 == player
                    self.player1_cells.push(cell)
                    self.player1_cells
                elsif self.player2 == player
                    self.player2_cells.push(cell)
                    self.player2_cells
                end
        if cells.length >= 3 && did_player_win(cells)
            self.winner = player
            self.status = "finalizado"
            self.player1.in_game = false
            self.player2.in_game = false
        else
            if self.player1_cells.length + self.player2_cells.length >= 9
                self.status = "finalizado"
                self.player1.in_game = false
                self.player2.in_game = false
                return
            end
            if self.player1 == player
                self.status = "juegap2"
            elsif self.player2 == player
                self.status = "juegap1"
            end
        end
    end

    def did_player_win(cells)
        winner_combinations = [["0", "1", "2"], ["3", "4", "5"], ["6", "7", "8"],
                               ["0", "3", "6"], ["1", "4", "7"], ["2", "5", "8"],
                               ["0", "4", "8"], ["2", "4", "6"]]
        flag = false
        winner_combinations.each do |combination|
            if combination.all?{|a| cells.include? a}
                flag = true
                break
            end
        end
        return flag
    end
end
