class Api::V1::WeeksController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def update
    grouping = Grouping.find(params[:groupingId])
    grouping.group_id = params[:newGroupId]
    if grouping.save
      render json: Week.find(params[:id])
    end
  end
end
