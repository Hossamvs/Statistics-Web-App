import React, { useState } from 'react';
import './App.css'
const ModalWithViews = () => {
    const [activeView, setActiveView] = useState('Text');

    const renderView = () => {
        switch (activeView) {

        }
    };

    return (
        <div className="modal ...">
            <div className="flex justify-around">
            <button class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
  Click me
</button>
                <button >Text</button>
                <button 
                    class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >Image</button>
                <button 
                    className={`... ${activeView === 'CSV' ? 'bg-blue-500 text-white' : ''}`}
                >CSV</button>
            </div>
            <div className="mt-4"> 
                {renderView()}
            </div>
        </div>
    );
};


export default ModalWithViews;