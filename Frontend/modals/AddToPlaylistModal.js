import React, { useState, useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { makeAuthenticatedGETRequest } from "../utils/server";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#111",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
    padding: theme.spacing(4),
    width: "40%",
    borderRadius: "8px",
    outline: "none",
    overflowY: "auto",
    maxHeight: "80vh",
  },
  playlistItem: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s ease",
    borderRadius: "8px",
    boxShadow: "0 0 8px rgba(255, 255, 255, 0.2)",
    "&:hover": {
      backgroundColor: "#222",
      transform: "scale(1.02)",
      boxShadow: "0 0 12px rgba(255, 255, 255, 0.3)",
    },
  },
  playlistImage: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    borderRadius: "50%",
    marginRight: theme.spacing(2),
    transition: "opacity 0.3s ease",
    "&:hover": {
      opacity: 0.7,
    },
  },
  playlistText: {
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Roboto, sans-serif",
    fontSize: "1.2rem",
    letterSpacing: "0.5px",
    transition: "color 0.3s",
  },
}));

const AddToPlaylistModal = ({ closeModal, addSongToPlaylist }) => {
  const classes = useStyles();
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylists(response.data);
    };
    fetchData();
  }, []);

  return (
    <Modal open={true} className={classes.modal} onClose={closeModal}>
      <Box className={classes.paper}>
        <Typography variant="h6" gutterBottom style={{ color: "#fff" }}>
          Select Playlist
        </Typography>
        {myPlaylists.map((item) => (
          <PlaylistItem
            key={item._id}
            info={item}
            addSongToPlaylist={addSongToPlaylist}
            closeModal={closeModal}
            classes={classes}
          />
        ))}
      </Box>
    </Modal>
  );
};

const PlaylistItem = ({ info, addSongToPlaylist, closeModal, classes }) => {
  const handleAddToPlaylist = () => {
    addSongToPlaylist(info._id);
    closeModal();
  };

  return (
    <div className={classes.playlistItem} onClick={handleAddToPlaylist}>
      <img
        src={info.thumbnail}
        className={classes.playlistImage}
        alt="Playlist Thumbnail"
      />
      <Typography variant="subtitle1" className={classes.playlistText}>
        {info.name}
      </Typography>
    </div>
  );
};

export default AddToPlaylistModal;
