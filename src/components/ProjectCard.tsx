import React, { useState, useEffect, useRef } from 'react';

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

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  containerWidth: number;
  onImageLoad?: (id: string, dimensions: { width: number; height: number }) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, containerWidth, onImageLoad }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      const dimensions = { width: naturalWidth, height: naturalHeight };
      setImageDimensions(dimensions);
      setImageLoaded(true);
      
      // Notify parent component of image dimensions
      if (onImageLoad) {
        onImageLoad(project.id, dimensions);
      }
    }
  };

  // Calculate container height based on image aspect ratio and container width
  const getContainerHeight = () => {
    if (!imageDimensions || !containerWidth) return 240; // Default fallback
    
    const aspectRatio = imageDimensions.height / imageDimensions.width;
    const calculatedHeight = containerWidth * aspectRatio;
    
    // Responsive bounds based on screen size
    const screenWidth = window.innerWidth;
    let minHeight = 150;
    let maxHeight = 500;
    
    // More restrictive bounds on mobile
    if (screenWidth < 640) {
      minHeight = 120;
      maxHeight = Math.min(400, screenWidth * 0.8); // Prevent images from being too tall on mobile
    } else if (screenWidth < 1024) {
      minHeight = 140;
      maxHeight = 450;
    }
    
    return Math.max(minHeight, Math.min(maxHeight, calculatedHeight));
  };

  const containerHeight = getContainerHeight();

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer transform transition-transform duration-200 hover:scale-[1.01] hover:shadow-lg"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-200">
        {/* Image Container - Full Card */}
        <div 
          className="relative overflow-hidden bg-gray-50"
          style={{ 
            height: imageLoaded ? `${containerHeight}px` : '240px',
            transition: 'height 0.3s ease-out'
          }}
        >
          {/* Hidden image for dimension calculation */}
          <img
            ref={imgRef}
            src={project.image}
            alt=""
            className="absolute opacity-0 pointer-events-none"
            onLoad={handleImageLoad}
          />
          
          {/* Visible image */}
          <img
            src={isHovered ? project.hoverImage : project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-opacity duration-300 ease-out"
            style={{ 
              objectPosition: 'center'
            }}
          />
          
          {/* Subtle hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-200" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;