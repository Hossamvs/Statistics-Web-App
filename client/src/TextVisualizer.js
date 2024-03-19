import React, { useState } from 'react';
import axios from 'axios';
import TSNEVisualization from './TSNEVisualization';


/**
 * TextVisualizer - A React component for text analysis and t-SNE visualization.
 *
 * @prop text {string} - The input text to analyze.
 * @prop result {array} - The t-SNE reduced vectors from the server.
 * @prop key {number} - A unique key to force recreation of the TSNEVisualization component
 */

const TextVisualizer = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [key, setKey] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // Add a loading state
  
    /**
   * handleSubmit - Handles text analysis requests to the backend.
   * 
   * @param {event} event - The form submission event.
   */
    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      try {
        const response = await axios.post('http://127.0.0.1:5000/analyze-text', { text });
        setResult(response.data.reduced_vectors);
        setKey(key + 1);
      } catch (error) {
        console.error('Error:', error);
      } finally{
        setIsLoading(false);
      }

    };
  
    return (
      <div className='mx-auto'>
            <h2 className='text-xl m-4 font-bold'>Enter a paragraph</h2>
        <form onSubmit={handleSubmit}>
          <textarea className="mx-auto w-1/2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"value={text} onChange={(e) => setText(e.target.value)} />
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-4" type="submit">Analyze Text</button>
        </form>
        {isLoading && <p>Analyzing text...</p>}
        {result && <TSNEVisualization key={key} data={result} />}
      </div>
    );
  };


export default TextVisualizer;
