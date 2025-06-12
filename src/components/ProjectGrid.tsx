import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
  hoverImage: string;
  category: 'finished' | 'ongoing';
  backgroundColor?: string;
  imageHeight?: 'short' | 'medium' | 'tall' | 'extra-tall';
}

const projects: Project[] = [
  {
    id: 'journey-to-hire',
    title: 'Journey To Hire',
    year: '2024',
    image: 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'finished',
    backgroundColor: 'bg-slate-800',
    imageHeight: 'medium'
  },
  {
    id: 'baa-shful-app',
    title: "Don't Be Baa-shful",
    year: '2024',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'finished',
    backgroundColor: 'bg-indigo-700',
    imageHeight: 'tall'
  },
  {
    id: 'smart-glasses',
    title: 'Smart Glasses',
    year: '2024',
    description: 'Innovative AR glasses project combining cutting-edge technology with practical everyday applications.',
    image: 'https://images.pexels.com/photos/8530208/pexels-photo-8530208.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/2422280/pexels-photo-2422280.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'finished',
    backgroundColor: 'bg-amber-100',
    imageHeight: 'short'
  },
  {
    id: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    year: '2024',
    description: 'A modern, scalable e-commerce solution with advanced inventory management and analytics.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'finished',
    backgroundColor: 'bg-purple-600',
    imageHeight: 'extra-tall'
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness Tracker App',
    year: '2024',
    description: 'A comprehensive fitness tracking application with workout planning and progress monitoring.',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'finished',
    backgroundColor: 'bg-red-500',
    imageHeight: 'medium'
  },
  {
    id: 'recipe-manager',
    title: 'Recipe Manager',
    year: '2023',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'finished',
    backgroundColor: 'bg-orange-500',
    imageHeight: 'tall'
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    year: '2023',
    description: 'An elegant weather application with detailed forecasts and interactive maps.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'finished',
    backgroundColor: 'bg-blue-600',
    imageHeight: 'short'
  },
  {
    id: 'task-automation',
    title: 'Task Automation Suite',
    year: '2023',
    description: 'A powerful automation platform for streamlining repetitive business processes.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'finished',
    backgroundColor: 'bg-gray-700',
    imageHeight: 'medium'
  },
  {
    id: 'music-streaming',
    title: 'Music Streaming Platform',
    year: '2023',
    description: 'A modern music streaming service with personalized playlists and social features.',
    image: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'finished',
    backgroundColor: 'bg-pink-600',
    imageHeight: 'extra-tall'
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    year: '2023',
    description: 'A responsive portfolio website showcasing creative work with smooth animations.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'finished',
    backgroundColor: 'bg-teal-600',
    imageHeight: 'tall'
  },
  {
    id: 'chat-application',
    title: 'Real-time Chat App',
    year: '2023',
    description: 'A secure messaging platform with end-to-end encryption and file sharing.',
    image: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'finished',
    backgroundColor: 'bg-cyan-600',
    imageHeight: 'short'
  },
  {
    id: 'learning-platform',
    title: 'Online Learning Platform',
    year: '2023',
    description: 'An interactive e-learning platform with video courses and progress tracking.',
    image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'finished',
    backgroundColor: 'bg-violet-600',
    imageHeight: 'medium'
  },
  {
    id: 'ai-assistant',
    title: 'AI Personal Assistant',
    year: '2024',
    description: 'An intelligent personal assistant application leveraging machine learning for personalized user experiences.',
    image: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'ongoing',
    backgroundColor: 'bg-emerald-600',
    imageHeight: 'tall'
  },
  {
    id: 'eco-tracker',
    title: 'Eco Impact Tracker',
    year: '2024',
    description: 'A sustainability tracking application that helps users monitor and reduce their environmental footprint.',
    image: 'https://images.pexels.com/photos/9822732/pexels-photo-9822732.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'ongoing',
    backgroundColor: 'bg-green-700',
    imageHeight: 'medium'
  },
  {
    id: 'blockchain-wallet',
    title: 'Blockchain Wallet',
    year: '2024',
    description: 'A secure cryptocurrency wallet with multi-chain support and DeFi integration.',
    image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'ongoing',
    backgroundColor: 'bg-yellow-500',
    imageHeight: 'extra-tall'
  },
  {
    id: 'ar-shopping',
    title: 'AR Shopping Experience',
    year: '2024',
    description: 'An augmented reality shopping app that lets users try products virtually before purchasing.',
    image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=800',
    hoverImage: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'ongoing',
    backgroundColor: 'bg-rose-600',
    imageHeight: 'short'
  }
];

