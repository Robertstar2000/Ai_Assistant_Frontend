import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BeakerIcon, CreditCard, Database, FileText, Download } from 'lucide-react';
import { ResearchMode, ResearchType, CitationStyle, ResearchRequest } from '../types/research';
import { saveAs } from 'file-saver';

export default function Dashboard() {
  const { user } = useAuth();
  const userData = user?.user_metadata;
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState<ResearchRequest>({
    mode: 'basic',
    type: 'general',
    citationStyle: 'academic',
    query: ''
  });
  const [result, setResult] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Here you would make an API call to your AI service
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult('Sample research paper content...');
    } catch (error) {
      console.error('Error generating research:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = () => {
    const blob = new Blob([result], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, 'research-paper.md');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BeakerIcon className="h-8 w-8 text-blue-500" />
                <h2 className="ml-3 text-2xl font-bold text-gray-900">
                  Research Dashboard
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Database className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-600">
                    Credits: {userData?.credits || 0}
                  </span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-600">
                    Plan: {userData?.subscription === 'premium' ? 'Premium' : 'Free'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Form */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Research</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Research Mode</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={request.mode}
                    onChange={(e) => setRequest({ ...request, mode: e.target.value as ResearchMode })}
                  >
                    <option value="basic">Basic (1 credit)</option>
                    <option value="advanced">Advanced (2 credits)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Research Type</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={request.type}
                    onChange={(e) => setRequest({ ...request, type: e.target.value as ResearchType })}
                  >
                    <option value="general">General Research</option>
                    <option value="literature">Literature Search</option>
                    <option value="experimental">Experimental Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Citation Style</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={request.citationStyle}
                    onChange={(e) => setRequest({ ...request, citationStyle: e.target.value as CitationStyle })}
                  >
                    <option value="academic">Academic (APA)</option>
                    <option value="web">Web</option>
                    <option value="informal">Informal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Research Query</label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your research query..."
                  value={request.query}
                  onChange={(e) => setRequest({ ...request, query: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="submit"
                  disabled={loading || !request.query}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Generate Research'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Research Results</h3>
                <button
                  onClick={downloadResult}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap">{result}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Research History */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Research History</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Previous Research Title</h4>
                    <p className="text-sm text-gray-500">Generated on March 15, 2024</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}