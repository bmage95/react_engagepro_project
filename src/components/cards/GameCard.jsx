import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function GameCard() {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={require("../../assets/images/game1.png")}
            alt="controller img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Games
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Indulge your students/friends/colleagues with some intuitive games that really add to your presentations!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }