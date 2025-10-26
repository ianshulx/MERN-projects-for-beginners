import React, { useState } from 'react';

const UrlShortener = ({ onUrlAdded }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!originalUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(originalUrl)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
        if (onUrlAdded) {
          onUrlAdded({
            originalUrl: data.originalUrl,
            shortCode: data.shortCode,
            createdAt: new Date(),
            clicks: 0
          });
        }
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleReset = () => {
    setOriginalUrl('');
    setShortUrl('');
    setError('');
    setCopied(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="originalUrl" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter your long URL
            </label>
            <input
              type="text"
              id="originalUrl"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://www.example.com/very/long/url/path"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-medium text-green-800 mb-3">
              URL Shortened Successfully!
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original URL:
                </label>
                <p className="text-gray-600 break-all bg-white p-2 rounded border">
                  {originalUrl}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shortened URL:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={shortUrl}
                    readOnly
                    className="flex-1 p-2 bg-white border rounded text-blue-600 font-medium"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Shorten another URL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortener;