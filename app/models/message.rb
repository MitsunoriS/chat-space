class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :content, presence: ture, unless: :image?
  monnt_uploader :imgae, ImageUploader
end
