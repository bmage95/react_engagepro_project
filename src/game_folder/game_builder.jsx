import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import AppBar from '../components/appbar'
import './game.css'

const game_builder = () => {
  return (
    <div>
        <AppBar/>
        <h2 className='sub-title'>What type of <span>Game</span> will you make?</h2><br/>
        
        <table>
          <tbody>
            <tr>
              <td>
                <div className='pulse'>
                  <Card sx={{  width:345 }}>
                    <CardActionArea component={Link} to="/game-builder/matching-tiles">
                      <CardMedia
                        component="img"
                        height="180"
                        image={require("../assets/images/matching_wrk1.png")}
                        alt="matching game img"
                      />
                      <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Matching Tiles
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                  </Card>
                </div>
              </td>

              <td>
              <div className='pulse'>
                  <Card sx={{ width: 345 }}>
                    <CardActionArea component={Link} to="/game-builder/personality-test">
                      <CardMedia
                        component="img"
                        height="180"
                        image={require("../assets/images/personality_tst1.png")}
                        alt="personality test img"
                      />
                      <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Personality Test
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                  </Card>
                </div>
              </td>
            </tr>
      <br/> 
            <tr>
            <td>
              <div className='pulse'>
                <Card sx={{ width: 345 }}>
                  <CardActionArea component={Link} to="/game-builder/trivia-test">
                    <CardMedia
                      component="img"
                      height="180"
                      image={require("../assets/images/trivia_tst1.png")}
                      alt="trivia test img"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                         Trivia Test
                      </Typography>
                    </CardContent>
                  </CardActionArea>
              </Card>
              </div>
            </td>

              <td>
              <div className='pulse'>
                <Card sx={{ width: 345 }}>
                  <CardActionArea component={Link} to="/game-builder/yesno-game">
                    <CardMedia
                      component="img"
                      height="180"
                      image={require("../assets/images/yesno-game.png")}
                      alt="yes/no img"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Yes/No Game
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                </Card>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}

export default game_builder
