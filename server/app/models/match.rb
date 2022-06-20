class Match
    include Mongoid::Document

    field :match_number, type: Integer
    field :is_active, type: Boolean, default: true
    field :status, type: String, default: "esperando"
    field :player1_cells, type: Array, default: []
    field :player2_cells, type: Array, default: []

    belongs_to :winner, class_name: "Player", optional: true
    belongs_to :player1, class_name: "Player"
    belongs_to :player2, class_name: "Player", optional: true

    def make_move(match)
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
            self.is_active = false
        else
           if self.play 
           
           elsif 
           
           end
        end
    end
end