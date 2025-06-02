from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64
from io import BytesIO
from PIL import Image
import requests
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# API key from environment variable or default
HUGGINGFACE_API_KEY = os.environ.get('HUGGINGFACE_API_KEY', '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')

def base64_to_image(base64_string):
    """Convert base64 string to image"""
    try:
        # Remove data URL prefix if present
        if "base64," in base64_string:
            base64_string = base64_string.split("base64,")[1]
        
        # Decode base64 string to image
        img_data = base64.b64decode(base64_string)
        img = Image.open(BytesIO(img_data))
        return img
    except Exception as e:
        print(f"Error converting base64 to image: {str(e)}")
        raise

def image_to_base64(image):
    """Convert image to base64 string"""
    try:
        buffered = BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        return f"data:image/png;base64,{img_str}"
    except Exception as e:
        print(f"Error converting image to base64: {str(e)}")
        raise

def try_huggingface_api(image, garment_type, garment_color):
    """Try to use Hugging Face API for virtual try-on"""
    try:
        # Use a real, available try-on model
        api_url = "https://api-inference.huggingface.co/models/sayakpaul/stable-diffusion-2-1-unclip"
        
        # Convert image to bytes for API call - ensure RGB mode for JPEG
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        img_byte_arr = BytesIO()
        image.save(img_byte_arr, format='JPEG')
        img_byte_arr.seek(0)
        
        # Create text prompt based on garment type and color
        color_name = get_color_name(garment_color)
        
        # More detailed prompts based on garment type
        if garment_type == 'tshirt':
            prompt = f"high quality photo of a person wearing a {color_name} t-shirt, photorealistic, detailed clothing"
        elif garment_type == 'pants':
            prompt = f"high quality photo of a person wearing {color_name} pants, photorealistic, detailed clothing"
        elif garment_type == 'jacket':
            prompt = f"high quality photo of a person wearing a {color_name} jacket, photorealistic, detailed clothing"
        elif garment_type == 'dress':
            prompt = f"high quality photo of a person wearing a {color_name} dress, photorealistic, detailed clothing"
        else:
            prompt = f"high quality photo of a person wearing {color_name} {garment_type}, photorealistic, detailed clothing"
        
        # Set API headers with token
        headers = {
            "Authorization": f"Bearer {HUGGINGFACE_API_KEY}"
        }
        
        # Create payload for unCLIP model (image-to-image generation)
        payload = {
            "inputs": {
                "image": base64.b64encode(img_byte_arr.getvalue()).decode('utf-8'),
                "prompt": prompt,
                "negative_prompt": "bad quality, blurry, distorted body, unrealistic clothing"
            }
        }
        
        # Call Hugging Face API
        print(f"Calling Hugging Face API with prompt: {prompt}")
        logger.info(f"Calling Hugging Face API with model: sayakpaul/stable-diffusion-2-1-unclip")
        response = requests.post(api_url, headers=headers, json=payload, timeout=60)
        
        if response.status_code == 200:
            # Return image from response
            return Image.open(BytesIO(response.content))
        else:
            logger.warning(f"API call failed: {response.status_code}, {response.text}")
            return None
    except Exception as e:
        logger.error(f"Error calling Hugging Face API: {str(e)}")
        return None

def get_color_name(hex_code):
    """Convert hex color code to a readable color name"""
    # Simple mapping of common color codes
    color_map = {
        '#1e40af': 'navy blue',
        '#334155': 'charcoal',
        '#166534': 'forest green',
        '#9f1239': 'burgundy',
        '#7e22ce': 'royal purple',
        '#c2410c': 'rust orange'
    }
    
    # Return the color name if found, otherwise a generic description
    return color_map.get(hex_code.lower(), "colored")

