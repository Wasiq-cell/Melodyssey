
import React from 'react';
import Card from './Card';
import { Typography, Grid } from '@mui/material';

export default function Playlist({ titleText, cardsData }) {
  return (
    <div className="text-white mt-8">
      <Typography variant="h4" fontWeight="bold" mb={5}>
        {titleText}
      </Typography>
      <Grid container spacing={4}>
        {cardsData.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card title={item.title} description={item.description} imgUrl={item.imgUrl} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
