// src/lib/config.ts

interface Config {
  apiUrl: string;
  mongodbUri: string;
  jwtSecret: string;
  gmailAppCode: string;
  geminiApiKey: string | null;
  isProduction: boolean;
}

// Default values and fallbacks for when environment variables are missing
const config: Config = {
  // API URL with fallback to local development
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  
  // MongoDB URI with fallback to local development
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/eduapp',
  
  // JWT Secret with fallback to a development secret (will be used only in dev)
  jwtSecret: process.env.JWT_SECRET || 'dev_jwt_secret_do_not_use_in_production',
  
  // Gmail app code (optional)
  gmailAppCode: process.env.GMAIL_APP_CODE || '',
  
  // Gemini API key (optional)
  geminiApiKey: process.env.GEMINI_API_KEY || null,
  
  // Environment check
  isProduction: process.env.NODE_ENV === 'production',
};

// Helper function to check if a required service is configured
export const isServiceConfigured = (serviceName: keyof Config): boolean => {
  switch (serviceName) {
    case 'apiUrl':
      return config.apiUrl !== 'http://localhost:5000/api' || !config.isProduction;
    case 'mongodbUri':
      return config.mongodbUri !== 'mongodb://localhost:27017/eduapp' || !config.isProduction;
    case 'jwtSecret':
      return config.jwtSecret !== 'dev_jwt_secret_do_not_use_in_production' || !config.isProduction;
    case 'gmailAppCode':
      return !!config.gmailAppCode;
    case 'geminiApiKey':
      return !!config.geminiApiKey;
    default:
      return false;
  }
};

// Warning function for development
export const logConfigWarnings = (): void => {
  if (!config.isProduction) {
    if (!isServiceConfigured('mongodbUri')) {
      console.warn('Warning: Using local MongoDB. Set MONGODB_URI for production.');
    }
    if (!isServiceConfigured('jwtSecret')) {
      console.warn('Warning: Using development JWT secret. Set JWT_SECRET for production.');
    }
  }
};

export default config;
