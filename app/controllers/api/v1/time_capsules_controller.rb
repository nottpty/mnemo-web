module Api
  module V1
    class TimeCapsulesController < ApplicationController
      skip_before_action :verify_authenticity_token

      def index
        render json: time_capsules_queried,
               current_user: current_user,
               status: :ok
      end

      def create
        time_capsule = TimeCapsule.create(
          user_id: current_user.id,
          wrap_date: time_capsule_params[:time_capsule_detail][:wrap_date],
          open_date: time_capsule_params[:time_capsule_detail][:open_date],
          direct_type: time_capsule_params[:time_capsule_detail][:direct_to].to_sym
        )

        memory_box = MemoryBox.create(subject: time_capsule_params[:time_capsule_detail][:capsule_name],
                                      description: time_capsule_params[:time_capsule_detail][:capsule_detail],
                                      user_id: current_user.id,
                                      time_capsule_id: time_capsule.id)

        time_capsule_params[:time_capsule_detail][:medium].each do |mediaUrl|
          memory_box.medium << Medium.create(
            media_type: :image,
            media_url: mediaUrl,
            user_id: current_user.id
          )
        end

        time_capsule.memory_boxes << memory_box

        render json: time_capsule,
               current_user: current_user,
               status: :ok
      end

      private

      def time_capsules_queried
        return User.find(params[:user_id]).time_capsules if params[:user_id].present?
        return TimeCapsule.all
      end

      def time_capsule_params
        ActiveModelSerializers::Deserialization
          .jsonapi_parse(params, only: permitted_attributes)
      end

      def permitted_attributes
        [:user_id, :time_capsule_detail]
      end
    end
  end
end
