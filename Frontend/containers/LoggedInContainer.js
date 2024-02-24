import {useContext, useEffect, useLayoutEffect, useState, useRef} from "react";
import axios from 'axios';
import {Howl, Howler} from 'howler';
import { useCookies } from "react-cookie";
import { Box, Button, Typography, IconButton, Avatar } from '@mui/material';
import { makeStyles } from "@mui/styles";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { PlayArrow, Pause, SkipPrevious, SkipNext, Shuffle, Repeat, PlaylistAdd, Favorite } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import IconText from '../components/inputs/IconText';
import HoverText from '../components/inputs/HoverText';
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import {makeAuthenticatedPOSTRequest} from "../utils/server";

const useStyles = makeStyles((theme) => ({
    userWelcome: {
      backgroundColor: "#319B34",
      color: "#fff",
      width: 140,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
      fontWeight: "bold",
      marginRight: theme.spacing(2),
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#166B1A",
      },
    },
    logoutBtn: {
        backgroundColor: "#fff",
        color: "#000",
        width: 60,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background-color 0.3s ease, color 0.3s ease",
        "&:hover": {
          backgroundColor: "#d32f2f",
          color: "#fff",
        },
      },
    }));

export default function LoggedInContainer({children, curActiveScreen}) {

    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
    const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
    const classes = useStyles();


    const {
        currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
    } = useContext(songContext);

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currentSong) {
            return;
        }
        changeSong(currentSong.track);
    }, [currentSong && currentSong.track]);

    const addSongToPlaylist = async (playlistId) => {
        const songId = currentSong._id;

        const payload = {playlistId, songId};
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/add/song",
            payload
        );
        if(response._id){
            setAddToPlaylistModalOpen(false)
        }
    };

    const playSound = () => {
        if(!soundPlayed){
            return;
        }
        soundPlayed.play();
    }

    const changeSong = (songSrc) => {
        if(soundPlayed){
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        soundPlayed.pause();
    }

    const togglePlayPause = () => {
        if(isPaused){
            playSound();
            setIsPaused(false);
        }else{
            pauseSound();
            setIsPaused(true);
        }
    }




    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    setIsLoggedIn(!!cookies.token); 
    }, [cookies.token]);

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")

    const getToken = () => {
    let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    let token = urlParams.get('access_token');
    }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
    }, [])

    const logout = () => {
        removeCookie('token'); 
        setIsLoggedIn(false); 
        navigate('/home'); 
      };


  return (
    <Box className="h-full w-full bg-app-black">
        {createPlaylistModalOpen && (
            <CreatePlaylistModal closeModal={() => {setCreatePlaylistModalOpen(false);}} />
            )}
        {addToPlaylistModalOpen && (
            <AddToPlaylistModal closeModal={() => {setAddToPlaylistModalOpen(false);}} addSongToPlaylist={addSongToPlaylist} />
            )}        
    <div className={`${currentSong?"h-9/10":"h-full"} w-full flex`}>    
    
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        <div>
            <div className="logo p-6 w-full flex flex-col items-center justify-center">
            <Icon icon="arcticons:heymelody" color="green" width="60" height="60" alt="melodyssey logo" />
            <Typography className="text-white text-lg font-semibold mt-2 tracking-wide">Melodyssey</Typography>
            </div>

            <div className="py-5">
                <IconText iconName={"material-symbols:home"} displayText={"Home"} targetLink={"/home"} active={curActiveScreen==="home"} />
                <IconText iconName={"mdi:artist-outline"} displayText={"Search Artist"} targetLink={"/searchArtist"} active={curActiveScreen==="searchArtist"} />
                <IconText iconName={"material-symbols:search"} displayText={"Search Song"} targetLink={"/search"} active={curActiveScreen==="search"} />
                <IconText iconName={"fluent:library-20-filled"} displayText={"Your Library"} targetLink={"/library"} active={curActiveScreen==="library"} />
                <IconText iconName={"majesticons:music"} displayText={"My Music"} targetLink={"/myMusic"} active={curActiveScreen==="myMusic"} />
            </div>

            <div className="pt-5">
            <IconText iconName={"ph:plus-fill"} displayText={"Create Playlist"} onClick={() => {setCreatePlaylistModalOpen(true)}}/>
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
      <div className="navbar w-full h-1/10 bg-black flex items-center justify-end">
        <div className="w-1/2 flex h-full">
          <div className="w-1/3 flex justify-around items-center">
            <IconText displayText={"Upload Song"} targetLink={"/uploadSong"} />
          </div>
          <div className="w-2/3 flex justify-around h-full items-center">
            <Box className={classes.userWelcome}>Welcome, WJ</Box>
            <Box className={classes.logoutBtn} onClick={logout}>
              <ExitToAppIcon />
            </Box>
          </div>
        </div>
      </div>
            <div className="content p-8 pt-0 overflow-auto" >
                {children}
            </div>
        </div>
    </div>

            {currentSong && (
                <Box className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
                    <Box className="w-1/4 flex items-center">
                        <Avatar src={currentSong.thumbnail} alt="currentSongThumbnail" sx={{ width: 56, height: 56 }} />
                        <Box pl={4}>
                            <Typography variant="subtitle1" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                                {currentSong.name}
                            </Typography>
                            <Typography variant="body2" color="gray" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                                {currentSong.artist.firstname + ' ' + currentSong.artist.lastname}
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="w-1/2 flex justify-center h-full flex-col items-center">
                        <Box className="flex w-1/3 justify-between items-center">
                            <IconButton sx={{ color: 'gray', '&:hover': { color: 'white' } }}>
                                <Shuffle fontSize="small" />
                            </IconButton>
                            <IconButton sx={{ color: 'gray', '&:hover': { color: 'white' } }}>
                                <SkipPrevious fontSize="medium" />
                            </IconButton>
                            <IconButton sx={{ color: 'gray', '&:hover': { color: 'green' } }} onClick={togglePlayPause}>
                                {isPaused ? <PlayArrow fontSize="large" /> : <Pause fontSize="large" />}
                            </IconButton>
                            <IconButton sx={{ color: 'gray', '&:hover': { color: 'white' } }}>
                                <SkipNext fontSize="medium" />
                            </IconButton>
                            <IconButton sx={{ color: 'gray', '&:hover': { color: 'white' } }}>
                                <Repeat fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                        <IconButton
                            sx={{ color: 'gray', '&:hover': { color: 'green' } }}
                            onClick={() => {
                                setAddToPlaylistModalOpen(true);
                            }}
                        >
                            <PlaylistAdd fontSize="large" />
                        </IconButton>
                        <IconButton sx={{ color: 'gray', '&:hover': { color: 'red' } }}>
                            <Favorite fontSize="medium" />
                        </IconButton>
                    </Box>
                </Box>
            )}
        </Box>
    );
}