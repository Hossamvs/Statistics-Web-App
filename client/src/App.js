import React, {useState, useEffect} from 'react'
import ImageUpload from './ImageUpload';
import './App.css'
import TextVisualizer from './TextVisualizer'
import CSVAnalyzer from './csvanalyzer';
function App(){

  const [activeComponent, setActiveComponent] = useState('imageUpload'); // Initial state
  useEffect(()=>{
    fetch('http://127.0.0.1:5000/hello')
    .then(response=>response.json())
    .then(data=>{console.log(data)
      setMessage(data.message)}
    )
    .catch(err=>console.log(err))


  },[])

  const [message, setMessage] = useState('')

  const handleImageUploadClick = () => {
    setActiveComponent('imageUpload');
  };
  
  const handleTextVisualizerClick = () => {
    setActiveComponent('textVisualizer');
  };
  
  const handleCSVAnalyzerClick = () => {
    setActiveComponent('csvAnalyzer');
  };

  return (
    <>
      <h1 className='text-center text-6xl mt-10 '>{message}</h1>
      <div className='text-center '>
      <button onClick={handleImageUploadClick} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-4">Image Upload</button>
    <button onClick={handleTextVisualizerClick} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-4">Text Visualizer</button>
    <button onClick={handleCSVAnalyzerClick} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-4">CSV Analyzer</button>
      </div>


    <div className='text-center ' >
      {activeComponent === 'imageUpload' && <ImageUpload />}
      {activeComponent === 'textVisualizer' && <TextVisualizer />}
      {activeComponent === 'csvAnalyzer' && <CSVAnalyzer />}
    </div>

    </>

  )
}


export default App