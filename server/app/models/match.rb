class Match
    include Mongoid::Document

    field :match_number, type: Integer
    field :is_active, type: Boolean, default: true
    field :player1_points, type: Integer
    field :player2_points, type: Integer
    field :status, type: String, default: "esperando"

    belongs_to :winner, class_name: "Player", optional: true
    belongs_to :player1, class_name: "Player", optional: true
    belongs_to :player2, class_name: "Player", optional: true

    has_many :plays, autosave: true, dependent: :delete_all
end