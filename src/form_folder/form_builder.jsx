import React from 'react'
import AppBar from '../components/appbar'
import { Link } from 'react-router-dom'
import './form_builder.scss'

const form_builder = () => {
  return (
    <div className='form_build'>
        <AppBar/>
        <div className='new_div'>
            <Link to='/form-builder/builder'>
              <img className= 'img2' alt='add new' src={require('../assets/images/plus_svg.png')}/>
            </Link>
            <h2>Make a new Form</h2>
        </div>

        <div className='prev_loaded'>
          <h1>Previously Loaded</h1>
        </div>
    </div>
  )
}

export default form_builder
