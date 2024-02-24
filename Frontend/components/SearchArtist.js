import React, { useState, useEffect } from "react";
import {
  InputAdornment,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grow,
  CircularProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import LoggedInContainer from "../containers/LoggedInContainer";

const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      overflowY: "hidden",
    },
    searchInput: {
      width: "50%",
      marginBottom: theme.spacing(2),
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#4CAF50",
        },
        "& input": {
          color: theme.palette.common.white,
          fontSize: "14px",
        },
      },
    },
    searchIcon: {
      color: "#F6F3F0",
      cursor: "pointer",
    },
    loading: {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(2),
    },
    card: {
      maxWidth: 300,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "black",
      color: "#D6A017",
      transition: "transform 0.3s",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      "&:hover": {
        transform: "scale(1.1)", // Increased the scale on hover
      },
    },
    media: {
      height: 300,
      objectFit: "cover",
    },
    cardContent: {
      flex: "1 0 auto",
    },
    albumName: {
      textAlign: "center",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      marginTop: theme.spacing(1),
    },
    artistHeading: {
      textAlign: "left",
      color: "#F8FCF9",
      fontSize: "26px",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      position: "relative",
    },
    lineBelowArtist: {
      position: "absolute",
      width: "94%",
      height: "1px",
      backgroundColor: "#056525",
      bottom: -8,
      
    },
  }));

const SearchArtist = () => {
  const CLIENT_ID = "749e88bb814f4ee4a3ab56aeed4519c3";
  const CLIENT_SECRET = "d377e6f5b0844f04a9927bcabc7207bf";

  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [artistName, setArtistName] = useState("");

  useEffect(() => {
    fetchAccessToken();
  }, []);

  const fetchAccessToken = async () => {
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    const result = await fetch(
      "https://accounts.spotify.com/api/token",
      authParameters
    );
    const data = await result.json();

    setAccessToken(data.access_token);
  };

  const handleSearch = async () => {
    setLoading(true);

    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const result = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
        searchParameters
      );
      const data = await result.json();

      const artistID = data.artists.items[0]?.id;

      if (artistID) {
        const artistResult = await fetch(
          `https://api.spotify.com/v1/artists/${artistID}`,
          searchParameters
        );
        const artistData = await artistResult.json();

        setArtistName(artistData.name);

        const albumResult = await fetch(
          `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
          searchParameters
        );
        const albumData = await albumResult.json();

        setAlbums(albumData.items);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchIconClick = () => {
    handleSearch();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <LoggedInContainer curActiveScreen="searchArtist" >
            <div className={classes.root}>

      <TextField
        placeholder="Search your favorite artist from here..."
        variant="outlined"
        size="small"
        className={classes.searchInput}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon
                className={classes.searchIcon}
                onClick={handleSearchIconClick}
              />
            </InputAdornment>
          ),
        }}
        onKeyPress={handleKeyPress}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      {loading && (
        <div className={classes.loading}>
          <CircularProgress color="primary" />
        </div>
      )}
      {artistName && (
        <div className={classes.artistHeading}>
          <Typography variant="h5">{artistName}</Typography>
          <div className={classes.lineBelowArtist} />
        </div>
      )}
      <Grid container spacing={3} justify="center">
        {albums.map((album, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
            <Grow in>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={album.images[0]?.url}
                  title={album.name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography
                    variant="h6"
                    component="h2"
                    className={classes.albumName}
                  >
                    {album.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>
      </div>

    </LoggedInContainer>
  );
};

export default SearchArtist;