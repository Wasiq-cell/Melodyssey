  import './input.css';
  import React, { useState } from 'react';
    import { 
    BrowserRouter,
    Routes,
    Route,
    Navigate 
  } from "react-router-dom";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  import CreatePlaylistModal from "./modals/CreatePlaylistModal";

  import Login from './components/Login';
  import Signup from './components/Signup';
  import Home from './components/Home';
  import LoggedInHome from './components/LoggedInHome';
  import UploadSong from './components/UploadSong';
  import MyMusic from './components/MyMusic';
  import Search from "./components/Search";
  import SearchArtist from "./components/SearchArtist";
  import Library from "./components/Library";
  import SinglePlaylist from "./components/SinglePlaylist";
  import {useCookies} from "react-cookie";
  import songContext from "./contexts/songContext";

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1E88E5",
      },
      background: {
        default: "#ffffff",
      },
    },
  });


  function App() {

    const [currentSong, setCurrentSong] = useState(null);
    const [soundPlayed, setSoundPlayed] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
    const [cookie, setCookie] = useCookies(["token"]);
    const code = new URLSearchParams(window.location.search).get("code")

    return (
      <ThemeProvider theme={theme}>

      <div className="w-screen h-screen font-poppins">
        <BrowserRouter>
        <CreatePlaylistModal closeModal={() => {}} />

          {cookie.token ? (

          <songContext.Provider value={{currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused}}>
          <Routes>
            <Route path="/home" element={<LoggedInHome />} />
            <Route path="/uploadSong" element={<UploadSong />} />
            <Route path="/myMusic" element={<MyMusic />} />
            <Route path="/searchArtist" element={<SearchArtist />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/playlist/:playlistId" element={<SinglePlaylist />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          </songContext.Provider>

          ) : (
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          )}
        </BrowserRouter>
      </div>
        </ThemeProvider>

    );
  }


  export default App;
