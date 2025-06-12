import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
  category: 'finished' | 'ongoing';
  backgroundColor?: string;
  fullDescription?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageHeight?: 'short' | 'medium' | 'tall' | 'extra-tall';
}

const projects: Project[] = [
  {
    id: 'journey-to-hire',
    title: 'Journey To Hire',
    year: '2024',
    description: 'A comprehensive job application tracking platform designed to help job seekers manage their application process more effectively.',
    fullDescription: 'Journey To Hire is a full-stack web application that helps job seekers track their applications, manage contacts, and stay organized throughout their job search process. The platform features an intuitive dashboard, application status tracking, interview scheduling, and analytics to help users understand their job search patterns and improve their success rate.',
    image: 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'finished',
    backgroundColor: 'bg-slate-800',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://journey-to-hire.com',
    githubUrl: 'https://github.com/username/journey-to-hire'
  },
  {
    id: 'baa-shful-app',
    title: "Don't Be Baa-shful",
    year: '2024',
    description: 'A social platform designed to encourage authentic communication and break down barriers in digital interactions.',
    fullDescription: 'Don\'t Be Baa-shful is an innovative social platform that uses gamification and positive reinforcement to help users overcome social anxiety in digital spaces. The app features conversation starters, confidence-building exercises, and a supportive community environment that encourages genuine connections.',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'finished',
    backgroundColor: 'bg-indigo-700',
    technologies: ['React Native', 'Firebase', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: 'https://dontbe-baashful.app'
  },
  {
    id: 'smart-glasses',
    title: 'Smart Glasses',
    year: '2024',
    description: 'Innovative AR glasses project combining cutting-edge technology with practical everyday applications.',
    fullDescription: 'Smart Glasses represents the intersection of fashion and technology, featuring AR overlays for navigation, real-time translation, and contextual information display. The project involved hardware integration, custom software development, and user experience design for wearable technology.',
    image: 'https://images.pexels.com/photos/8530208/pexels-photo-8530208.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'finished',
    backgroundColor: 'bg-amber-100',
    technologies: ['Unity', 'C#', 'ARCore', 'Computer Vision', 'IoT'],
    githubUrl: 'https://github.com/username/smart-glasses'
  },
  {
    id: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    year: '2024',
    description: 'A modern, scalable e-commerce solution with advanced inventory management and analytics.',
    fullDescription: 'A comprehensive e-commerce platform built for scalability and performance. Features include real-time inventory management, advanced analytics dashboard, multi-vendor support, and integrated payment processing. The platform handles high-volume transactions with robust security measures.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'finished',
    backgroundColor: 'bg-purple-600',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis', 'AWS'],
    liveUrl: 'https://ecommerce-platform.com'
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness Tracker App',
    year: '2024',
    description: 'A comprehensive fitness tracking application with workout planning and progress monitoring.',
    fullDescription: 'A mobile-first fitness application that combines workout tracking, nutrition monitoring, and social features. Users can create custom workout plans, track their progress with detailed analytics, and connect with friends for motivation and accountability.',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'finished',
    backgroundColor: 'bg-red-500',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'HealthKit', 'Google Fit'],
    liveUrl: 'https://fitness-tracker.app'
  },
  {
    id: 'recipe-manager',
    title: 'Recipe Manager',
    year: '2023',
    description: 'A digital cookbook with meal planning, shopping lists, and nutritional information.',
    fullDescription: 'A comprehensive recipe management system that helps users organize their favorite recipes, plan meals, and generate shopping lists. Features include nutritional analysis, dietary restriction filters, and social recipe sharing.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'finished',
    backgroundColor: 'bg-orange-500',
    technologies: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'Elasticsearch'],
    githubUrl: 'https://github.com/username/recipe-manager'
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    year: '2023',
    description: 'An elegant weather application with detailed forecasts and interactive maps.',
    fullDescription: 'A sophisticated weather dashboard featuring real-time weather data, interactive maps, severe weather alerts, and historical weather patterns. The application provides detailed forecasts with beautiful visualizations and customizable widgets.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'finished',
    backgroundColor: 'bg-blue-600',
    technologies: ['React', 'D3.js', 'OpenWeather API', 'Mapbox', 'Chart.js'],
    liveUrl: 'https://weather-dashboard.app'
  },
  {
    id: 'task-automation',
    title: 'Task Automation Suite',
    year: '2023',
    description: 'A powerful automation platform for streamlining repetitive business processes.',
    fullDescription: 'An enterprise-grade automation platform that helps businesses streamline repetitive tasks and workflows. Features include visual workflow builder, API integrations, scheduled tasks, and comprehensive reporting and analytics.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'finished',
    backgroundColor: 'bg-gray-700',
    technologies: ['Node.js', 'Docker', 'Kubernetes', 'RabbitMQ', 'PostgreSQL'],
    githubUrl: 'https://github.com/username/task-automation'
  },
  {
    id: 'music-streaming',
    title: 'Music Streaming Platform',
    year: '2023',
    description: 'A modern music streaming service with personalized playlists and social features.',
    fullDescription: 'A full-featured music streaming platform with high-quality audio streaming, personalized recommendations, social features, and artist tools. The platform supports multiple audio formats and provides detailed listening analytics.',
    image: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'finished',
    backgroundColor: 'bg-pink-600',
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'WebRTC'],
    liveUrl: 'https://music-streaming.app'
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    year: '2023',
    description: 'A responsive portfolio website showcasing creative work with smooth animations.',
    fullDescription: 'A modern portfolio website built with performance and aesthetics in mind. Features include smooth animations, responsive design, optimized images, and an integrated content management system for easy updates.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'finished',
    backgroundColor: 'bg-teal-600',
    technologies: ['Next.js', 'Framer Motion', 'Sanity CMS', 'Vercel', 'TypeScript'],
    liveUrl: 'https://portfolio-website.com'
  },
  {
    id: 'chat-application',
    title: 'Real-time Chat App',
    year: '2023',
    description: 'A secure messaging platform with end-to-end encryption and file sharing.',
    fullDescription: 'A secure real-time messaging application with end-to-end encryption, file sharing, group chats, and voice/video calling capabilities. Built with privacy and security as top priorities.',
    image: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'finished',
    backgroundColor: 'bg-cyan-600',
    technologies: ['React', 'Socket.io', 'Node.js', 'WebRTC', 'MongoDB'],
    githubUrl: 'https://github.com/username/chat-app'
  },
  {
    id: 'learning-platform',
    title: 'Online Learning Platform',
    year: '2023',
    description: 'An interactive e-learning platform with video courses and progress tracking.',
    fullDescription: 'A comprehensive online learning platform featuring video courses, interactive quizzes, progress tracking, and certification systems. The platform supports multiple content types and provides detailed analytics for both students and instructors.',
    image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'finished',
    backgroundColor: 'bg-violet-600',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS S3', 'Stripe'],
    liveUrl: 'https://learning-platform.edu'
  },
  {
    id: 'ai-assistant',
    title: 'AI Personal Assistant',
    year: '2024',
    description: 'An intelligent personal assistant application leveraging machine learning for personalized user experiences.',
    fullDescription: 'This AI-powered personal assistant uses natural language processing and machine learning to provide personalized recommendations, schedule management, and intelligent automation. The system learns from user behavior to become more effective over time.',
    image: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'ongoing',
    backgroundColor: 'bg-emerald-600',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Docker']
  },
  {
    id: 'eco-tracker',
    title: 'Eco Impact Tracker',
    year: '2024',
    description: 'A sustainability tracking application that helps users monitor and reduce their environmental footprint.',
    fullDescription: 'Eco Impact Tracker gamifies environmental consciousness by tracking daily activities and their carbon footprint. Users can set sustainability goals, compete with friends, and access personalized recommendations for reducing their environmental impact.',
    image: 'https://images.pexels.com/photos/9822732/pexels-photo-9822732.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'ongoing',
    backgroundColor: 'bg-green-700',
    technologies: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'Chart.js']
  },
  {
    id: 'blockchain-wallet',
    title: 'Blockchain Wallet',
    year: '2024',
    description: 'A secure cryptocurrency wallet with multi-chain support and DeFi integration.',
    fullDescription: 'A next-generation cryptocurrency wallet supporting multiple blockchains with integrated DeFi features, NFT management, and advanced security measures including hardware wallet integration and multi-signature support.',
    image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'ongoing',
    backgroundColor: 'bg-yellow-500',
    technologies: ['React', 'Web3.js', 'Solidity', 'Node.js', 'Redis']
  },
  {
    id: 'ar-shopping',
    title: 'AR Shopping Experience',
    year: '2024',
    description: 'An augmented reality shopping app that lets users try products virtually before purchasing.',
    fullDescription: 'An innovative AR shopping application that allows users to visualize products in their real environment before making a purchase. Features include 3D product models, virtual try-on capabilities, and seamless e-commerce integration.',
    image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'ongoing',
    backgroundColor: 'bg-rose-600',
    technologies: ['React Native', 'ARKit', 'ARCore', 'Three.js', 'Node.js']
  }
];

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === id);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Return to portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Portfolio</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </div>

        {/* Project Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar size={20} className="text-gray-500" />
            <span className="text-gray-600 font-medium">{project.year}</span>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              project.category === 'finished' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {project.category === 'finished' ? 'Completed' : 'In Progress'}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {project.title}
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {project.fullDescription || project.description}
          </p>

          {/* Technologies */}
          {project.technologies && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                <ExternalLink size={18} />
                <span>View Live Project</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                <ExternalLink size={18} />
                <span>View Code</span>
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;