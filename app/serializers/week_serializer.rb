class WeekSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :groups
end