interface ProjectGridProps {
  activeTab: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ activeTab }) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [masonryLayout, setMasonryLayout] = useState<{ [key: string]: { left: number; top: number; width: number } }>({});
  const [containerHeight, setContainerHeight] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<{ [key: string]: { width: number; height: number } }>({});
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  
  const filteredProjects = projects.filter(project => 
    activeTab === 'finished' ? project.category === 'finished' : project.category === 'ongoing'
  );

  const handleImageLoad = (projectId: string, dimensions: { width: number; height: number }) => {
    setImageDimensions(prev => ({
      ...prev,
      [projectId]: dimensions
    }));
    
    setImagesLoaded(prev => new Set([...prev, projectId]));
  };

  const calculateCardHeight = (project: Project, containerWidth: number) => {
    const dimensions = imageDimensions[project.id];
    if (!dimensions || !containerWidth) return 300; // Default fallback
    
    const aspectRatio = dimensions.height / dimensions.width;
    const imageHeight = containerWidth * aspectRatio;
    
    // Adjust bounds based on screen size for better mobile experience
    const screenWidth = window.innerWidth;
    let minHeight = 150;
    let maxHeight = 500;
    
    // More restrictive bounds on mobile to prevent extremely tall images
    if (screenWidth < 640) {
      minHeight = 120;
      maxHeight = Math.min(400, screenWidth * 0.8); // Max height is 80% of screen width on mobile
    } else if (screenWidth < 1024) {
      minHeight = 140;
      maxHeight = 450;
    }
    
    const boundedImageHeight = Math.max(minHeight, Math.min(maxHeight, imageHeight));
    
    return boundedImageHeight;
  };

  const calculateMasonryLayout = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const screenWidth = window.innerWidth;
    
    // Responsive gap - smaller on mobile
    let gap = 16;
    if (screenWidth < 640) {
      gap = 12; // Smaller gap on mobile for better space utilization
    }
    
    // Force 2 columns on mobile phones, more on larger screens
    let columns = 2; // Default to 2 columns for mobile
    if (screenWidth >= 1536) columns = 5; // 2xl
    else if (screenWidth >= 1280) columns = 4; // xl
    else if (screenWidth >= 1024) columns = 3; // lg
    else columns = 2; // sm and below - always 2 columns on mobile
    
    const columnWidth = (containerWidth - (gap * (columns - 1))) / columns;
    const columnHeights = new Array(columns).fill(0);
    const layout: { [key: string]: { left: number; top: number; width: number } } = {};

    filteredProjects.forEach((project) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      // Calculate position
      const left = shortestColumnIndex * (columnWidth + gap);
      const top = columnHeights[shortestColumnIndex];
      
      layout[project.id] = { left, top, width: columnWidth };
      
      // Update column height with dynamic card height
      const cardHeight = calculateCardHeight(project, columnWidth);
      columnHeights[shortestColumnIndex] += cardHeight + gap;
    });

    setMasonryLayout(layout);
    setContainerHeight(Math.max(...columnHeights));
  };

  // Recalculate layout when images load or window resizes
  useEffect(() => {
    calculateMasonryLayout();
  }, [filteredProjects, activeTab, imageDimensions, imagesLoaded]);

  useEffect(() => {
    const handleResize = () => {
      calculateMasonryLayout();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imageDimensions]);

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full transition-all duration-300 ease-out"
      style={{ height: `${containerHeight}px` }}
    >
      {filteredProjects.map((project) => {
        const position = masonryLayout[project.id];
        if (!position) return null;

        return (
          <div
            key={project.id}
            className="absolute transition-all duration-300 ease-out"
            style={{
              left: `${position.left}px`,
              top: `${position.top}px`,
              width: `${position.width}px`,
            }}
          >
            <ProjectCard
              project={project}
              onClick={() => handleProjectClick(project.id)}
              containerWidth={position.width}
              onImageLoad={handleImageLoad}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectGrid;