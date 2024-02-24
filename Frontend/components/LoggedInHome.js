import React, { useState, useEffect } from "react";
import { Grid, Typography, CircularProgress } from "@mui/material";
import { makeAuthenticatedGETRequest } from "../utils/server";
import SingleSongCard1 from "./inputs/SingleSongCard1";
import LoggedInContainer from "../containers/LoggedInContainer";

const Home = () => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
        setSongData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <LoggedInContainer curActiveScreen="home">
      <Typography variant="h5" sx={{ color: "white", pt: 8, pl: 2, pb: 4, fontWeight: "bold" }}>
        Melodyssey Playlists
      </Typography>
      <Grid container spacing={6}>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : songData && songData.length > 0 ? (
          songData.map((item) => (
            <SingleSongCard1 key={item.id} info={item} playSound={() => { /* Function for playing sound */ }} />
          ))
        ) : (
          <Typography variant="body1" sx={{ color: "white" }}>
            No songs available
          </Typography>
        )}
      </Grid>
    </LoggedInContainer>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 }}>
        {titleText}
      </Typography>
      <Grid container spacing={4}>
        {cardsData.map((item, index) => (
          <Card key={index} title={item.title} description={item.description} imgUrl={item.imgUrl} />
        ))}
      </Grid>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div className="bg-black bg-opacity-40 p-4 rounded-lg">
        <div className="pb-4 pt-2">
          <img className="w-full rounded-md" src={imgUrl} alt="label" />
        </div>
        <Typography variant="subtitle1" sx={{ color: "white", fontWeight: "bold", py: 3 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "gray.500" }}>
          {description}
        </Typography>
      </div>
    </Grid>
  );
};

export default Home;
