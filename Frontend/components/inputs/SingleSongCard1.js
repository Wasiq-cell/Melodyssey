import { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Box, Button, Grid } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import songContext from '../../contexts/songContext';

const useStyles = makeStyles({
  card: {
    background: '#000',
    borderRadius: '16px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
    transition: 'transform 0.3s ease-in-out',
    height: '250px', 
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.05)',
    },
  },
  thumbnail: {
    width: '100%',
    height: '100%', 
    objectFit: 'cover',
    borderRadius: '16px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    padding: '16px',
    borderRadius: '0 0 16px 16px',
    transition: 'opacity 0.3s ease-in-out',
    opacity: '0',
    '&:hover': {
      opacity: '1',
    },
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#fff',
    transition: 'color 0.3s ease', 
    '&:hover': {
      color: 'gold',
    },
  },
  description: {
    fontSize: '1.2rem',
    color: '#ccc',
    lineHeight: '1.5',
  },
  playIcon: {
    fontSize: '4rem', 
    color: '#fff',
    transition: 'color 0.3s ease', 
    '&:hover': {
      cursor: 'pointer',
      color: '#1DB954',
    },
  },
});

export default function SingleSongCard({ info, playSound }) {
  const { currentSong, setCurrentSong } = useContext(songContext);
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Box
        className={classes.card}
        component="div"
        onClick={() => setCurrentSong(info)}
      >
        <img className={classes.thumbnail} src={info.thumbnail} alt={info.name} />
        <Box className={classes.overlay} component="div" onClick={() => playSound()}>
          <Typography variant="h4" className={classes.title}>
            {info.name}
          </Typography>
          <Typography variant="body1" className={classes.description}>
            {info.description}
          </Typography>
          <PlayCircleOutlineIcon className={classes.playIcon} />
        </Box>
      </Box>
    </Grid>
  );
}
