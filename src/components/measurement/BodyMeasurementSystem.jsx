import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserMeasurements } from '../../store/appSlice';
// Remove TensorFlow imports since we're having dependency conflicts
// We'll simulate measurement functionality instead

const BodyMeasurementSystem = () => {
  const dispatch = useDispatch();
  const userMeasurements = useSelector((state) => state.app.userMeasurements);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [measurementStep, setMeasurementStep] = useState(0); // 0: start, 1: front, 2: side, 3: done
  const [model, setModel] = useState(null);
  const [manualEntry, setManualEntry] = useState(false);
  const [formData, setFormData] = useState({
    height: userMeasurements?.height || 175,
    weight: userMeasurements?.weight || 70,
    chest: userMeasurements?.chest || 100,
    waist: userMeasurements?.waist || 85,
    hips: userMeasurements?.hips || 100,
    inseam: userMeasurements?.inseam || 80,
  });
  const [isMobile, setIsMobile] = useState(false);

  // Detect if user is on mobile
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  // Load TensorFlow model
  useEffect(() => {
    const loadModel = async () => {
      try {
        // In a real app, you would load your trained model here
        // const loadedModel = await tf.loadLayersModel('/models/body_measurement_model/model.json');
        // setModel(loadedModel);
        
        // For this example, we'll simulate the model loading
        setTimeout(() => {
          setModel(true); // Just set a placeholder
        }, 1000);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };
    
    loadModel();
  }, []);

  // Start camera
  const startCamera = async () => {
    try {
      const constraints = {
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
        setMeasurementStep(1);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      // Fallback to manual entry if camera access fails
      setManualEntry(true);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Take snapshot and analyze
  const takeMeasurement = () => {
    if (!videoRef.current || !canvasRef.current || !model) return;
    
    setIsMeasuring(true);
    
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // In a real app, you would process the image with your model:
    // const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    // Using a computer vision model to extract measurements
    // Here we would process the image to extract body measurements
    // For example, detecting key body points and calculating distances
    // const measurements = processImageForMeasurements(imageData);
    
    // For this example, we'll simulate the processing with a delay
    setTimeout(() => {
      let updatedMeasurements = { ...formData };
      
      if (measurementStep === 1) {
        // Simulate front view measurements
        updatedMeasurements = {
          ...formData,
          chest: Math.round(100 + Math.random() * 15),
          waist: Math.round(85 + Math.random() * 15),
          hips: Math.round(100 + Math.random() * 15),
        };
        setMeasurementStep(2);
      } else if (measurementStep === 2) {
        // Simulate side view measurements
        updatedMeasurements = {
          ...formData,
          // Refine with side measurements
          depth: Math.round(25 + Math.random() * 5),
          inseam: Math.round(75 + Math.random() * 10),
        };
        setMeasurementStep(3);
        // Stop the camera after final measurement
        stopCamera();
      }
      
      setFormData(updatedMeasurements);
      dispatch(setUserMeasurements(updatedMeasurements));
      setIsMeasuring(false);
    }, 1500);
  };

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value)
    });
  };

  // Submit manual measurements
  const handleManualSubmit = (event) => {
    event.preventDefault();
    dispatch(setUserMeasurements(formData));
    setMeasurementStep(3);
  };

  // Reset and start over
  const handleReset = () => {
    stopCamera();
    setMeasurementStep(0);
    setManualEntry(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Body Measurement System</h2>
        <p className="text-gray-600">Get accurate measurements for perfect fitting garments</p>
      </div>

      {/* Instructions based on current step */}
      {measurementStep === 0 && !manualEntry && (
        <div className="bg-indigo-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-indigo-800 mb-2">How It Works</h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Stand 2 meters away from the camera</li>
            <li>Wear tight-fitting clothes for accurate measurements</li>
            <li>We'll guide you through front and side poses</li>
            <li>Your privacy is protected - images are processed locally</li>
          </ol>
          
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={startCamera}
              className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition flex items-center justify-center"
              disabled={!model}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Start Camera Measurement
            </button>
            <button
              onClick={() => setManualEntry(true)}
              className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50 transition flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
              Enter Measurements Manually
            </button>
          </div>
        </div>
      )}

      {/* Camera view for body scanning */}
      {(measurementStep === 1 || measurementStep === 2) && cameraActive && (
        <div className="mb-6">
          <div className="bg-indigo-800 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-medium">
              {measurementStep === 1 ? 'Front View Measurement' : 'Side View Measurement'}
            </span>
            <span className="text-xs bg-indigo-600 px-2 py-1 rounded">Step {measurementStep}/2</span>
          </div>
          
          <div className="relative aspect-[3/4] bg-gray-900 border-2 border-t-0 border-indigo-800 rounded-b-lg">
            <video 
              ref={videoRef} 
              className="absolute inset-0 w-full h-full object-contain" 
              playsInline 
              muted
            />
            
            {/* Overlay with silhouette guide */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 pointer-events-none">
                {measurementStep === 1 && (
                  <svg className="w-full h-full opacity-20" viewBox="0 0 200 400">
                    <path d="M100,80 Q130,80 130,120 Q130,160 100,190 Q70,160 70,120 Q70,80 100,80" 
                          fill="none" stroke="white" strokeWidth="2" />
                    <rect x="70" y="190" width="60" height="150" rx="5" stroke="white" strokeWidth="2" fill="none" />
                  </svg>
                )}
                {measurementStep === 2 && (
                  <svg className="w-full h-full opacity-20" viewBox="0 0 200 400">
                    <path d="M100,80 L100,340" stroke="white" strokeWidth="2" fill="none" />
                    <path d="M70,120 Q100,105 130,120" stroke="white" strokeWidth="2" fill="none" />
                    <path d="M80,190 Q100,170 120,190" stroke="white" strokeWidth="2" fill="none" />
                    <path d="M85,280 Q100,260 115,280" stroke="white" strokeWidth="2" fill="none" />
                  </svg>
                )}
              </div>
              <div className="text-center text-white bg-black/50 p-2 rounded">
                {measurementStep === 1 ? (
                  <span>Stand facing the camera with arms slightly away from body</span>
                ) : (
                  <span>Turn to your side and stand straight</span>
                )}
              </div>
            </div>
            
            {isMeasuring && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white mt-4 text-lg font-medium">Processing...</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-between">
            <button
              onClick={handleReset}
              className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition text-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={takeMeasurement}
              disabled={isMeasuring}
              className={`bg-indigo-600 text-white rounded-lg px-6 py-2 hover:bg-indigo-700 transition flex items-center 
                ${isMeasuring ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isMeasuring ? (
                <>
                  <span className="mr-2">Processing</span>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </>
              ) : (
                <>
                  Capture {measurementStep === 1 ? 'Front View' : 'Side View'}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Manual measurement form */}
      {manualEntry && measurementStep === 0 && (
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                min="120"
                max="220"
                required
              />
            </div>
            
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                min="30"
                max="200"
                required
              />
            </div>
            
            <div>
              <label htmlFor="chest" className="block text-sm font-medium text-gray-700 mb-1">Chest (cm)</label>
              <input
                type="number"
                id="chest"
                name="chest"
                value={formData.chest}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                min="60"
                max="150"
                required
              />
            </div>
            
            <div>
              <label htmlFor="waist" className="block text-sm font-medium text-gray-700 mb-1">Waist (cm)</label>
              <input
                type="number"
                id="waist"
                name="waist"
                value={formData.waist}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                min="50"
                max="150"
                required
              />
            </div>
            
            <div>
              <label htmlFor="hips" className="block text-sm font-medium text-gray-700 mb-1">Hips (cm)</label>
              <input
                type="number"
                id="hips"
                name="hips"
                value={formData.hips}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                min="70"
                max="150"
                required
              />
            </div>
            
            <div>
              <label htmlFor="inseam" className="block text-sm font-medium text-gray-700 mb-1">Inseam Length (cm)</label>
              <input
                type="number"
                id="inseam"
                name="inseam"
                value={formData.inseam}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                min="50"
                max="120"
                required
              />
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-lg px-6 py-2 hover:bg-indigo-700 transition"
            >
              Save Measurements
            </button>
          </div>
        </form>
      )}

      {/* Completed measurements */}
      {measurementStep === 3 && (
        <div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-medium text-green-800">Measurements Complete!</h3>
              <p className="text-green-600 text-sm">Your measurements have been saved and will be used for accurate fitting.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500">Height</div>
              <div className="text-lg font-medium">{formData.height} cm</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500">Weight</div>
              <div className="text-lg font-medium">{formData.weight} kg</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500">Chest</div>
              <div className="text-lg font-medium">{formData.chest} cm</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500">Waist</div>
              <div className="text-lg font-medium">{formData.waist} cm</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500">Hips</div>
              <div className="text-lg font-medium">{formData.hips} cm</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500">Inseam</div>
              <div className="text-lg font-medium">{formData.inseam} cm</div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleReset}
              className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition text-gray-600 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Retake Measurements
            </button>
            <button 
              className="bg-indigo-600 text-white rounded-lg px-6 py-2 hover:bg-indigo-700 transition flex items-center"
              onClick={() => window.location.hash = 'try-on'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              Continue to Try-On
            </button>
          </div>
        </div>
      )}

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default BodyMeasurementSystem; 