class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :students

  def students
    object.students
  end
end
