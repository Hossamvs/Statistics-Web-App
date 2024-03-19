import React, { useState } from 'react';
import axios from 'axios'; 

/**
 * CSVAnalyzer - Analyzes an uploaded CSV file and displays descriptive statistics.
 */

function CSVAnalyzer() {
  const [csvFile, setCsvFile] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles changes to the CSV file input.
   * @param {event} event - The file input change event.
   */
  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  /**
   * Handles submission of the CSV file for analysis.
   * @param {event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', csvFile);

      const response = await axios.post('http://127.0.0.1:5000/analyze-csv', formData);
      setAnalysisResults(response.data);
    } catch (error) {
      // Handle specific backend errors if possible
      setError(`Error: ${error.response.status} - ${error.response.data.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=''>
      <h2 className='text-xl m-4 font-bold'>Upload a csv file</h2>

      <form onSubmit={handleSubmit}>
        
        <input className='mx-auto block w-1/4  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' type="file" accept=".csv" onChange={handleFileChange} />
        <div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-4" disabled={!csvFile}>Analyze</button>
        </div>
      </form>

      {isLoading && <p>Loading analysis...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {analysisResults && (
        <table className='mx-auto w-1/2 text-l text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
          <thead className='text-l text-gray-700 uppercase bg-gray-50  dark:bg-gray-700 dark:text-gray-400 '> 
            <tr>
              <th className='px-6 py-3'>Feature</th>
              <th className='px-6 py-3'>Count</th>
              <th className='px-6 py-3'>Mean</th>
              <th className='px-6 py-3'>std</th>
              {/* Add more statistics headers */}
            </tr>
          </thead>
          <tbody className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            {Object.keys(analysisResults).map((feature) => (
              <tr key={feature} className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                <td className='px-6 py-4'>{feature}</td>
                <td className='px-6 py-4'>{analysisResults[feature].count}</td>
                <td className='px-6 py-4'>{analysisResults[feature].mean}</td>
                <td className='px-6 py-4'>{analysisResults[feature].std}</td>
                {/* Add more statistics cells */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CSVAnalyzer;
