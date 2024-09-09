import axios from 'axios';

export const getGoogleOAuthUrl = async () => {
  try {
    const response = await axios.get('https://test-aquatrack-backend.onrender.com/api/get-oauth-url');
    return response.data.data.url;
  } catch (error) {
    throw new Error('Failed to get Google OAuth URL');
  }
};
