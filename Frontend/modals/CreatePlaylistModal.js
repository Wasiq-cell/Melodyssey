import React, { useState } from "react";
import { TextField, Button, Typography, Modal, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { makeAuthenticatedPOSTRequest } from "../utils/server";

const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      width: "30%",
      borderRadius: "8px",
    },
    input: {
      marginBottom: theme.spacing(4),
    },
  }));

const CreatePlaylistModal = ({closeModal}) => {
    const classes = useStyles();
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState("");
    const [isOpen, setIsOpen] = useState(true);

    const createPlaylist = async () => {
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/create",
            {name: playlistName, thumbnail: playlistThumbnail, songs: []}
        );
        if (response._id) {
            closeModal();
        }
    };

    const handleCloseModal = () => {
        closeModal();
        setIsOpen(false);
      };

      return (
        <Modal open={isOpen} className={classes.modal} onClose={handleCloseModal}>
          <Box className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Create Playlist
            </Typography>
            <Box className={classes.input}>
              <TextField label="Name" placeholder="Playlist Name" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} fullWidth variant="outlined" />
            </Box>
            <Box className={classes.input}>
              <TextField label="Thumbnail" placeholder="Thumbnail" value={playlistThumbnail} onChange={(e) => setPlaylistThumbnail(e.target.value)} fullWidth variant="outlined" />
            </Box>
            <Button variant="contained" onClick={createPlaylist} style={{ backgroundColor: "#4CAF50", color: "white", padding: "8px 16px", borderRadius: "4px", marginBottom: "8px" }} fullWidth >
              Create
            </Button>
            <Button variant="contained" onClick={handleCloseModal} style={{ backgroundColor: "transparent", color: "rgba(0, 0, 0, 0.54)", padding: "8px 16px", borderRadius: "4px", border: "1px solid rgba(0, 0, 0, 0.54)" }} fullWidth >
              Close
            </Button>
          </Box>
        </Modal>
      );
    };

export default CreatePlaylistModal;