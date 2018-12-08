class Api::V1::StudentsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    new_student = Student.new(student_params)
    # not sure why cohort_id won't work as a strong param?
    new_student.cohort_id = params[:cohort_id]
    if new_student.save
      render json: new_student, status: :created
    else
      render json: { errors: new_student.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    student_to_be_removed = Student.find(params[:id])
    removeId = student_to_be_removed.id
    if student_to_be_removed.delete
      render json: removeId
    else
      render json: { errors: student_to_be_removed.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def student_params
    params.require(:student).permit(:name)
  end
end