def simple_try_on(person_image, garment_type, garment_color):
    """Super simple try-on: just overlay a colored shape on the image"""
    try:
        # Create a copy of the image to work with
        result = person_image.copy()
        
        # Create a tinted overlay
        overlay = Image.new('RGBA', result.size, color=(0,0,0,0))
        
        # Draw a colored garment based on type
        from PIL import ImageDraw
        draw = ImageDraw.Draw(overlay)
        
        # Convert hex color to RGB
        color_hex = garment_color.lstrip('#')
        r, g, b = tuple(int(color_hex[i:i+2], 16) for i in (0, 2, 4))
        
        width, height = result.size
        
        # Different garment types get different overlay shapes
        if garment_type == 'tshirt':
            # T-shirt: upper body with sleeves
            # Main torso
            draw.rectangle([(width*0.35, height*0.2), (width*0.65, height*0.45)], 
                          fill=(r, g, b, 180))
            # Left sleeve
            draw.polygon([(width*0.35, height*0.2), (width*0.35, height*0.35), 
                          (width*0.25, height*0.35), (width*0.2, height*0.25)],
                          fill=(r, g, b, 180))
            # Right sleeve
            draw.polygon([(width*0.65, height*0.2), (width*0.65, height*0.35), 
                          (width*0.75, height*0.35), (width*0.8, height*0.25)],
                          fill=(r, g, b, 180))
            
        elif garment_type == 'pants':
            # Pants: two legs
            # Left leg
            draw.rectangle([(width*0.35, height*0.5), (width*0.45, height*0.9)], 
                          fill=(r, g, b, 180))
            # Right leg
            draw.rectangle([(width*0.55, height*0.5), (width*0.65, height*0.9)], 
                          fill=(r, g, b, 180))
            # Waist
            draw.rectangle([(width*0.35, height*0.45), (width*0.65, height*0.5)], 
                          fill=(r, g, b, 180))
            
        elif garment_type == 'jacket':
            # Jacket: wider upper body with lapels
            # Main torso
            draw.rectangle([(width*0.3, height*0.2), (width*0.7, height*0.5)], 
                          fill=(r, g, b, 180))
            # Left sleeve
            draw.polygon([(width*0.3, height*0.2), (width*0.3, height*0.4), 
                          (width*0.2, height*0.4), (width*0.15, height*0.3)],
                          fill=(r, g, b, 180))
            # Right sleeve
            draw.polygon([(width*0.7, height*0.2), (width*0.7, height*0.4), 
                          (width*0.8, height*0.4), (width*0.85, height*0.3)],
                          fill=(r, g, b, 180))
            # Lapels - slightly darker
            dark_r, dark_g, dark_b = int(r*0.8), int(g*0.8), int(b*0.8)
            draw.polygon([(width*0.45, height*0.2), (width*0.5, height*0.35), 
                          (width*0.55, height*0.2)],
                          fill=(dark_r, dark_g, dark_b, 200))
            
        elif garment_type == 'dress':
            # Dress: upper and lower body with a shape
            # Upper part
            draw.rectangle([(width*0.35, height*0.2), (width*0.65, height*0.45)], 
                          fill=(r, g, b, 180))
            # Skirt part - wider at bottom
            trapezoid = [(width*0.35, height*0.45), (width*0.65, height*0.45),
                          (width*0.75, height*0.8), (width*0.25, height*0.8)]
            draw.polygon(trapezoid, fill=(r, g, b, 180))
        
        # Combine the images
        result = Image.alpha_composite(result.convert('RGBA'), overlay)
        result = result.convert('RGB')  # Convert back to RGB
        
        return result
    except Exception as e:
        print(f"Error in simple try-on: {str(e)}")
        # If anything fails, return the original image
        if person_image.mode != 'RGB':
            return person_image.convert('RGB')
        return person_image

@app.route('/api/try-on', methods=['POST'])
def virtual_try_on():
    """API endpoint for virtual try-on"""
    try:
        data = request.json
        
        if not data or 'person_image' not in data:
            return jsonify({"error": "Missing required parameters"}), 400
        
        # Get the person image
        person_image = base64_to_image(data['person_image'])
        
        # Get garment type and color
        garment_type = data.get('garment_type', 'tshirt')
        garment_color = data.get('garment_color', '#1e40af')
        
        print(f"Processing try-on request for {garment_type} in color {garment_color}")
        
        # First try using Hugging Face API
        api_result = try_huggingface_api(person_image, garment_type, garment_color)
        
        # If API call succeeded, use that result
        if api_result:
            print("Successfully used Hugging Face API for try-on")
            result_base64 = image_to_base64(api_result)
            return jsonify({
                "success": True,
                "result_image": result_base64,
                "method": "huggingface_api"
            })
        
        # If API call failed, fall back to simple overlay method
        print("Falling back to simple overlay method")
        result_image = simple_try_on(person_image, garment_type, garment_color)
        
        # Convert result to base64
        result_base64 = image_to_base64(result_image)
        
        return jsonify({
            "success": True,
            "result_image": result_base64,
            "method": "fallback_overlay"
        })
    
    except Exception as e:
        print(f"Error processing try-on request: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/measurements', methods=['POST'])
def process_measurements():
    """API endpoint to return dummy measurements"""
    try:
        data = request.json
        
        if not data or 'person_image' not in data:
            return jsonify({"error": "Missing required parameters"}), 400
        
        # Return dummy measurements
        measurements = {
            "height": 175,  # cm
            "weight": 70,   # kg
            "chest": 95,    # cm
            "waist": 80,    # cm
            "hips": 95,     # cm
            "inseam": 80    # cm
        }
        
        return jsonify({
            "success": True,
            "measurements": measurements
        })
    
    except Exception as e:
        print(f"Error processing measurements: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({
        "status": "healthy",
        "message": "Flask backend is running"
    })

if __name__ == '__main__':
    print("Starting Flask server on http://localhost:5000")
    app.run(debug=True, port=5000) 