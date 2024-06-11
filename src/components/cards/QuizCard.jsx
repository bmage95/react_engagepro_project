import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';

export default function QuizCard() {
  const { profile } = useContext(UserContext);
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea component={Link} to={profile && profile.name ? "/quiz-builder" : "/profile"}>
          <CardMedia
            component="img"
            height="180"
            image={require("../../assets/images/quiz1.png")}
            alt="quiz img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Quizzes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quizzes of all styles at the ease of your fingers, we offer more customisable quizzes than most alternatives out there.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }