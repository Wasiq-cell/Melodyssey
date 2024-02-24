import React, { useState } from 'react';
import { Typography, Grid, Button, CircularProgress } from '@mui/material';
import Text from './inputs/Text';
import LoggedInContainer from '../containers/LoggedInContainer';
import CloudinaryUpload from './inputs/CloudinaryUpload';
import { makeAuthenticatedPOSTRequest } from '../utils/server';
import { useNavigate } from 'react-router-dom';


export default function UploadSong() {
    const [name, setName] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [playlistUrl, setPlaylistUrl] = useState('');
    const [uploadedSongFileName, setUploadedSongFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const submitSong = async () => {
      setLoading(true);
      const data = { name, thumbnail, track: playlistUrl };
      try {
        const response = await makeAuthenticatedPOSTRequest('/song/create', data);
        if (response.err) {
          alert('Could not create song');
        } else {
          alert('Success');
          navigate('/home');
        }
      } catch (error) {
        console.error('Error submitting song:', error);
        alert('Error submitting song');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <LoggedInContainer curActiveScreen="uploadSong">
        <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
          <Grid item xs={10} sx={{ backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '10px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 5, color: 'white' }}>
              Upload Your Music
            </Typography>
            <Grid container spacing={3} sx={{ mb: 5 }}>
              <Grid item xs={6}>
                <Text
                  label="Song Name"
                  labelClassName={'text-white'}
                  placeholder="Song Name"
                  value={name}
                  setValue={setName}
                  inputProps={{ style: { color: 'black' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <Text
                  label="Thumbnail"
                  labelClassName={'text-white'}
                  placeholder="Thumbnail"
                  value={thumbnail}
                  setValue={setThumbnail}
                  inputProps={{ style: { color: 'black' } }}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" sx={{ mb: 5 }}>
              {uploadedSongFileName ? (
                <Typography variant="body1" sx={{ bgcolor: 'white', borderRadius: '20px', p: 2, color: 'black' }}>
                  {uploadedSongFileName.substring(0, 35)}...
                </Typography>
              ) : (
                <CloudinaryUpload setUrl={setPlaylistUrl} setName={setUploadedSongFileName} />
              )}
            </Grid>
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={submitSong}
                disabled={loading}
                sx={{ borderRadius: '20px', color: 'white' }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Song'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </LoggedInContainer>
    );
  }