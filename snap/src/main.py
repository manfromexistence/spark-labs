import base64
from PIL import Image

def image_to_base64_js_var(image_path, var_name="logo_texture"):
  """
  Encodes an image to base64 and creates a JavaScript variable string.

  Args:
      image_path: Path to the image file.
      var_name: Name of the JavaScript variable (default: "logo_texture").

  Returns:
      A string containing the JavaScript variable with base64 encoded image data.
  """
  with open(image_path, "rb") as image_file:
    image_data = image_file.read()
  encoded_image = base64.b64encode(image_data).decode("utf-8")
  return f"this.{var_name} = \"data:image/{Image.open(image_path).format};base64,{encoded_image}\";"

# Example usage
image_path = "snap_logo_sm.png"  # Replace with your image path
var_name = "my_image"  # You can change the variable name here

js_var_string = image_to_base64_js_var(image_path, var_name)

print(js_var_string)
