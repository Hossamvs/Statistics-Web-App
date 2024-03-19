import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; 
import Chart from 'chart.js/auto';
import './App.css'

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState(null);
  const [histogramData, setHistogramData] = useState(null);
  const [redhistogramData, setRedHistogramData] = useState(null);
  const [greenhistogramData, setGreenHistogramData] = useState(null);
  const [shouldShowError, setShouldShowError] = useState(false);
  var output =""

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile); 

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload_image', formData);
      console.log(response.data); // Check the Flask response
        output=response.data.message
      setIsUploaded(true);
      setShouldShowError(false);
      const fetchData = async () => {
        // ... Image upload and response fetching ...
  
        if (response.data.histogram) { 
          setHistogramData(response.data.histogram);
        }
      };
      fetchData();
    } catch (error) {
      setError(error);
      setShouldShowError(true);
    }
  };


  return (
    <>
    <h2 className='text-xl m-4 font-bold'>Upload an image</h2>
        <form onSubmit={handleSubmit}>
      <input className='mx-auto block w-1/4  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' type="file" accept="image/*" onChange={handleFileChange} />
      <div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-4">Upload</button>

      </div>
      {isUploaded && <p>{output}</p>}
      {shouldShowError && <p>Error uploading image: {error.message}</p>}
    </form>
    <div className='w-full flex'  > 
    <div className='w-full'>
      {histogramData && (
        <Bar  className='mx-auto' style={{ width: '900px', height: '600px' }}
          data={{ 
            labels: [...Array(768).keys()], // Labels 0 - 767
            datasets: [{
              label: 'Color Histogram',
              data: histogramData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          }}
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Color Intensity (0-255) R (265-521) G (522-767) B',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Pixel Count',
                },
              },
            },
          }}
        />
      )
      }
      </div>
    </div>
    </>

  );
};

export default ImageUpload;
