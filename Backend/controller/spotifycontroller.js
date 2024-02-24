const getUserProfile = async (accessToken) => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch user profile');
    }
  };
  
  getUserProfile(savedAccessToken)
    .then(data => console.log('User profile:', data))
    .catch(err => console.error('Error:', err));
  
  const playTrack = async (req, res) => {
    };
    
    module.exports = { playTrack };
  
  module.exports = {
    getUserProfile,
  };
  