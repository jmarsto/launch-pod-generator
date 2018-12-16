class Api::V1::GroupsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    cohort = Cohort.find(params[:cohort_id])
    group = Group.new(name: "ONE", cohort: cohort)
    binding.pry
    render json: group
  end
end
