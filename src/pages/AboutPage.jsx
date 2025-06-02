import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const AboutPage = () => {
  const [pageContent, setPageContent] = useState({
    hero: {
      heading: 'Welcome to Kokomatto',
      subheading: 'Revolutionizing the way you shop for clothes with cutting-edge 3D technology.'
    },
    story: {
      heading: 'Our Story',
      content: 'Kokomatto was founded with a simple yet powerful vision: to eliminate the uncertainty of online clothing shopping. We understand the frustration of receiving items that don\'t fit or look as expected, which is why we\'ve developed an innovative 3D virtual try-on solution.\n\nOur team of fashion enthusiasts and technology experts have combined their passions to create a platform that brings the fitting room experience directly to your device. Since our launch, we\'ve been dedicated to continuously improving our technology to provide the most realistic and helpful virtual try-on experience possible.',
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    mission: {
      heading: 'Our Mission',
      content: 'At Kokomatto, we\'re on a mission to transform the online shopping experience by blending the convenience of e-commerce with the confidence of in-store fittings. We believe everyone deserves to feel certain about their clothing purchases, regardless of where they shop from.\n\nWe\'re committed to reducing returns, minimizing waste in the fashion industry, and helping our customers build wardrobes they truly love. Our technology is designed to be inclusive, representing diverse body types and styles to ensure everyone can benefit from our virtual try-on experience.',
      image: 'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    technology: {
      heading: 'Our Technology',
      content: 'Kokomatto\'s virtual try-on platform uses advanced 3D modeling, augmented reality, and machine learning to create a realistic representation of how clothing will look on your body. Our technology accounts for fabric drape, fit, and even movement to give you the most accurate preview possible.',
      features: [
        {
          title: '3D Modeling',
          description: 'Our platform generates detailed 3D models of each garment, capturing the unique properties of different fabrics and construction techniques.'
        },
        {
          title: 'Augmented Reality',
          description: 'Using your device\'s camera, our AR technology lets you see clothing items on your body in real-time, giving you an interactive fitting room experience.'
        },
        {
          title: 'Machine Learning',
          description: 'Our algorithms learn from user data to improve fit recommendations, personalize suggestions, and enhance the accuracy of our virtual try-on experience.'
        }
      ]
    },
    cta: {
      heading: 'Join the Future of Fashion Shopping',
      content: 'Experience the Kokomatto difference today. Shop with confidence, reduce returns, and find clothes that truly fit and flatter your unique body.',
      buttonText: 'Start Shopping',
      buttonLink: '/categories'
    }
  });

  // In a real app, you would fetch the content from an API here
  useEffect(() => {
    // Simulate API call
    const fetchAboutPageContent = async () => {
      try {
        // Fetch content from API
        // const response = await fetch('/api/about-page');
        // const data = await response.json();
        // setPageContent(data);
        
        // For now, we'll just use the default content
        console.log('About page content would be fetched from API in production');
      } catch (error) {
        console.error('Error fetching about page content:', error);
      }
    };
    
    fetchAboutPageContent();
  }, []);

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary tracking-wide uppercase">About Us</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              {pageContent.hero.heading}
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              {pageContent.hero.subheading}
            </p>
          </div>
        </div>

        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  {pageContent.story.heading}
                </h2>
                {pageContent.story.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mt-4 text-lg text-gray-500">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-12 lg:mt-0">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    className="w-full object-cover h-64 lg:h-auto" 
                    src={pageContent.story.image} 
                    alt="Team working together" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
              
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="lg:order-2">
              <h2 className="text-3xl font-extrabold text-gray-900">
                {pageContent.mission.heading}
              </h2>
              {pageContent.mission.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mt-4 text-lg text-gray-500">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-12 lg:mt-0 lg:order-1">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  className="w-full object-cover h-64 lg:h-auto" 
                  src={pageContent.mission.image}
                  alt="Technology innovation" 
                />
              </div>
            </div>
          </div>
        </div>
            
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">{pageContent.technology.heading}</h2>
              <p className="mt-4 text-lg text-gray-500">
                {pageContent.technology.content}
              </p>
            </div>
            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {pageContent.technology.features.map((feature, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {idx === 0 && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        )}
                        {idx === 1 && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        )}
                        {idx === 2 && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        )}
                      </svg>
                    </div>
                    <div className="mt-5">
                      <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">{pageContent.cta.heading}</h2>
            <p className="mt-4 text-lg text-gray-500">
              {pageContent.cta.content}
            </p>
            <div className="mt-8">
              <a href={pageContent.cta.buttonLink} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                {pageContent.cta.buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;