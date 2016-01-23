# Base16 Builder (https://github.com/chriskempson/base16-builder)

require "securerandom"
require "yaml"
require "open-uri"
require "erb"
require "base64"

require "zip"

class Theme
  BASE_PATH = Rails.root.join("vendor/base16-builder")

  attr_accessor :template

  def initialize(scheme_data)
    @template_dir = File.join(BASE_PATH, "templates")
    @scheme_data = scheme_data
  end

  def build
    populate_template_variables(scheme_data)
    create_output_files
  end

  attr_reader :scheme_data

  def build_single_template(template_dir)
    @template_dir = File.join(BASE_PATH, "templates", template_dir)
  rescue StandardError
    abort(read_error_message(@template_dir))
  end

  def read_template_dir
    Dir.glob(File.join(@template_dir, '**', '*.erb'))
  rescue StandardError
    abort(read_error_message(@template_dir))
  end

  def read_template_file(template_file)
    File.read(template_file)
  rescue StandardError
    abort(read_error_message(template_file))
  end

  def populate_template_variables(scheme_data)
    # Define ERB vars
    @scheme = scheme_data["scheme"]
    @author = scheme_data["author"]
    @slug = slug(scheme_data["scheme"])

    # Define ERB color vars
    @base = {}
    [
      "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B",
      "0C", "0D", "0E", "0F"
    ].each do |key|
      hex = scheme_data["base" + key];
      @base[key] = {
        "hex" => hex,
        "hexbgr" => to_hex_bgr(hex),
        "dhex" => to_dhex(hex),
        "rgb" => to_rgb(hex),
        "srgb" => to_srgb(hex)
      }
    end
  end

  def create_output_files
    buffer = Zip::OutputStream.write_buffer do |zf|
      read_template_dir.each do |template_file|
        contents = parse_template_file(template_file)

        filename = template_file.sub(/^#{@template_dir}/, "").sub(/\.erb$/, "")

        zf.put_next_entry("colors/#{filename}")
        zf.write(contents)
      end
    end

    buffer.string
  end

  def parse_template_file(template_file)
    # Define ERB vars
    @uuid = SecureRandom.uuid

    template_contents = read_template_file(template_file)
    parsed = ERB.new(template_contents)

    return parsed.result(binding)
  end

  def slug(string)
    string.downcase.strip.gsub(' ', '.').gsub(/[^\w-]/, '')
  end

  def to_hex_bgr(hex)
    hex.scan(/../).reverse.join
  end

  def to_dhex(hex)
    hex.scan(/../).map {|color| color + color}.join
  end

  def to_rgb(hex)
    hex.scan(/../).map {|color| color.to_i(16)}
  end

  def to_srgb(hex)
    hex.scan(/../).map {|color| color.to_i(16).to_f / 255 }
  end

  def split_by_slash(hex)
    hex.scan(/.{1,2}/).join('/')
  end

  def read_error_message(file)
    "Error reading #{file}"
  end

  # Mix two given colors. The code is borrowed from
  # [SASS](https://github.com/sass/sass/blob/b409aad5fb34f363cec426f2102dd7005e1a45a6/lib/sass/script/functions.rb#L1300).
  #
  # The original algorithm has been modified somewhat, removing all
  # consideration of an alpha channel (as Base16 does not support it.)
  #
  # @param color_1 [Array] A RGB triplet (e.g. [24,24,178]) of the original color
  # @param color_2 [Array] A RGB triplet (e.g. [0,0,0]) of the mixer color
  # @param weight [Fixnum] Relative weight of each color, 0-100. Closer to 0
  #   gives more weight to color_1, while closer to 100 gives more weight to
  #   color_2. Defaults to 50, which is an even balance.
  def mix(color_1, color_2, weight = 50)
    # This algorithm factors in both the user-provided weight (w) and the
    # difference between the alpha values of the two colors (a) to decide how
    # to perform the weighted average of the two RGB values.
    #
    # It works by first normalizing both parameters to be within [-1, 1],
    # where 1 indicates "only use color_1", -1 indicates "only use color_2", and
    # all values in between indicated a proportionately weighted average.
    #
    # Once we have the normalized variables w and a, we apply the formula
    # (w + a)/(1 + w*a) to get the combined weight (in [-1, 1]) of color_1.
    # This formula has two especially nice properties:
    #
    # * When either w or a are -1 or 1, the combined weight is also that number
    # (cases where w * a == -1 are undefined, and handled as a special case).
    #
    # * When a is 0, the combined weight is w, and vice versa.
    #
    # Finally, the weight of color_1 is renormalized to be within [0, 1]
    # and the weight of color_2 is given by 1 minus the weight of color_1.
    p = (weight/100.0).to_f
    w = p*2 - 1

    w1 = (w + 1)/2.0
    w2 = 1 - w1

    rgb = color_1.zip(color_2).map {|v1, v2| (v1*w1 + v2*w2).to_i}
    rgb
  end

  # Add a bit of 'white' to a color. White is defined by color 7, the end of the
  # gray scale in a color scheme. (This is usually #FFFFFF, or close.)
  #
  # @param color [Array] The RGB triplet of the color to be modified.
  # @param weight [Fixnum] The color weight. See #mix for more information.
  def tint(color, weight = 50)
    mix(@base['07']['rgb'], color, weight)
  end

  # Add a bit of 'black' to a color. White is defined by color 0, the end of the
  # gray scale in a color scheme. (This is usually #000000, or close.)
  #
  # @param color [Array] The RGB triplet of the color to be modified.
  # @param weight [Fixnum] The color weight. See #mix for more information.
  def shade(color, weight = 50)
    mix(@base['00']['rgb'], color, weight)
  end
end

# Provide starts_with? method borrowed from Rails
class String
  def starts_with?(prefix)
    prefix = prefix.to_s
    self[0, prefix.length] == prefix
  end
end
