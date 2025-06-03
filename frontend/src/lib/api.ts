// src/lib/api.ts

import config from './config';

/**
 * Wrapper for fetch API with error handling and optional authentication
 */
export async function fetchWithAuth(
  endpoint: string, 
  options: RequestInit = {}, 
  requiresAuth: boolean = true
): Promise<any> {
  try {
    // Prepare URL
    const url = `${config.apiUrl}${endpoint}`;
    
    // Get auth token if needed
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (requiresAuth) {
      // Get token from localStorage (only in browser)
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (token) {
        headers = {
          ...headers,
          'Authorization': `Bearer ${token}`
        };
      } else {
        console.warn('Authentication required but no token found');
        // Continue without token - the API will handle unauthorized requests
      }
    }
    
    // Make the request
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    // Parse JSON response if possible
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    // Handle error responses
    if (!response.ok) {
      // Create error with response data
      const error = new Error(
        typeof data === 'string' ? data : data.message || 'API request failed'
      );
      throw Object.assign(error, { status: response.status, data });
    }
    
    return data;
  } catch (error) {
    // Handle network errors or other exceptions
    if (!navigator.onLine) {
      console.error('Network error: Please check your internet connection');
      // Return fallback data or throw a user-friendly error
      return { error: 'Network error', offline: true };
    }
    
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * API client with methods for different endpoints
 */
const api = {
  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      try {
        return await fetchWithAuth('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        }, false);
      } catch (error) {
        console.error('Login failed:', error);
        return { success: false, message: 'Login failed. Please try again.' };
      }
    },
    
    register: async (userData: any) => {
      try {
        return await fetchWithAuth('/auth/register', {
          method: 'POST',
          body: JSON.stringify(userData),
        }, false);
      } catch (error) {
        console.error('Registration failed:', error);
        return { success: false, message: 'Registration failed. Please try again.' };
      }
    },
    
    getProfile: async () => {
      try {
        return await fetchWithAuth('/auth/me');
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        return { success: false, message: 'Failed to load profile' };
      }
    }
  },
  
  // Subjects endpoints
  subjects: {
    getAll: async (classLevel: number) => {
      try {
        return await fetchWithAuth(`/subjects?class=${classLevel}`);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
        // Return empty array as fallback
        return { success: false, data: [], message: 'Failed to load subjects' };
      }
    }
  },
  
  // Chapters endpoints
  chapters: {
    getBySubject: async (subjectId: string) => {
      try {
        return await fetchWithAuth(`/subjects/${subjectId}/chapters`);
      } catch (error) {
        console.error('Failed to fetch chapters:', error);
        // Return empty array as fallback
        return { success: false, data: [], message: 'Failed to load chapters' };
      }
    },
    
    getContent: async (chapterId: string) => {
      try {
        return await fetchWithAuth(`/chapters/${chapterId}/content`);
      } catch (error) {
        console.error('Failed to fetch chapter content:', error);
        return { 
          success: false, 
          data: { theory: [], examples: [] }, 
          message: 'Failed to load chapter content' 
        };
      }
    },
    
    getQuestions: async (chapterId: string, difficulty: number = 1) => {
      try {
        return await fetchWithAuth(`/chapters/${chapterId}/questions?difficulty=${difficulty}`);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        return { success: false, data: [], message: 'Failed to load questions' };
      }
    }
  },
  
  // Progress endpoints
  progress: {
    saveSession: async (sessionData: any) => {
      try {
        return await fetchWithAuth('/progress/session', {
          method: 'POST',
          body: JSON.stringify(sessionData),
        });
      } catch (error) {
        console.error('Failed to save session:', error);
        // Store locally if API fails
        if (typeof window !== 'undefined') {
          const pendingSessions = JSON.parse(localStorage.getItem('pendingSessions') || '[]');
          pendingSessions.push({...sessionData, timestamp: Date.now()});
          localStorage.setItem('pendingSessions', JSON.stringify(pendingSessions));
        }
        return { 
          success: false, 
          localSaved: true,
          message: 'Session saved locally. Will sync when connection is restored.' 
        };
      }
    },
    
    getDashboard: async () => {
      try {
        return await fetchWithAuth('/progress/dashboard');
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        return { 
          success: false, 
          data: { 
            recentActivity: [],
            stats: { 
              questionsAttempted: 0, 
              correctAnswers: 0, 
              streak: 0 
            }
          }, 
          message: 'Failed to load dashboard data' 
        };
      }
    }
  }
};

export default api;
