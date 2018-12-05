class Api::V1::CohortsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Cohort.all
  end

  def show
    render json: Cohort.find(params[:id])
  end

  def create
    new_cohort = Cohort.new(cohort_params)
    if new_cohort.save
      render json: new_cohort, status: :created
    else
      render json: { errors: new_cohort.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def cohort_params
    params.require(:cohort).permit(:name)
  end
end
