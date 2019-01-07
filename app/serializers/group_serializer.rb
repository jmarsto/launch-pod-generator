class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :groupings

  def groupings
    object.groupings
  end
end
