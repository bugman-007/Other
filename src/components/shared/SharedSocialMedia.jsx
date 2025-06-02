import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok, FaYoutube } from 'react-icons/fa';

/**
 * SharedSocialMedia component displays social media icons with links
 * @param {Object} props Component props
 * @param {string} props.variant - Display variant: 'header' | 'footer' | 'sidebar'
 * @param {string} props.language - Current language (if not provided, will use browser language)
 */
const SharedSocialMedia = ({ variant = 'footer', language }) => {
  const [currentLanguage, setCurrentLanguage] = useState(language || 'en');
  const [userCountry, setUserCountry] = useState(null);

  // Get user's country based on IP for language-specific social media
  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        // Use a geo-location API to detect user's country
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserCountry(data.country_code);
        
        // If language is not explicitly set, try to determine from IP
        if (!language) {
          const countryToLanguage = {
            'US': 'en',
            'GB': 'en',
            'CA': 'en',
            'FR': 'fr',
            'ES': 'es',
            'DE': 'de',
            'IT': 'it',
            'JP': 'ja',
            'CN': 'zh',
            'RU': 'ru'
            // Add more country to language mappings as needed
          };
          
          if (countryToLanguage[data.country_code]) {
            setCurrentLanguage(countryToLanguage[data.country_code]);
          }
        }
      } catch (error) {
        console.error("Error detecting user's country:", error);
      }
    };
    
    detectUserCountry();
  }, [language]);

  // Define social media links with language-specific URLs
  const getSocialLinks = () => {
    // Base URLs (English)
    const baseLinks = {
      facebook: 'https://facebook.com/kokomatto',
      instagram: 'https://instagram.com/kokomatto',
      twitter: 'https://twitter.com/kokomatto',
      tiktok: 'https://tiktok.com/@kokomatto',
      youtube: 'https://youtube.com/kokomatto'
    };
    
    // Language-specific social media URLs
    const languageSpecificLinks = {
      'fr': {
        facebook: 'https://facebook.com/kokomatto.fr',
        instagram: 'https://instagram.com/kokomatto.fr',
        twitter: 'https://twitter.com/kokomatto_fr',
        tiktok: 'https://tiktok.com/@kokomatto_fr',
        youtube: 'https://youtube.com/kokomatto_fr'
      },
      'es': {
        facebook: 'https://facebook.com/kokomatto.es',
        instagram: 'https://instagram.com/kokomatto.es',
        twitter: 'https://twitter.com/kokomatto_es',
        tiktok: 'https://tiktok.com/@kokomatto_es',
        youtube: 'https://youtube.com/kokomatto_es'
      },
      'de': {
        facebook: 'https://facebook.com/kokomatto.de',
        instagram: 'https://instagram.com/kokomatto.de',
        twitter: 'https://twitter.com/kokomatto_de',
        tiktok: 'https://tiktok.com/@kokomatto_de',
        youtube: 'https://youtube.com/kokomatto_de'
      },
      // Add more language-specific social media URLs as needed
    };
    
    return currentLanguage !== 'en' && languageSpecificLinks[currentLanguage]
      ? languageSpecificLinks[currentLanguage]
      : baseLinks;
  };

  const socialLinks = getSocialLinks();
  
  // Style configurations for different variants
  const getVariantStyles = () => {
    switch(variant) {
      case 'header':
        return {
          container: 'flex items-center space-x-3',
          icon: 'text-white hover:text-gray-300 transition-colors w-5 h-5'
        };
      case 'sidebar':
        return {
          container: 'flex flex-col space-y-5 py-2',
          icon: 'w-6 h-6 transition-transform hover:scale-110'
        };
      case 'footer':
      default:
        return {
          container: 'flex items-center space-x-5 mt-3',
          icon: 'w-6 h-6 text-gray-400 transition-all duration-200'
        };
    }
  };
  
  const styles = getVariantStyles();
  
  // Social brand colors for hover effects
  const getBrandColor = (platform) => {
    switch(platform) {
      case 'facebook': return 'hover:text-blue-600';
      case 'instagram': return 'hover:text-pink-600';
      case 'twitter': return 'hover:text-blue-400';
      case 'tiktok': return 'hover:text-white';
      case 'youtube': return 'hover:text-red-600';
      default: return 'hover:text-white';
    }
  };
  
  return (
    <div className={styles.container}>
      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transform transition-transform hover:scale-110">
        <FaFacebookF className={`${styles.icon} ${getBrandColor('facebook')}`} />
      </a>
      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transform transition-transform hover:scale-110">
        <FaInstagram className={`${styles.icon} ${getBrandColor('instagram')}`} />
      </a>
      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="transform transition-transform hover:scale-110">
        <FaTwitter className={`${styles.icon} ${getBrandColor('twitter')}`} />
      </a>
      <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="transform transition-transform hover:scale-110">
        <FaTiktok className={`${styles.icon} ${getBrandColor('tiktok')}`} />
      </a>
      <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transform transition-transform hover:scale-110">
        <FaYoutube className={`${styles.icon} ${getBrandColor('youtube')}`} />
      </a>
    </div>
  );
};

export default SharedSocialMedia; 