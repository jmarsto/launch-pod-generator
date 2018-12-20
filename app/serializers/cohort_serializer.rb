class CohortSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :weeks
  has_many :students
end
