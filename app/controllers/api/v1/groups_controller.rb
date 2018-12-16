class Api::V1::GroupsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    cohort = Cohort.find(params[:cohort_id])
    GroupGenerator.new(cohort).groups
    render json: cohort.groups
  end
end
