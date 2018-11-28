require "rails_helper"

RSpec.describe Api::V1::CohortsController, type: :controller do

  xdescribe "POST#create" do
    it "creates a new cohort" do
      post_json = { name: "Boston 22" }.to_json

      post(:create, body: post_json)
      expect(Cohort.count).to change_by 1
    end

    it "returns the created cohort data" do
      post_json = { name: "Boston 22" }.to_json

      post(:create, body: post_json)

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json.name).to eq post_json["name"]
      expect(returned_json.id).to be_kind_of(Integer)
    end
  end
end
