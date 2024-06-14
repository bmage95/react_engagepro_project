import React from 'react'
import AppBar from '../components/appbar'
import FBuilderTabs from '../components/form_builder_tabs'
import './builder.scss'

const Builder = () => {
  return (
    <div className='form_builder_page'>
      <AppBar/>
      <FBuilderTabs/>
      <div className='form_builder_page2'>
        
      </div>
    </div>
  )
}

export default Builder
