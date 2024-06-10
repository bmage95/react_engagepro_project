import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function FormCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to="/formbuilder">
        <CardMedia
          component="img"
          height="180"
          image={require("../../assets/images/form1.png")}
          alt="forms img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Forms
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Make super easy and interactive ui based surveys that really strikes a chord with everyone. Look out here, there's constant developments.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
  