class Match
    include Mongoid::Document

    field :match_number, type: Integer
    field :is_active, type: Boolean, default: true
    field :status, type: String, default: "esperando"
    field :player1_cells, type: Array, default: []
    field :player2_cells, type: Array, default: []

    belongs_to :winner, class_name: "Player", optional: true
    belongs_to :player1, class_name: "Player", optional: true
    belongs_to :player2, class_name: "Player", optional: true
end