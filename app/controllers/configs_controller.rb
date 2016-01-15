class ConfigsController < ApplicationController
  def index
    # TODO: set up https://github.com/chriskempson/base16-builder
    render text: params[:colors].split(",")
  end
end
