require "zip"
require "zip_file_generator"

class ConfigsController < ApplicationController
  def index
    colors = config_for_colors(params[:colors].split(","))

    zipped_output_dir = generate_configs(colors)
    send_data(zipped_output_dir, filename: "colors.zip")
  end

  private

  def config_for_colors(colors)
    {
      "scheme" => "Colors",
      "author" => "Grayson Wright",
      "base00" => colors[0],
      "base01" => colors[1],
      "base02" => colors[2],
      "base03" => colors[3],
      "base04" => colors[4],
      "base05" => colors[5],
      "base06" => colors[6],
      "base07" => colors[7],
      "base08" => colors[8],
      "base09" => colors[9],
      "base0A" => colors[10],
      "base0B" => colors[11],
      "base0C" => colors[12],
      "base0D" => colors[13],
      "base0E" => colors[14],
      "base0F" => colors[15],
    }
  end

  def generate_configs(colors)
    Theme.new(colors).build
  end

  def zip_directory(path)
    zipfile_path = "tmp/colors.zip"

    ZipFileGenerator.new(path, zipfile_path).write
    zipfile_path
  end
end
