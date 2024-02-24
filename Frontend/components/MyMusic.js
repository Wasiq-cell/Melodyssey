import { useState, useEffect } from 'react';
import { List, ListItem, Typography, Divider, Grid, IconButton } from '@mui/material';
import LoggedInContainer from '../containers/LoggedInContainer';
import SingleSongCard from './inputs/SingleSongCard';
import { makeAuthenticatedGETRequest } from '../utils/server';
import AddToPlaylistModal from '../modals/AddToPlaylistModal';

export default function MyMusic() {
  const [songData, setSongData] = useState([]);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);

  const openAddToPlaylistModal = () => {
    setIsAddToPlaylistModalOpen(true);
  };

  const closeAddToPlaylistModal = () => {
    setIsAddToPlaylistModalOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest('/song/get/mysongs');
      setSongData(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer curActiveScreen="myMusic">
      {/* <IconButton onClick={openAddToPlaylistModal}>Add to Playlist</IconButton> */}

      {isAddToPlaylistModalOpen && (
        <AddToPlaylistModal closeModal={closeAddToPlaylistModal} addSongToPlaylist={(playlistId) => { /* Add logic to add the song to the selected playlist */ }} />
      )}

      <Typography variant="h5" sx={{ color: 'white', paddingTop: 8, paddingLeft: 2, paddingBottom: 4, fontWeight: 'bold' }}>
        My Songs
      </Typography>
      <Grid container justifyContent="left">
        <Grid item xs={12} sm={10} md={8}>
          <List sx={{ width: '100%', borderRadius: '8px', bgcolor: '#282c34', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            {songData.map((item, index) => (
              <div key={index}>
                <ListItem
                  button
                  sx={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                  }}
                >
                  <SingleSongCard info={item} playSound={() => {}} />
                </ListItem>
                {index !== songData.length - 1 && <Divider variant="inset" component="li" />}
              </div>
            ))}
          </List>
        </Grid>
      </Grid>
    </LoggedInContainer>
  );
}
