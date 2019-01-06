class Api::V1::GroupsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    cohort = Cohort.find(params[:cohort_id])
    updated_cohort = GroupGenerator.new(cohort).cohort_with_refreshed_groups
    render json: ActiveModel::Serializer::CollectionSerializer.new(updated_cohort.weeks, each_serializer: WeekSerializer)
  end
end
