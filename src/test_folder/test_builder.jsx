import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import AppBar from '../components/appbar'
import '../game_folder/game.css'

const test_builder = () => {
  return (
    <div>
        <AppBar/>
        <h2 className='sub-title'>What type of <span>Test</span> will you make?</h2><br/>
        <br/><br/>
        <table>
          <tbody>
            <tr>
              <td>
              <div className='pulse'>
                  <Card sx={{ width: 405 }}>
                    <CardActionArea component={Link} to="/test-builder/personality-test">
                      <CardMedia
                        component="img"
                        height="240"
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

              <td>
              <div className='pulse'>
                <Card sx={{ width: 405 }}>
                  <CardActionArea component={Link} to="/test-builder/trivia-test">
                    <CardMedia
                      component="img"
                      height="240"
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
            </tr>
          </tbody>
        </table>
    </div>
  )
}

export default test_builder
