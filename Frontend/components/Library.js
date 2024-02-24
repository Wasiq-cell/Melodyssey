import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoggedInContainer from '../containers/LoggedInContainer';
import { makeAuthenticatedGETRequest } from '../utils/server';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

const Library = () => {
  const [myPlaylists, setMyPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest('/playlist/get/me');
      setMyPlaylists(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer curActiveScreen="library">
      <Typography variant="h5" sx={{ color: "white", pt: 8, pl: 2, pb: 4, fontWeight: "bold" }}>
        My Playlists
      </Typography>
      <Grid container spacing={3} className="py-5">
        {myPlaylists.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={JSON.stringify(item)}>
            <CustomCard
              title={item.name}
              description=""
              imgUrl={item.thumbnail}
              playlistId={item._id}
              navigate={navigate}
            />
          </Grid>
        ))}
      </Grid>
    </LoggedInContainer>
  );
};

const CustomCard = ({ title, description, imgUrl, playlistId, navigate }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="rounded-lg cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate('/playlist/' + playlistId)}
      sx={{
        borderRadius: '10px',
        overflow: 'hidden',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <CardMedia
        component="img"
        image={imgUrl}
        alt="label"
        sx={{
          height: '200px', 
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
        <Typography variant="h6" className="text-white font-semibold py-3">
          {title}
        </Typography>
        <Typography variant="body2" className="text-gray-500 text-sm">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Library;