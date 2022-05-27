class Play
    include Mongoid::Document

    field :player1_cells, type: Array
    field :player2_cells, type: Array

    belongs_to :match
end