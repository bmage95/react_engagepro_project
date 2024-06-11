import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';

export default function GameCard() {
  const { profile } = useContext(UserContext);
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea component={Link} to={profile && profile.name ? "/game-builder" : "/profile"}>
          <CardMedia
            component="img"
            height="180"
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