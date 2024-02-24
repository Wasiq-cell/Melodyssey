import { Box, Typography, IconButton } from '@mui/material';
import { PlaylistAdd } from '@mui/icons-material';
import { useContext, useState } from 'react';
import songContext from '../../contexts/songContext';
import AddToPlaylistModal from '../../modals/AddToPlaylistModal';
import { makeAuthenticatedPOSTRequest } from '../../utils/server';

export default function SingleSongCard({ info }) {
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const { setCurrentSong } = useContext(songContext);
  const { name, thumbnail, artist } = info;

  const { currentSong } = useContext(songContext);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;
    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      '/playlist/add/song',
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

  return (
    <Box className="h-full w-full bg-app-black">
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <Box
        className="hover:bg-gray-100 p-4 rounded-md flex items-center w-full"
        onClick={() => setCurrentSong(info)}
        sx={{
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#f0f0f0',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Adjusted box shadow
          },
        }}
      >
        <Box
          className="w-20 h-20 bg-cover bg-center rounded-md overflow-hidden shadow-lg"
          sx={{
            width: '120px',
            height: '120px',
            backgroundImage: `url("${thumbnail}")`,
          }}
        />

        <Box sx={{ flex: 1, marginLeft: '40px' }}>
          <Typography
            variant="h6"
            sx={{
              color: '#ffcc00', // Gold color
              marginBottom: '8px',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline', color: '#111' },
            }}
          >
            {info.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              fontSize: '0.9rem',
              cursor: 'pointer',
              fontStyle: 'italic', // Adjusted font style
            }}
          >
            {info.name}
          </Typography>
        </Box>
        <IconButton
          sx={{ color: '#999', '&:hover': { color: '#00cc66' } }} // Gray and hover green
          onClick={() => {
            setAddToPlaylistModalOpen(true);
          }}
        >
          <PlaylistAdd fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}
