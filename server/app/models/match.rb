class Match
    include Mongoid::Document

    before_save :set_match_number

    field :match_number, type: Integer
    field :player1_points, type: Integer
    field :player2_points, type: Integer

    belongs_to :winner, class_name: "Player", optional: true
    belongs_to :player1, class_name: "Player", optional: true
    belongs_to :player2, class_name: "Player", optional: true

    has_many :plays, autosave: true, dependent: :delete_all

    def set_match_number
        self.match_number = rand(1000..9999) 
    end
end