import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';

export default function FormCard({ loading }) {
  const { profile } = useContext(UserContext);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to={profile && profile.name ? "/form-builder" : "/profile"}>

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
            Make super easy and interactive UI-based surveys that really strike a chord with everyone. Look out here, there's constant developments.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
