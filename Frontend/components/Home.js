import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Box, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import IconText from './inputs/IconText';
import HoverText from './inputs/HoverText';


const useStyles = makeStyles((theme) => ({
    signup: {
      backgroundColor: "#111",
      color: "#fff",
      width: 90,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
      marginRight: theme.spacing(2),
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#CBBB08",
      },
    },
    login: {
      backgroundColor: "#3AB936",
      color: "#fff",
      width: 90,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      cursor: "pointer",
      transition: "background-color 0.3s ease, color 0.3s ease",
      "&:hover": {
        backgroundColor: "#1A8616",
        color: "#fff",
      },
    },
    welcomeSection: {
        marginTop: '50px',
        textAlign: 'center',
      },
      welcomeImage: {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      },
      callToAction: {
        textAlign: 'center',
        marginTop: '20px',
      },
    container: {
        display: 'flex',
        height: '100vh',
      },
      sidebar: {
        flex: '1',
        backgroundColor: '#111',
        color: '#fff',
        padding: '20px',
      },
      content: {
        flex: '4',
        backgroundColor: '#1a1a1a',
        overflowY: 'auto',
        padding: '20px',
      },
      
      welcomeNote: {
        marginBottom: theme.spacing(5),
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        '& .melody-icon': {
          fontSize: '4rem',
          color: '#4CAF50',
          margin: 'auto',
          marginTop: theme.spacing(5),
          marginBottom: theme.spacing(5),
        },
        '& .melodyssey-text': {
          fontSize: '1.5rem',
          color: '#fff',
        },
      },
      melodyIcon: {
        fontSize: '4rem', // Larger icon size
        color: '#4CAF50', // Green color for icon
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',

      },
      melodyName: {
        fontSize: '1.5rem', // Smaller name size
        color: '#fff', // White color for name
      },
      catchySearchLine: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#D4AF09',
        marginTop: theme.spacing(5),
        fontSize: '3rem', // Increase font size
        lineHeight: '1.6', // Adjust line height
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add text shadow
        letterSpacing: '2px', // Adjust letter spacing
        transition: 'color 0.3s ease-in-out', // Add color transition on hover
        '&:hover': {
          color: '#FFD700', // Change color on hover
        },
      },
    
      imageContainer: {
        marginTop: '40px',
        position: 'relative',
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '30px', // Adjusted for margin
            left: '40px', // Adjusted for margin
            right: '40px', // Adjusted for margin
            bottom: '30px', // Adjusted for margin
            backgroundColor: 'rgba(76, 175, 80, 0.7)', // Adjusted for color
            zIndex: 1,
          },
          '& .melody-icon': {
            display: 'block',
            fontWeight: 'bold',
          },
        },
        width: '100%',
        maxWidth: '1000px',
        height: '150px',
        margin: '0 auto',
        marginBottom: theme.spacing(4),
        '& .melody-icon': {
          display: 'none',
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '4rem',
          color: '#fff',
          zIndex: 2,
        },
      },
      

      image: {
        width: '100%',
        objectFit: 'cover',
      },
      imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(76, 175, 80, 0.5)', // Green color with opacity
        zIndex: 1,
        display: 'none',
      },
    
  }));

  const images = [
    process.env.PUBLIC_URL + '/images/atif.jpg',
    process.env.PUBLIC_URL + '/images/coke.jpg',
    process.env.PUBLIC_URL + '/images/khan.jpg',
  ];
  
  const Home = () => {
    const classes = useStyles();
    const [hoveredIndex, setHoveredIndex] = useState(null);


  return (
    <div className="h-full w-full flex">
    
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        <div>
            <div className="logo p-6 w-full flex flex-col items-center justify-center">
            <Icon icon="arcticons:heymelody" color="green" width="50" height="50" alt="melodyssey logo" />
            <Typography className="text-white text-lg font-semibold mt-2 tracking-wide">Melodyssey</Typography>
            </div>

            <div className="py-5">
                <IconText iconName={"material-symbols:home"} displayText={"Home"} targetLink={"/home"} />
                <IconText iconName={"fluent:library-20-filled"} displayText={"Your Library"} targetLink={"/library"} />
                <IconText iconName={"majesticons:music"} displayText={"My Music"} targetLink={"/myMusic"} />
            </div>

            <div className="pt-5">
            <IconText iconName={"ph:plus-fill"} displayText={"Create Playlist"} />
            <IconText iconName={"bxs:heart-square"} displayText={"Liked Songs"} />
            </div>
            </div>

            <div className="px-5">
                <div className="border border-gray-200 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                <Icon icon="ph:globe" />
                <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold', color: 'white', textDecoration: 'underline', cursor: 'pointer', '&:hover': {color: 'green',},}}>
                    English
                </Typography>
                </div>

            </div>

        </div>
    
        <div className="h-full w-4/5 bg-app-black overflow-auto">
            <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                <div className="w-2/4 flex h-full">
                    <div className="w-3/5 flex justify-around items-center">
                        <HoverText displayText={"Premium"}/>
                        <HoverText displayText={"Support"}/>
                        <HoverText displayText={"Download"}/>
                        <div className="h-1/2 border-r border-white">

                        </div>
                    </div>
                    <div className="w-2/2 flex justify-around h-full items-center">
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <Box className={classes.signup}>Signup</Box>
                    </Link>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Box className={classes.login}>Login</Box>
                    </Link>
                    </div>
                </div>
            </div>

            <div className="content p-8 pt-0">
          <div className={classes.welcomeNote}>
          <Typography variant="h3" className="mb-4">
              <Icon className={classes.melodyIcon} icon="arcticons:heymelody" />
            </Typography>
            <Typography variant="h5" className="mb-2">
              Welcome to <span style={{ color: '#4CAF50' }}>Melodyssey</span>!
            </Typography>
            <Typography variant="body1">
              <span style={{ color: '#4CAF50' }}>Discover</span> the world of music like never before.
            </Typography>
          </div>

         <div className="welcomeSection">

            <Typography variant="h6" className={classes.catchySearchLine}>
            <span style={{ color: '#fff' }}>Ready to explore music from all over the</span> <span style={{ color: '#E10D0D' }}>world?</span> Start your journey now!
            </Typography>

            {images.map((imageUrl, index) => (
                <Paper
                    elevation={3}
                    className={classes.imageContainer}
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    >
                    {hoveredIndex === index && (
                        <>
                        <Icon
                            className={`${classes.melodyIcon} melody-icon`}
                            icon="arcticons:heymelody"
                        />
                        <div className={classes.imageOverlay}></div>
                        </>
                    )}
                    <img src={imageUrl} alt={`Image ${index + 1}`} className={classes.image} />
                </Paper>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;