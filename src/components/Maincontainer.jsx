import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'

const Maincontainer = () => {
  return (
    <div className='col-span-10 overflow-hidden'>
      <ButtonList/>
        <VideoContainer/>
      

    </div>
  )
}

export default Maincontainer
