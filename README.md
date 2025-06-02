# AI-Powered Virtual Try-On

This application allows users to virtually try on clothing using AI models from Hugging Face. It consists of a React frontend and a Python Flask backend.

## Project Structure

```
3d-try-on/
├── backend/           # Python Flask backend
│   ├── app.py         # Main Flask application
│   └── requirements.txt # Python dependencies
├── public/            # React public assets
└── src/               # React source code
    ├── components/    # React components
    ├── pages/         # Page components
    ├── store/         # Redux store
    └── ...            # Other React files
```

## Setup Instructions

### 1. Backend Setup (Python)

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Start the Flask backend:
   ```
   python app.py
   ```
   The backend will run on http://localhost:5000

### 2. Frontend Setup (React)

1. Make sure you're in the project root directory.

2. Install the required dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```
   The frontend will run on http://localhost:3000

## Using the Application

1. Open your browser and navigate to http://localhost:3000
2. You can either upload an image or use your camera to capture an image
3. Select a garment type and color
4. The application will use AI to generate a virtual try-on image

## API Endpoints

### Virtual Try-On API
- **URL**: `/api/try-on`
- **Method**: POST
- **Body**:
  ```json
  {
    "person_image": "base64_encoded_image",
    "garment_type": "tshirt",
    "garment_color": "#1e40af"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "result_image": "base64_encoded_result_image"
  }
  ```

### Body Measurements API
- **URL**: `/api/measurements`
- **Method**: POST
- **Body**:
  ```json
  {
    "person_image": "base64_encoded_image"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "measurements": {
      "height": 175,
      "weight": 70,
      "chest": 95,
      "waist": 80,
      "hips": 95,
      "inseam": 80
    }
  }
  ```

## Hugging Face API Key

The application uses Hugging Face models for the virtual try-on functionality. You'll need to:

1. Create an account on [Hugging Face](https://huggingface.co/)
2. Generate an API key
3. Enter the API key in the application's settings

## Technologies Used

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Python, Flask
- **AI/ML**: Hugging Face Transformers, PyTorch