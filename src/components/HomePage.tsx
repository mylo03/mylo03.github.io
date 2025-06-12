import React, { useState } from 'react';
import { Linkedin } from 'lucide-react';
import ProjectGrid from './ProjectGrid';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('finished');

  const handleLinkedInClick = () => {
    window.open('https://linkedin.com/in/your-profile', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              EMILE (MYLO) FARMAN
            </h1>
            <button
              onClick={handleLinkedInClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
              aria-label="Visit LinkedIn Profile"
            >
              <Linkedin 
                size={24} 
                className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200" 
              />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('finished')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'finished'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Finished Projects
            </button>
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'ongoing'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Ongoing Projects
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6 bg-white">
        <ProjectGrid activeTab={activeTab} />
      </main>
    </div>
  );
};

export default HomePage;