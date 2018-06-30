class GroupsController < ApplicationController
  def new
  end

  def create
    Group.create(name: group_params[:name], user_id: current_user.id)
    redirect_to "groups/#{group_id}/messages"
  end

  def edit
    @group = group.find(params[:id])
  end

  def update

    redirect_to "groups/#{group_id}/messages"
  end

  private
  def group_params
    params.parmit(:name)
  end

end
