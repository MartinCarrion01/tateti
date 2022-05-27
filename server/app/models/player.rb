class Player
    include Mongoid::Document

    field :username, type: String
    field :password, type: String
    field :in_game, type: Boolean, default: false

    has_many :matches, inverse_of: "Player", dependent: :delete_all

    validates :username, presence: true, length: {in: 2..16}
    validates :password, presence: true, length: {is: 8}
end