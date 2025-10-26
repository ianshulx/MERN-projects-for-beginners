import React, { useState, useEffect } from 'react';
import UrlShortener from './components/UrlShortener';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('shortener');
  const [urls, setUrls] = useState([]);

  const fetchUrls = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/urls`);
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const addNewUrl = (newUrl) => {
    setUrls(prev => [...prev, newUrl]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            URL Shortener
          </h1>
          <p className="text-gray-600">
            Transform long URLs into short, shareable links
          </p>
        </header>

        <nav className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-1 flex">
            <button
              onClick={() => setCurrentView('shortener')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                currentView === 'shortener'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              URL Shortener
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                currentView === 'admin'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Admin Panel
            </button>
          </div>
        </nav>

        <main>
          {currentView === 'shortener' ? (
            <UrlShortener onUrlAdded={addNewUrl} />
          ) : (
            <AdminPanel urls={urls} onRefresh={fetchUrls} />
          )}
        </main>

        <footer className="text-center mt-16 text-gray-500">
          <p>&copy; 2025 URL Shortener. Built with React & Express.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;