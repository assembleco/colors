require "zip"
require "zip_file_generator"

class ConfigsController < ApplicationController
  def index
    colors = yaml_for_colors(params[:colors].split(","))

    file = Tempfile.new('scheme')
    file.write(colors)

    output_dir = generate_configs(file.path)
    zipped = zip_directory(output_dir)
    send_file zipped

    File.delete(zipped)
    file.close
    file.unlink
  end

  private

  def yaml_for_colors(colors)
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
    }.to_yaml
  end

  def generate_configs(path)
    `./vendor/base16-builder/base16 -s #{path}`
    "vendor/base16-builder/output"
  end

  def zip_directory(path)
    zipfile_path = "tmp/colors.zip"

    ZipFileGenerator.new(path, zipfile_path).write
    zipfile_path
  end
end
